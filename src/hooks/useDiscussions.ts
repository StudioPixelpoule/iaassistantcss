import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Discussion, DiscussionTag, DiscussionReply, DiscussionReaction } from '../types/database.types';

export function useDiscussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  async function fetchDiscussions() {
    try {
      setLoading(true);
      setError(null);
      
      // First get the discussions with their basic info and replies
      const { data: discussionsData, error: discussionsError } = await supabase
        .from('discussions')
        .select(`
          *,
          profile:profiles(id, email, avatar_url),
          tags:discussion_tags(id, name),
          replies:discussion_replies(
            id,
            content,
            created_at,
            user_id,
            profile:profiles(id, email, avatar_url)
          ),
          reactions:discussion_reactions(id, type, user_id)
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (discussionsError) throw discussionsError;

      // Process the discussions data
      const processedDiscussions = discussionsData?.map(discussion => ({
        ...discussion,
        // Sort replies by creation date
        replies: (discussion.replies || []).sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
        // Add user reactions
        user_reactions: discussion.reactions?.filter(r => r.user_id === user?.id) || []
      })) || [];

      setDiscussions(processedDiscussions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des discussions');
    } finally {
      setLoading(false);
    }
  }

  async function createDiscussion(title: string, content: string, tags: string[]) {
    try {
      if (!user) {
        throw new Error('Vous devez être connecté pour créer une discussion');
      }

      setError(null);

      const { data: discussion, error: discussionError } = await supabase
        .from('discussions')
        .insert([{ 
          title, 
          content,
          user_id: user.id
        }])
        .select()
        .single();

      if (discussionError) throw discussionError;

      if (tags.length > 0 && discussion) {
        const { error: tagsError } = await supabase
          .from('discussion_tags')
          .insert(
            tags.map(tag => ({
              discussion_id: discussion.id,
              name: tag
            }))
          );

        if (tagsError) throw tagsError;
      }

      await fetchDiscussions();
      return discussion;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la création de la discussion';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async function addReply(discussionId: string, content: string) {
    try {
      if (!user) {
        throw new Error('Vous devez être connecté pour répondre');
      }

      setError(null);

      const { error } = await supabase
        .from('discussion_replies')
        .insert([{ 
          discussion_id: discussionId, 
          content,
          user_id: user.id
        }]);

      if (error) throw error;

      await fetchDiscussions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'ajout de la réponse');
      throw err;
    }
  }

  async function toggleReaction(discussionId: string, type: string) {
    try {
      if (!user) {
        throw new Error('Vous devez être connecté pour réagir');
      }

      setError(null);

      const discussion = discussions.find(d => d.id === discussionId);
      const existingReaction = discussion?.reactions?.find(r => 
        r.user_id === user.id && r.type === type
      );

      if (existingReaction) {
        const { error: deleteError } = await supabase
          .from('discussion_reactions')
          .delete()
          .eq('id', existingReaction.id);

        if (deleteError) throw deleteError;
      } else {
        const { error: insertError } = await supabase
          .from('discussion_reactions')
          .insert([{ 
            discussion_id: discussionId, 
            type,
            user_id: user.id
          }]);

        if (insertError) throw insertError;
      }

      await fetchDiscussions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la réaction');
      throw err;
    }
  }

  // Helper function to check if a discussion has a specific reaction from the current user
  function hasUserReaction(discussion: Discussion, type: string): boolean {
    return discussion.user_reactions?.some(reaction => reaction.type === type) || false;
  }

  return {
    discussions,
    loading,
    error,
    createDiscussion,
    addReply,
    toggleReaction,
    hasUserReaction,
    refresh: fetchDiscussions
  };
}