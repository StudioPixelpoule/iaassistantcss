import type { Prompt } from '../types';

export const crisisPrompts: Prompt[] = [
  {
    id: 'crisis-management',
    title: 'Gestion de crise',
    category: 'planning',
    role: 'management',
    context: 'Préparation aux situations d\'urgence ou problématiques',
    content: `Développe un protocole de gestion de crise pour [type de situation : urgence sanitaire/incident sécuritaire/crise médiatique] adapté au contexte scolaire.

INTENTION : Ce protocole doit permettre une réaction rapide, coordonnée et appropriée en situation d'urgence, clarifier les rôles et responsabilités, et minimiser les impacts négatifs.

FORMAT :
- Structure : niveaux d'alerte et critères de déclenchement, chaîne de commandement précise
- Présentation : logigramme décisionnel, fiches d'action par rôle
- Préparation : mesures préventives et de préparation, formation requise
- Communication : modèles de messages prérédigés pour différents scénarios
- Après-crise : procédures de débriefing, soutien aux personnes affectées
- Conformité : alignement avec les protocoles du CSS et autres réglementations
- Accessibilité : format permettant une consultation rapide en situation de stress`,
    example: 'Protocole pour incident violent, plan pandémique, gestion de crise médiatique'
  }
];