import type { Prompt } from '../types';

export const meetingPrompts: Prompt[] = [
  {
    id: 'strategic-agenda',
    title: 'Ordre du jour stratégique',
    category: 'meetings',
    role: 'management',
    context: 'Préparation de réunions efficaces et productives',
    content: `Prépare un ordre du jour stratégique pour la réunion [type de réunion : conseil d'établissement/équipe de direction/assemblée générale] du [date] portant principalement sur [thématiques principales].

INTENTION : Cet ordre du jour doit optimiser le temps de réunion en priorisant les sujets stratégiques, faciliter des discussions productives, et aboutir à des décisions claires et à des actions concrètes.

FORMAT :
- Structure : accueil et présentation des objectifs de la réunion, adoption de procédures, points de décision (prioritaires), points d'information, période de discussion, récapitulatif des actions et responsabilités, conclusion
- Présentation : tableau avec colonnes (points, objectif spécifique - information/discussion/décision, documents associés, intervenant, durée prévue)
- Préparation : notes sur la préparation attendue des participants
- Questions de cadrage : formulation précise des questions pour orienter les discussions
- Priorisation : identification claire des points incontournables vs optionnels
- Gestion du temps : allocation réaliste du temps selon l'importance des sujets
- Longueur : 1-2 pages maximum, privilégiant la clarté et l'efficacité`,
    example: 'Réunion du conseil d\'établissement, rencontre du comité de pilotage'
  },
  {
    id: 'executive-summary',
    title: 'Compte-rendu exécutif',
    category: 'meetings',
    role: 'management',
    context: 'Documentation efficace des réunions et suivi des décisions',
    content: `Crée un modèle de compte-rendu exécutif pour les réunions [type de réunion] permettant une synthèse efficace et un suivi rigoureux des décisions.

INTENTION : Ce modèle doit faciliter la documentation claire des discussions importantes et des décisions prises, permettre un suivi efficace des actions à entreprendre, et servir de référence officielle accessible.

FORMAT :
- Structure : informations administratives (date, participants, absents), décisions prises (avec résultat des votes si applicable), résumé concis des discussions par point, actions à suivre (avec responsable et échéance), points reportés, date de la prochaine réunion
- Présentation : format concis privilégiant les tableaux et listes à puces plutôt que de longs paragraphes
- Suivi des actions : système de tracking clair (code couleur, statut), échéancier
- Consultation : organisation permettant de retrouver facilement une information spécifique
- Diffusion : recommandations pour la diffusion appropriée du document selon le type de réunion
- Approbation : espace pour validation lors de la réunion suivante
- Longueur : 2-3 pages maximum, synthétique mais complet`,
    example: 'Procès-verbal de conseil d\'établissement, compte-rendu de comité'
  }
];