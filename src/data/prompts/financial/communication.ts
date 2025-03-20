import type { Prompt } from '../types';

export const communicationPrompts: Prompt[] = [
  {
    id: 'budget-decision',
    title: 'Explication de décisions budgétaires',
    category: 'communications',
    role: 'financial',
    context: 'Communication sur des choix financiers potentiellement sensibles ou complexes',
    content: `Rédige une communication explicative concernant [décision budgétaire : réallocation de ressources/compression/investissement] pour [public cible : personnel/parents/conseil d'établissement].

INTENTION : Cette communication doit expliquer clairement les raisons et implications d'une décision financière potentiellement sensible, favoriser la compréhension du contexte et des contraintes budgétaires.

FORMAT :
- Structure : contexte financier global, explication de la situation spécifique, décision prise et justification
- Ton : transparent et factuel, ni alarmiste ni minimisant
- Style : phrases courtes, paragraphes structurés par thème
- Équilibre : présentation honnête des contraintes et des choix réalisés
- Éléments rassurants : mention des priorités préservées
- Longueur : 1-2 pages maximum, allant à l'essentiel`,
    example: 'Communication sur des mesures d\'optimisation budgétaire, explication d\'une réallocation'
  }
];