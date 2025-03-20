import type { Prompt } from '../types';

export const analysisPrompts: Prompt[] = [
  {
    id: 'results-analysis',
    title: 'Analyse de résultats scolaires',
    category: 'analysis',
    role: 'management',
    context: 'Interprétation des données de réussite et planification des interventions',
    content: `Élabore un canevas d'analyse des résultats scolaires de [niveau/matière/période] pour [nom de l'établissement].

INTENTION : Cette analyse doit permettre d'identifier les tendances significatives, de comprendre les facteurs de réussite ou d'échec, et d'orienter les interventions pédagogiques et organisationnelles futures.

FORMAT :
- Structure : sommaire exécutif, méthodologie d'analyse, présentation des résultats globaux, analyse par sous-groupes pertinents (niveaux, classes, populations spécifiques), comparaison avec les années précédentes et objectifs fixés, facteurs explicatifs potentiels, recommandations concrètes
- Présentation : tableaux comparatifs, graphiques d'évolution, code couleur pour les zones d'attention
- Contexte : considération des facteurs environnementaux et situationnels
- Nuance : analyse qualitative complétant les données quantitatives
- Équité : attention particulière aux écarts entre différents groupes d'élèves
- Action : lien explicite entre l'analyse et les recommandations pédagogiques
- Collaboration : pistes pour une démarche collaborative d'interprétation avec l'équipe-école
- Longueur : 6-8 pages incluant les visualisations`,
    example: 'Analyse des résultats de fin d\'étape, bilan des évaluations ministérielles'
  },
  {
    id: 'annual-report',
    title: 'Rapport annuel d\'établissement',
    category: 'analysis',
    role: 'management',
    context: 'Reddition de comptes et communication des réalisations',
    content: `Développe une structure complète pour le rapport annuel [année scolaire] de [nom de l'établissement] destiné au Centre de services scolaire et à la communauté.

INTENTION : Ce rapport doit présenter de façon transparente et valorisante les réalisations, les défis et les résultats de l'année scolaire, démontrer l'alignement avec les objectifs stratégiques, et renforcer la confiance des parties prenantes.

FORMAT :
- Structure : message de la direction, portrait de l'établissement, faits saillants de l'année, résultats en lien avec les objectifs du projet éducatif, vie scolaire et parascolaire, implication communautaire, gouvernance et ressources, défis et perspectives
- Présentation : document professionnel avec sections clairement délimitées, suggestions d'éléments visuels (graphiques, photos, témoignages)
- Équilibre : mise en valeur des réussites sans occulter les défis
- Accessibilité : langage clair évitant le jargon administratif
- Objectivité : appui sur des données factuelles et vérifiables
- Inclusivité : représentation de tous les aspects de la vie scolaire
- Prospective : regard sur l'année à venir et les orientations futures
- Longueur : 15-20 pages pour la version complète, avec suggestion de résumé exécutif (2-3 pages)`,
    example: 'Rapport annuel statutaire, bilan de fin d\'année pour le CSS'
  }
];