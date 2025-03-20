import type { Prompt } from '../types';

export const recruitmentPrompts: Prompt[] = [
  {
    id: 'job-description',
    title: 'Description de poste',
    category: 'recruitment',
    role: 'hr',
    context: 'Création ou mise à jour d\'affichages de postes attractifs et précis',
    content: `Rédige une description de poste complète pour [titre du poste] au sein du [établissement/service] du Centre de Services Scolaire.

INTENTION : Cette description doit présenter clairement les responsabilités et exigences du poste, attirer des candidats qualifiés, et servir de base pour l'évaluation et le développement professionnel futur.

FORMAT :
- Structure : titre du poste, supérieur immédiat, sommaire du rôle, responsabilités principales
- Style : phrases concises débutant par des verbes d'action, terminologie précise mais accessible
- Éléments spécifiques : distinguer clairement exigences essentielles vs atouts
- Conformité : alignement avec les conventions collectives applicables
- Attrait : inclusion des avantages et opportunités de développement offerts
- Longueur : 2 pages maximum`,
    example: 'Description de poste pour enseignant spécialisé, technicien en éducation spécialisée'
  },
  {
    id: 'interview-questions',
    title: 'Questions d\'entrevue structurée',
    category: 'recruitment',
    role: 'hr',
    context: 'Préparation d\'entretiens d\'embauche efficaces et équitables',
    content: `Développe une grille d'entrevue structurée pour le poste de [titre du poste] mettant l'accent sur les compétences essentielles.

INTENTION : Cette grille doit permettre une évaluation objective et équitable des candidats, explorer efficacement leurs compétences et expériences pertinentes.

FORMAT :
- Structure : introduction standardisée, questions par compétence clé, questions situationnelles
- Présentation : tableau avec colonnes (questions, éléments à rechercher, échelle d'évaluation)
- Types de questions : mélange de questions comportementales et situationnelles
- Éléments spécifiques : exemples de réponses attendues (faible/moyen/fort)
- Conformité : vérification de l'absence de questions discriminatoires
- Longueur : 4-5 pages incluant introduction et conclusion d'entrevue`,
    example: 'Entrevue pour enseignant, processus de sélection pour un poste de direction'
  },
  {
    id: 'talent-attraction',
    title: 'Stratégie d\'attraction de talents',
    category: 'recruitment',
    role: 'hr',
    context: 'Développement d\'approches innovantes pour le recrutement dans un marché compétitif',
    content: `Élabore une stratégie d'attraction et de rétention pour les [type de postes] dans un contexte de pénurie de main-d'œuvre.

INTENTION : Cette stratégie doit renforcer la position du CSS comme employeur de choix, diversifier les sources de recrutement.

FORMAT :
- Structure : analyse de la situation actuelle, profil des candidats recherchés
- Présentation : document stratégique avec sections clairement délimitées
- Éléments innovants : stratégies numériques, partenariats potentiels
- Mesurabilité : indicateurs de succès, objectifs SMART
- Spécificités : adaptation aux réalités du milieu scolaire québécois
- Longueur : 8-10 pages avec annexes opérationnelles`,
    example: 'Stratégie pour recruter des enseignants, plan d\'attraction de professionnels'
  },
  {
    id: 'screening-process',
    title: 'Processus de présélection',
    category: 'recruitment',
    role: 'hr',
    context: 'Optimisation du tri des candidatures pour les postes à volume élevé',
    content: `Conçois un processus de présélection efficace pour les candidatures au poste de [titre du poste].

INTENTION : Ce processus doit permettre d'identifier efficacement les candidats les plus prometteurs, optimiser le temps des recruteurs.

FORMAT :
- Structure : critères de présélection hiérarchisés, méthodologie d'évaluation
- Présentation : grilles d'évaluation avec pondération
- Objectivité : critères mesurables et observables
- Efficacité : suggestions pour l'automatisation des étapes initiales
- Communication : modèles de correspondance pour les différentes étapes
- Longueur : 3-4 pages pour le processus principal + outils`,
    example: 'Présélection pour postes d\'enseignants suppléants, filtrage des candidatures'
  }
];