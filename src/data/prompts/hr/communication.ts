import type { Prompt } from '../types';

export const communicationPrompts: Prompt[] = [
  {
    id: 'hr-policies-guide',
    title: 'Guide des politiques RH',
    category: 'hr-communications',
    role: 'hr',
    context: 'Vulgarisation et diffusion des politiques et procédures',
    content: `Élabore un guide des politiques RH vulgarisé destiné aux [gestionnaires/employés] couvrant les aspects essentiels de la gestion des ressources humaines au CSS.

INTENTION : Ce guide doit démystifier les politiques et procédures RH complexes, harmoniser les pratiques de gestion.

FORMAT :
- Structure : introduction sur le cadre légal, sections thématiques, foire aux questions
- Présentation : format convivial avec onglets ou index
- Langage : vulgarisation des termes techniques et juridiques
- Éléments pratiques : exemples concrets, études de cas
- Conformité : références aux conventions collectives
- Longueur : version complète (30+ pages) et fiches synthétiques`,
    example: 'Guide des congés et absences, manuel des politiques de recrutement'
  },
  {
    id: 'hr-change-communication',
    title: 'Communications sur les changements RH',
    category: 'hr-communications',
    role: 'hr',
    context: 'Annonce de modifications aux politiques, procédures ou avantages',
    content: `Rédige une communication annonçant [changement : nouvelle politique/modification] destinée à [public cible] du Centre de Services Scolaire.

INTENTION : Cette communication doit informer clairement sur les changements et leurs implications, réduire l'incertitude.

FORMAT :
- Structure : annonce claire du changement, contexte et justification, détails essentiels
- Ton : empathique mais factuel, reconnaissant les défis
- Éléments spécifiques : FAQ anticipant les préoccupations
- Canal : recommandations sur le meilleur moyen de diffusion
- Accompagnement : ressources disponibles pour soutenir la transition
- Longueur : 1-2 pages pour le message principal + annexes`,
    example: 'Annonce d\'une nouvelle politique de télétravail, changement aux avantages sociaux'
  },
  {
    id: 'hr-process-documentation',
    title: 'Documentation de processus RH',
    category: 'hr-communications',
    role: 'hr',
    context: 'Formalisation et standardisation des procédures internes',
    content: `Développe une documentation détaillée du processus de [processus RH] pour assurer une application cohérente.

INTENTION : Cette documentation doit standardiser les pratiques et clarifier les responsabilités.

FORMAT :
- Structure : objectifs du processus, cadre légal, rôles et responsabilités
- Présentation : logigramme du processus, tableau des responsabilités
- Éléments pratiques : modèles de formulaires annotés
- Conformité : vérification avec les conventions collectives
- Adaptabilité : notes sur les adaptations possibles
- Longueur : 5-7 pages pour le processus principal + annexes`,
    example: 'Procédure de traitement des plaintes, gestion des invalidités'
  },
  {
    id: 'hr-faq',
    title: 'Foire aux questions RH',
    category: 'hr-communications',
    role: 'hr',
    context: 'Réponse aux interrogations fréquentes des employés et gestionnaires',
    content: `Crée une FAQ complète sur [thème RH] destinée aux [employés/gestionnaires] du CSS.

INTENTION : Cette FAQ doit répondre clairement aux questions fréquentes et réduire les demandes répétitives.

FORMAT :
- Structure : regroupement thématique des questions, progression logique
- Présentation : format question-réponse avec système de recherche
- Langage : combinaison de précision technique et d'accessibilité
- Spécificité : réponses adaptées au contexte du CSS
- Références : liens vers les documents officiels
- Longueur : 20-30 questions couvrant les aspects principaux`,
    example: 'FAQ sur les congés parentaux, questions-réponses sur les assurances'
  }
];