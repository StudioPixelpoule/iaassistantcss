import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Discussion, DiscussionTag, DiscussionReply, DiscussionReaction } from '../types/database.types';

export function useDiscussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  async function fetchDiscussions() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          profile:profiles(id, full_name, avatar_url),
          tags:discussion_tags(id, name),
          replies_count:discussion_replies(count),
          reactions_count:discussion_reactions(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDiscussions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function createDiscussion(title: string, content: string, tags: string[]) {
    try {
      const { data: discussion, error: discussionError } = await supabase
        .from('discussions')
        .insert([{ title, content }])
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
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }

  async function addReply(discussionId: string, content: string) {
    try {
      const { error } = await supabase
        .from('discussion_replies')
        .insert([{ discussion_id: discussionId, content }]);

      if (error) throw error;

      await fetchDiscussions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function toggleReaction(discussionId: string, type: string) {
    try {
      const { data: existing } = await supabase
        .from('discussion_reactions')
        .select()
        .match({ discussion_id: discussionId, type })
        .single();

      if (existing) {
        await supabase
          .from('discussion_reactions')
          .delete()
          .match({ id: existing.id });
      } else {
        await supabase
          .from('discussion_reactions')
          .insert([{ discussion_id: discussionId, type }]);
      }

      await fetchDiscussions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  return {
    discussions,
    loading,
    error,
    createDiscussion,
    addReply,
    toggleReaction,
    refresh: fetchDiscussions
  };
}