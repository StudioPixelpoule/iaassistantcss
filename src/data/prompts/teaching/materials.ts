import type { Prompt } from '../types';

export const materialsPrompts: Prompt[] = [
  {
    id: 'exercise-sheets',
    title: 'Feuilles d\'exercices et activités',
    category: 'teaching-materials',
    role: 'teaching',
    context: 'Création de matériel de pratique pour consolider les apprentissages',
    content: `Crée une feuille d'exercices sur [notion précise] pour des élèves de [niveau scolaire], avec une progression du niveau de difficulté.

INTENTION : Cette feuille d'exercices doit permettre aux élèves de pratiquer et consolider la notion de manière progressive, tout en maintenant leur motivation.

FORMAT :
- Structure : brève révision théorique, exercices par niveau de difficulté croissant
- Quantité : [nombre] exercices au total, équitablement répartis
- Variété : différents formats de questions
- Contextes : exemples concrets liés au quotidien des élèves
- Présentation : mise en page aérée, espace suffisant
- Longueur : 1-2 pages d'exercices + corrigé`,
    example: 'Exercices de conjugaison, pratique de calculs'
  },
  {
    id: 'problem-situations',
    title: 'Situations-problèmes',
    category: 'teaching-materials',
    role: 'teaching',
    context: 'Création de problèmes complexes favorisant le transfert des apprentissages',
    content: `Élabore une situation-problème authentique sur [thématique/concept] pour des élèves de [niveau scolaire], nécessitant l'application de [compétences/connaissances spécifiques].

INTENTION : Cette situation-problème doit engager les élèves dans une démarche de résolution complexe et signifiante.

FORMAT :
- Structure : mise en contexte engageante, problématique claire, contraintes
- Authenticité : lien avec des situations réelles
- Complexité : nécessité d'utiliser plusieurs connaissances
- Accompagnement : questions de guidage pour soutenir la réflexion
- Enrichissement : extensions possibles
- Longueur : 1-2 pages pour l'élève + notes pédagogiques`,
    example: 'Résolution de problèmes mathématiques complexes, analyse de cas en univers social'
  }
];