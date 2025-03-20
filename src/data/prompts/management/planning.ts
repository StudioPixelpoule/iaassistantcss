import type { Prompt } from '../types';

export const planningPrompts: Prompt[] = [
  {
    id: 'educational-project',
    title: 'Plan de projet éducatif',
    category: 'planning',
    role: 'management',
    context: 'Développement et mise en œuvre de projets liés à la mission éducative',
    content: `Élabore un canevas détaillé pour le projet [nom ou thème du projet éducatif] en lien avec [priorité/besoin identifié dans l'école].

INTENTION : Ce canevas doit servir de feuille de route complète pour transformer une idée en réalisation concrète, faciliter la coordination de tous les intervenants, et maximiser l'impact pédagogique du projet.

FORMAT :
- Structure : résumé exécutif, justification pédagogique (liens avec le programme et les compétences), objectifs spécifiques, publics concernés, phases de déploiement, ressources nécessaires, calendrier détaillé, rôles et responsabilités, mécanismes d'évaluation
- Présentation : document structuré avec sections clairement délimitées et numérotées
- Pédagogie : explicitation des bénéfices attendus pour les apprentissages et le développement des élèves
- Inclusivité : considérations pour l'adaptation aux élèves à besoins particuliers
- Collaboration : identification des partenariats internes et externes
- Évaluation : indicateurs de réussite et mécanismes de suivi
- Longueur : 8-10 pages incluant annexes pratiques`,
    example: 'Plan pour un projet interdisciplinaire, initiative de bien-être à l\'école, programme de mentorat'
  },
  {
    id: 'strategic-planning',
    title: 'Planification stratégique',
    category: 'planning',
    role: 'management',
    context: 'Organisation du changement, développement organisationnel',
    content: `Crée un modèle de planification stratégique pour [initiative/changement/développement] au sein de [nom de l'établissement] sur une période de [durée].

INTENTION : Cette planification doit transformer une vision en actions concrètes, séquencer logiquement les étapes, impliquer l'ensemble des parties prenantes, et permettre un déploiement efficace du changement.

FORMAT :
- Structure : analyse de la situation actuelle (forces/faiblesses/opportunités/menaces), objectifs stratégiques, indicateurs de succès, plan d'action détaillé par phase, besoins en ressources, stratégie de communication, analyse des risques, mécanismes d'évaluation continue
- Style : pragmatique et opérationnel, orienté vers l'action
- Gestion du changement : stratégies pour l'adhésion des différentes parties prenantes
- Planification : diagrammes de Gantt ou calendriers visuels pour les phases clés
- Gouvernance : structure décisionnelle et mécanismes de suivi clairement identifiés
- Adaptabilité : points de contrôle et mécanismes d'ajustement en cours de réalisation
- Longueur : 12-15 pages pour un projet d'envergure moyenne`,
    example: 'Implantation d\'une nouvelle approche pédagogique, réorganisation des services'
  }
];