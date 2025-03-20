import type { Prompt } from '../types';

export const evaluationPrompts: Prompt[] = [
  {
    id: 'formative-evaluation',
    title: 'Outils d\'évaluation formative',
    category: 'evaluation',
    role: 'teaching',
    context: 'Création d\'instruments pour vérifier la compréhension en cours d\'apprentissage',
    content: `Élabore [nombre] activités d'évaluation formative pour vérifier la compréhension de [notion/compétence] chez des élèves de [niveau scolaire].

INTENTION : Ces activités doivent permettre de vérifier rapidement et efficacement la compréhension des élèves et orienter les interventions pédagogiques.

FORMAT :
- Structure : variété d'outils (questions flash, billets de sortie, mini-quiz)
- Rapidité : activités courtes permettant une rétroaction immédiate
- Diagnostic : questions ciblant les difficultés typiques
- Interprétation : guide d'analyse des résultats
- Différenciation : suggestions d'interventions selon les résultats
- Longueur : activités brèves (5-10 minutes) avec guide`,
    example: 'Questions à main levée avec cartons de réponse, billets de sortie thématiques'
  },
  {
    id: 'summative-evaluation',
    title: 'Évaluations sommatives',
    category: 'evaluation',
    role: 'teaching',
    context: 'Création d\'évaluations de fin d\'étape ou d\'unité',
    content: `Développe une évaluation sommative sur [unité/module d'apprentissage] pour des élèves de [niveau scolaire], alignée avec les compétences du programme.

INTENTION : Cette évaluation doit mesurer avec justesse le niveau de maîtrise des élèves par rapport aux objectifs d'apprentissage.

FORMAT :
- Structure : consignes claires, sections organisées par compétence
- Équilibre : répartition appropriée entre les concepts
- Validité : questions alignées avec les objectifs enseignés
- Variété : combinaison de formats de questions
- Notation : barème de correction clair
- Longueur : 4-6 pages incluant guide de correction`,
    example: 'Examen de fin d\'unité en mathématiques, évaluation de compréhension de lecture'
  }
];