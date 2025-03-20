export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_closed: boolean;
  profile?: Profile;
  tags?: DiscussionTag[];
  replies_count?: number;
  reactions_count?: number;
}

export interface DiscussionTag {
  id: string;
  discussion_id: string;
  name: string;
}

export interface DiscussionReply {
  id: string;
  discussion_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface DiscussionReaction {
  id: string;
  discussion_id: string;
  user_id: string;
  type: string;
  created_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromptRating {
  id: string;
  prompt_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  created_at: string;
  updated_at: string;
}