export interface Prompt {
  id: string;
  title: string;
  category: string;
  role: 'secretary' | 'management' | 'financial' | 'hr' | 'teaching' | 'educational';
  context: string;
  content: string;
  example: string;
}