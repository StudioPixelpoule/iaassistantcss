import type { Prompt } from '../types';

export const collaborationPrompts: Prompt[] = [
  {
    id: 'parent-communication',
    title: 'Communications aux parents',
    category: 'collaboration',
    role: 'teaching',
    context: 'Préparation de messages aux parents sur différents sujets',
    content: `Rédige un message aux parents d'élèves de [niveau scolaire] concernant [sujet : projet/résultats/activité/comportement].

INTENTION : Cette communication doit informer clairement les parents, favoriser leur collaboration avec l'école, et maintenir une relation positive.

FORMAT :
- Structure : introduction cordiale, explication claire, informations essentielles
- Ton : professionnel mais chaleureux, collaboratif
- Clarté : langage accessible évitant le jargon pédagogique
- Positivité : accent mis sur les aspects constructifs
- Action : indications précises sur les attentes
- Longueur : concis (maximum 1 page)`,
    example: 'Annonce d\'un projet, explication de résultats d\'évaluation'
  },
  {
    id: 'collaborative-activities',
    title: 'Activités collaboratives',
    category: 'collaboration',
    role: 'teaching',
    context: 'Planification de travaux d\'équipe ou d\'apprentissage coopératif',
    content: `Conçois une activité d'apprentissage collaboratif sur [thème/notion] pour des élèves de [niveau scolaire], favorisant [compétences ciblées].

INTENTION : Cette activité doit engager tous les élèves dans un apprentissage actif et interactif, développer des compétences sociales.

FORMAT :
- Structure : objectifs, formation des équipes, rôles, consignes étape par étape
- Interdépendance : conception nécessitant une véritable collaboration
- Responsabilisation : mécanismes pour la participation active
- Processus : équilibre entre contenu et habiletés de collaboration
- Évaluation : modalités d'évaluation individuelles et collectives
- Longueur : 2-3 pages incluant matériel`,
    example: 'Casse-tête d\'experts, projet d\'équipe structuré, cercles littéraires'
  }
];