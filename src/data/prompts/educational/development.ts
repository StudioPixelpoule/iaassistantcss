import type { Prompt } from '../types';

export const developmentPrompts: Prompt[] = [
  {
    id: 'teacher-training',
    title: 'Formation pour enseignants',
    category: 'training',
    role: 'educational',
    context: 'Développement d\'une formation complète sur un sujet pédagogique',
    content: `Conçois un plan de formation complet sur [thématique pédagogique] destiné aux [public cible : enseignants de quel niveau/matière] d'une durée de [préciser : heures/jours].

INTENTION : Cette formation doit permettre aux participants d'approfondir leur compréhension de cette thématique, d'acquérir des stratégies concrètes applicables en classe, et de développer une posture réflexive sur leur pratique.

FORMAT :
- Structure : objectifs d'apprentissage précis, progression andragogique logique, activités variées
- Approche : équilibre entre théorie et pratique, valorisation de l'expertise des participants
- Organisation : découpage chronologique détaillé avec durée estimée pour chaque activité
- Différenciation : suggestions pour adapter aux divers niveaux d'expérience
- Engagement : variété d'approches andragogiques
- Longueur : 5-7 pages incluant déroulement détaillé et annexes essentielles`,
    example: 'Formation sur l\'enseignement explicite, atelier sur l\'évaluation formative'
  },
  {
    id: 'collaborative-workshop',
    title: 'Atelier collaboratif',
    category: 'collaboration',
    role: 'educational',
    context: 'Conception de séances de travail avec des équipes-écoles',
    content: `Développe un atelier collaboratif de [durée] sur [thématique] pour une équipe-école visant à [objectif principal].

INTENTION : Cet atelier doit mobiliser l'intelligence collective de l'équipe pour produire des résultats concrets et applicables.

FORMAT :
- Structure : introduction mobilisatrice, activité brise-glace, alternance travail en sous-groupes et mise en commun
- Animation : techniques de facilitation pour maximiser la participation
- Collaboration : mécanismes pour assurer la contribution de tous
- Production : gabarits et outils structurants
- Longueur : 3-5 pages incluant déroulement et documents de travail`,
    example: 'Atelier d\'élaboration de critères d\'évaluation communs, planification d\'un projet-école'
  }
];