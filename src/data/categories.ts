import { Mail, FileText, Calendar, ClipboardList, Users, Brain, BarChart, Briefcase, UserPlus, GraduationCap, MessageSquare, Target, BookOpen, PenTool, ClipboardCheck, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  { id: 'communications', name: 'Communications', icon: Mail },
  { id: 'documents', name: 'Documents administratifs', icon: FileText },
  { id: 'organization', name: 'Organisation', icon: Calendar },
  { id: 'monitoring', name: 'Suivi et synthèses', icon: ClipboardList },
  { id: 'strategic', name: 'Communications stratégiques', icon: Brain },
  { id: 'planning', name: 'Planification et projets', icon: Briefcase },
  { id: 'meetings', name: 'Réunions et synthèses', icon: Users },
  { id: 'analysis', name: 'Analyse et rapports', icon: BarChart },
  { id: 'recruitment', name: 'Recrutement et sélection', icon: UserPlus },
  { id: 'training', name: 'Formation et développement', icon: GraduationCap },
  { id: 'performance', name: 'Gestion de la performance', icon: Target },
  { id: 'hr-communications', name: 'Communications RH', icon: MessageSquare },
  { id: 'pedagogical-planning', name: 'Planification pédagogique', icon: BookOpen },
  { id: 'teaching-materials', name: 'Matériel didactique', icon: PenTool },
  { id: 'evaluation', name: 'Évaluation et rétroaction', icon: ClipboardCheck },
  { id: 'collaboration', name: 'Communication et collaboration', icon: Share2 }
];