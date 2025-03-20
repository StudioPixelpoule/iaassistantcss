import type { Prompt } from '../types';

export const strategicPrompts: Prompt[] = [
  {
    id: 'communication-plan',
    title: 'Plan de communication annuel',
    category: 'strategic',
    role: 'management',
    context: 'Planification stratégique des communications pour l\'année scolaire',
    content: `Développe un plan de communication annuel structuré pour [nom de l'établissement] couvrant l'année scolaire [année].

INTENTION : Ce plan doit servir d'outil stratégique permettant d'organiser, de planifier et de coordonner toutes les communications importantes de l'établissement de manière cohérente, proactive et efficace.

FORMAT :
- Structure : introduction présentant la vision et les objectifs de communication, calendrier annuel
- Présentation : tableau chronologique avec colonnes (période, public cible, message clé, canal)
- Sections spécifiques : communications internes, communications aux parents, relations communauté
- Alignement : liens explicites avec le projet éducatif et les priorités annuelles
- Évaluation : indicateurs de réussite pour mesurer l'efficacité des communications
- Longueur : 5-7 pages incluant le calendrier visuel et les tableaux`,
    example: 'Planification annuelle des communications, stratégie de diffusion du projet éducatif'
  },
  {
    id: 'sensitive-communication',
    title: 'Communication en situation sensible',
    category: 'strategic',
    role: 'management',
    context: 'Événements délicats nécessitant une communication soignée',
    content: `Rédige un modèle de communication pour [situation sensible : incident de sécurité/changement controversé/conflit] destiné à [public cible : personnel/parents/médias].

INTENTION : Cette communication doit informer de façon transparente tout en rassurant, limiter les inquiétudes et les rumeurs, maintenir la confiance envers l'établissement et sa direction.

FORMAT :
- Structure : reconnaissance de la situation, faits confirmés uniquement, mesures prises
- Ton : empathique mais factuel, rassurant sans minimiser, professionnel sans être distant
- Équilibre : transparence adéquate sans partage d'informations confidentielles
- Éléments à inclure : message adapté selon la gravité, variantes pour différents publics
- Validation : mention des personnes/services consultés avant diffusion si pertinent
- Longueur : concise (1 page maximum), allant à l'essentiel`,
    example: 'Communication sur un incident à l\'école, annonce d\'un changement impopulaire'
  },
  {
    id: 'inspiring-message',
    title: 'Message inspirant et mobilisateur',
    category: 'strategic',
    role: 'management',
    context: 'Lancement d\'initiatives, périodes clés de l\'année scolaire',
    content: `Compose un message inspirant pour [occasion : rentrée scolaire/lancement d'un projet/fin d'année] destiné à [public cible : équipe-école/élèves/parents].

INTENTION : Ce message doit inspirer, motiver et mobiliser autour d'une vision commune, reconnaître les efforts et réussites, et renforcer le sentiment d'appartenance.

FORMAT :
- Structure : introduction évocatrice, reconnaissance des réalités/défis, vision positive
- Ton : authentique, personnel et passionné tout en restant professionnel
- Style : phrases rythmées, images évocatrices, équilibre entre pragmatisme et inspiration
- Éléments spécifiques : références aux valeurs de l'école, mention de réussites concrètes
- Personnalisation : espace pour ajouter des références personnelles ou contextuelles
- Longueur : 1-2 pages maximum, privilégiant l'impact à l'exhaustivité`,
    example: 'Message de la rentrée, lancement d\'un nouveau projet éducatif'
  },
  {
    id: 'strategic-orientations',
    title: 'Communication des orientations stratégiques',
    category: 'strategic',
    role: 'management',
    context: 'Présentation de la vision et des objectifs à moyen/long terme',
    content: `Aide-moi à formuler un document présentant la vision pédagogique et les orientations stratégiques de [nom de l'établissement] pour les [nombre] prochaines années.

INTENTION : Ce document doit communiquer clairement la direction que prend l'établissement, aligner les efforts collectifs vers des objectifs communs, et inspirer l'engagement.

FORMAT :
- Structure : déclaration de mission concise, contexte et défis actuels, vision d'avenir
- Style : énoncés clairs et affirmatifs, vocabulaire inspirant mais concret
- Présentation : document visuel avec sections clairement délimitées
- Lien : articulation explicite avec le PEVR du Centre de services scolaire
- Consultation : mention du processus consultatif ayant mené à ces orientations
- Mesures : indicateurs de réussite clairs pour chaque orientation
- Longueur : version complète (5-6 pages) et version synthétique (1-2 pages)`,
    example: 'Plan stratégique triennal, actualisation du projet éducatif'
  }
];