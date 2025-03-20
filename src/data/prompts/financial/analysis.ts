import type { Prompt } from '../types';

export const analysisPrompts: Prompt[] = [
  {
    id: 'budget-variance',
    title: 'Analyse d\'écarts budgétaires',
    category: 'analysis',
    role: 'financial',
    context: 'Suivi périodique de l\'exécution budgétaire, identification des variations significatives',
    content: `Développe un canevas d'analyse des écarts budgétaires pour [département/école/projet] sur la période [préciser : mois/trimestre] avec une comparaison prévision vs réalité.

INTENTION : Cette analyse doit permettre d'identifier clairement les variations significatives, d'en comprendre les causes probables, et de proposer des mesures correctives adaptées ou des réalignements budgétaires.

FORMAT :
- Structure : sommaire exécutif (constats principaux), tableau comparatif détaillé par poste budgétaire, analyse des écarts significatifs (>5% ou >X$), impacts potentiels sur l'exercice financier global, recommandations pour ajustements
- Présentation : tableaux avec code couleur pour signaler l'importance des écarts, graphiques d'évolution
- Éléments d'analyse : distinction entre écarts ponctuels et tendanciels, facteurs explicatifs
- Niveau de détail : analyse par catégorie budgétaire principale
- Contextualisation : considérations spécifiques au milieu scolaire
- Longueur : 4-5 pages incluant tableaux et graphiques`,
    example: 'Analyse mensuelle des dépenses d\'une école, suivi trimestriel d\'un projet spécial'
  },
  {
    id: 'financial-report',
    title: 'Rapport financier périodique',
    category: 'analysis',
    role: 'financial',
    context: 'Présentation régulière de la situation financière aux différentes parties prenantes',
    content: `Crée un modèle de rapport financier [mensuel/trimestriel] destiné à [public cible : conseil d'établissement/direction générale/gestionnaires] pour [établissement/service/CSS global].

INTENTION : Ce rapport doit présenter de façon claire et accessible la situation financière actuelle, permettre un suivi efficace de l'exécution budgétaire, et faciliter la prise de décision financière éclairée.

FORMAT :
- Structure : faits saillants (1 page), état des revenus et dépenses par poste budgétaire, analyse des écarts, projection révisée pour la fin de l'année, indicateurs financiers clés
- Présentation : combinaison de tableaux chiffrés et de graphiques d'évolution
- Adaptation : niveau de détail ajusté selon le public cible
- Éléments spécifiques : glossaire des termes financiers pour les non-spécialistes
- Visualisation : utilisation de graphiques pour illustrer les tendances
- Longueur : 5-7 pages incluant les annexes techniques`,
    example: 'Rapport mensuel à la direction générale, présentation trimestrielle aux directions'
  }
];