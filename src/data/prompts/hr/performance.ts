import type { Prompt } from '../types';

export const performancePrompts: Prompt[] = [
  {
    id: 'performance-evaluation',
    title: 'Cadre d\'évaluation de rendement',
    category: 'performance',
    role: 'hr',
    context: 'Développement ou révision des systèmes d\'évaluation du personnel',
    content: `Élabore un cadre d'évaluation du rendement pour [catégorie d'employés] intégrant objectifs individuels et compétences organisationnelles.

INTENTION : Ce cadre doit permettre une évaluation objective et équitable de la performance, stimuler le développement professionnel.

FORMAT :
- Structure : philosophie d'évaluation, cycle annuel, définition des attentes
- Présentation : formulaires structurés pour chaque étape
- Éléments spécifiques : guide d'entretien d'évaluation
- Conformité : alignement avec les conventions collectives
- Équilibre : combinaison d'évaluation rétrospective et d'orientation future
- Longueur : guide complet (12-15 pages) avec formulaires`,
    example: 'Évaluation des enseignants, appréciation du rendement du personnel administratif'
  },
  {
    id: 'improvement-plan',
    title: 'Plan d\'amélioration de la performance',
    category: 'performance',
    role: 'hr',
    context: 'Accompagnement des employés rencontrant des difficultés significatives',
    content: `Crée un modèle de plan d'amélioration de la performance pour les situations où un employé rencontre des difficultés significatives dans [domaine].

INTENTION : Ce plan doit offrir une approche structurée pour adresser les problèmes de performance, fournir un soutien approprié.

FORMAT :
- Structure : description objective des problèmes, attentes clairement définies
- Présentation : document formel avec sections clairement délimitées
- Éléments spécifiques : distinction entre problèmes de compétence et de volonté
- Conformité : respect des étapes prévues dans les conventions collectives
- Documentation : mécanismes de suivi et d'enregistrement des progrès
- Longueur : 3-4 pages incluant espace pour documentation`,
    example: 'Plan d\'amélioration pour un enseignant en difficulté, intervention sur la ponctualité'
  },
  {
    id: 'recognition-program',
    title: 'Programme de reconnaissance et valorisation',
    category: 'performance',
    role: 'hr',
    context: 'Développement d\'initiatives pour renforcer l\'engagement et la satisfaction',
    content: `Développe un programme de reconnaissance et valorisation du personnel pour [établissement/service].

INTENTION : Ce programme doit créer une culture de reconnaissance qui valorise les contributions.

FORMAT :
- Structure : philosophie et objectifs, types de reconnaissance, critères de sélection
- Présentation : document inspirant avec exemples concrets
- Composantes : reconnaissance quotidienne, célébrations d'étapes
- Inclusivité : mécanismes pour reconnaître équitablement
- Mesure : indicateurs de succès du programme
- Longueur : guide principal (8-10 pages) + outils pratiques`,
    example: 'Programme de reconnaissance pour une école, valorisation des innovations'
  },
  {
    id: 'conflict-management',
    title: 'Gestion des conflits et médiation',
    category: 'performance',
    role: 'hr',
    context: 'Intervention dans des situations relationnelles difficiles',
    content: `Élabore un cadre d'intervention pour la gestion constructive des [type de conflit] dans le contexte scolaire.

INTENTION : Ce cadre doit offrir une approche structurée pour résoudre les conflits et prévenir l'escalade.

FORMAT :
- Structure : signes et niveaux de conflit, principes d'intervention
- Présentation : guide pour les intervenants RH et gestionnaires
- Éléments spécifiques : scripts pour les conversations difficiles
- Prévention : stratégies pour anticiper les tensions
- Documentation : consignes pour la documentation adéquate
- Longueur : 8-10 pages incluant outils pratiques`,
    example: 'Gestion des conflits entre enseignants, médiation dans une équipe'
  }
];