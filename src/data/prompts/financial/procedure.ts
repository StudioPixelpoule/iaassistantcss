import type { Prompt } from '../types';

export const procedurePrompts: Prompt[] = [
  {
    id: 'internal-control',
    title: 'Manuel de contrôle interne',
    category: 'documents',
    role: 'financial',
    context: 'Documentation des mécanismes de contrôle financier',
    content: `Élabore un manuel des procédures de contrôle interne pour la gestion financière de [établissement/service] conforme aux exigences du CSS et aux normes comptables applicables.

INTENTION : Ce manuel doit établir des mécanismes clairs de contrôle interne, prévenir les erreurs et irrégularités, assurer la conformité aux règles comptables et financières.

FORMAT :
- Structure : principes généraux de contrôle interne, responsabilités par fonction, procédures détaillées
- Présentation : sections clairement délimitées, logigrammes des processus
- Éléments spécifiques : matrices de séparation des tâches, formulaires de validation
- Conformité : alignement avec les exigences légales et réglementaires
- Risques : identification des zones de vulnérabilité
- Longueur : document complet (15-20 pages) avec versions abrégées par fonction`,
    example: 'Manuel de contrôle pour la gestion des achats, procédures de vérification des paiements'
  }
];