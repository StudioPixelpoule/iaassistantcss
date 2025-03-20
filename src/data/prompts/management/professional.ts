import type { Prompt } from '../types';

export const professionalPrompts: Prompt[] = [
  {
    id: 'professional-development',
    title: 'Plan de développement professionnel collectif',
    category: 'planning',
    role: 'management',
    context: 'Coordination du développement des compétences de l\'équipe-école',
    content: `Élabore un plan de développement professionnel collectif pour l'équipe de [nom de l'établissement] axé sur [priorité pédagogique/besoin identifié] pour l'année scolaire [année].

INTENTION : Ce plan doit structurer le développement continu des compétences de l'équipe-école, aligner les efforts de formation avec les priorités établies, et maximiser l'impact sur les pratiques.

FORMAT :
- Structure : analyse des besoins collectifs, objectifs de développement, compétences ciblées
- Présentation : document structuré avec tableaux et calendrier visuel
- Différenciation : approches adaptées aux différents profils et besoins de l'équipe
- Cohérence : liens explicites avec le projet éducatif et les objectifs institutionnels
- Évaluation : indicateurs d'impact sur les pratiques et la réussite des élèves
- Collaboration : stratégies pour développer une culture d'apprentissage collectif
- Longueur : 8-10 pages incluant calendrier et annexes`,
    example: 'Plan de formation sur les pratiques inclusives, développement des compétences'
  }
];