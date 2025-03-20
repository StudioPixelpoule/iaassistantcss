import type { Prompt } from '../types';

export const planningPrompts: Prompt[] = [
  {
    id: 'learning-sequence',
    title: 'Planification de séquence d\'apprentissage',
    category: 'pedagogical-planning',
    role: 'teaching',
    context: 'Préparation d\'une nouvelle séquence d\'enseignement ou actualisation d\'une planification existante',
    content: `Développe une séquence d'apprentissage sur [concept/thème] pour des élèves de [niveau scolaire], d'une durée de [préciser : période/heures/semaines] selon le Programme de formation de l'école québécoise.

INTENTION : Cette séquence doit permettre aux élèves de développer leur compréhension du concept/thème de manière progressive et engageante, tout en assurant l'acquisition des compétences prescrites.

FORMAT :
- Structure : vue d'ensemble, déroulement détaillé des activités, matériel nécessaire
- Progression : séquençage logique des apprentissages
- Différenciation : suggestions pour adapter aux différents profils d'apprenants
- Engagement : variété d'approches pédagogiques
- Évaluation : propositions d'évaluations formatives et sommatives
- Longueur : 3-5 pages incluant aperçu et détails`,
    example: 'Séquence sur les fractions en mathématique, étude d\'un roman en français'
  },
  {
    id: 'detailed-lesson',
    title: 'Planification de leçon détaillée',
    category: 'pedagogical-planning',
    role: 'teaching',
    context: 'Préparation précise d\'une leçon spécifique',
    content: `Conçois un plan de leçon détaillé sur [notion spécifique] pour des élèves de [niveau scolaire], d'une durée de [préciser : minutes/périodes].

INTENTION : Cette leçon doit permettre aux élèves de comprendre et maîtriser la notion de manière approfondie, avec une attention particulière à l'engagement actif.

FORMAT :
- Structure : objectifs d'apprentissage, connaissances préalables, déroulement chronologique
- Matériel : liste précise des ressources nécessaires
- Questions clés : formulation des questions essentielles
- Rétroaction : moments et stratégies pour vérifier la compréhension
- Adaptations : modifications pour élèves à besoins particuliers
- Longueur : 2-3 pages`,
    example: 'Leçon sur les verbes au passé composé, introduction aux circuits électriques'
  }
];