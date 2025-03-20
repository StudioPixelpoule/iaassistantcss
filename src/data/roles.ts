import type { LucideIcon } from 'lucide-react';
import { UserSquare2, GraduationCap, Calculator, Users, BookOpen, Lightbulb } from 'lucide-react';

export interface Role {
  id: 'secretary' | 'management' | 'financial' | 'hr' | 'teaching' | 'educational';
  name: string;
  icon: LucideIcon;
  description: string;
}

export const roles: Role[] = [
  { 
    id: 'secretary', 
    name: 'Secrétariat',
    icon: UserSquare2,
    description: 'Prompts pour la gestion administrative et la communication avec les parents'
  },
  { 
    id: 'management', 
    name: 'Direction',
    icon: GraduationCap,
    description: 'Prompts pour le leadership pédagogique et la gestion stratégique'
  },
  {
    id: 'financial',
    name: 'Services financiers',
    icon: Calculator,
    description: 'Prompts pour la gestion financière, les analyses budgétaires et la planification'
  },
  {
    id: 'hr',
    name: 'Ressources humaines',
    icon: Users,
    description: 'Prompts pour le recrutement, la formation et le développement du personnel'
  },
  {
    id: 'teaching',
    name: 'Personnel enseignant',
    icon: BookOpen,
    description: 'Prompts pour la planification pédagogique, l\'évaluation et le matériel didactique'
  },
  {
    id: 'educational',
    name: 'Services éducatifs',
    icon: Lightbulb,
    description: 'Prompts pour le développement professionnel, l\'accompagnement pédagogique et l\'innovation éducative'
  }
];