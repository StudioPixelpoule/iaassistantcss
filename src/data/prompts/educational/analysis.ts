import type { Prompt } from '../types';

export const analysisPrompts: Prompt[] = [
  {
    id: 'practice-analysis',
    title: 'Analyse de pratiques',
    category: 'analysis',
    role: 'educational',
    context: 'Développement d\'outils d\'observation et d\'analyse de l\'enseignement',
    content: `Conçois un cadre d'analyse de pratiques pour [domaine spécifique] à utiliser lors d'observations ou d'accompagnement d'enseignants.

INTENTION : Ce cadre doit permettre une observation et une analyse objectives et constructives des pratiques.

FORMAT :
- Structure : dimensions clés à observer, indicateurs observables
- Objectivité : focus sur des comportements et actions observables
- Fondements : ancrage dans la recherche sur les pratiques efficaces
- Utilité : organisation facilitant la prise de notes
- Longueur : outil principal (3-5 pages) + guide d'utilisation`,
    example: 'Grille d\'observation de pratiques de différenciation, cadre d\'analyse du questionnement'
  },
  {
    id: 'learning-results',
    title: 'Analyse de résultats d\'apprentissage',
    category: 'analysis',
    role: 'educational',
    context: 'Interprétation pédagogique des données de performance des élèves',
    content: `Développe un cadre d'analyse des résultats [type de résultats] en [matière] pour les élèves de [niveau].

INTENTION : Ce cadre doit permettre une interprétation pédagogique approfondie des résultats.

FORMAT :
- Structure : méthodologie d'analyse, dimensions à examiner
- Perspectives multiples : analyse par compétence, par groupe
- Contextualisation : considération des facteurs d'influence
- Tendances : méthodes pour identifier les patterns significatifs
- Longueur : méthodologie (4-6 pages) + gabarits d'analyse`,
    example: 'Analyse des résultats d\'épreuves ministérielles, interprétation des bulletins'
  }
];