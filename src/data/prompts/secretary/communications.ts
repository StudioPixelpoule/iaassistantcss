import type { Prompt } from '../types';

export const communicationPrompts: Prompt[] = [
  {
    id: 'standard-letter',
    title: 'Lettre d\'information standard',
    category: 'communications',
    role: 'secretary',
    context: 'Pour les communications régulières (activités, rappels, événements)',
    content: `Rédige une lettre d'information aux parents d'élèves de [niveau scolaire] concernant [événement/activité/information] prévu(e) pour le [date précise].

INTENTION : Cette communication doit informer clairement les parents de tous les détails pertinents tout en reflétant le professionnalisme de notre établissement. Elle doit être accessible à tous les parents, quelle que soit leur maîtrise du français.

FORMAT :
- Longueur : une page maximum
- Structure : en-tête avec logo de l'école (à ajouter ultérieurement), introduction concise expliquant l'objectif de la communication, détails essentiels en paragraphes courts ou puces, conclusion avec action requise si nécessaire
- Ton : professionnel mais chaleureux et accessible
- Éléments spécifiques : inclure clairement la date, l'heure, le lieu, le matériel nécessaire s'il y a lieu
- Signature : au nom de [nom du directeur/directrice] et de l'équipe de [nom de l'école]`,
    example: 'Communication sur une journée pédagogique, sortie éducative, réunion parents-enseignants'
  },
  {
    id: 'urgent-communication',
    title: 'Communication urgente',
    category: 'communications',
    role: 'secretary',
    context: 'Situations nécessitant une action rapide ou information délicate',
    content: `Rédige une communication urgente aux parents concernant [situation : fermeture imprévue/incident/changement de dernière minute] survenu(e) le [date].

INTENTION : Cette communication doit informer rapidement et clairement les parents, donner toutes les instructions nécessaires, rassurer tout en restant factuelle, et prévenir les inquiétudes excessives.

FORMAT :
- Longueur : paragraphes courts et concis (maximum 3/4 de page)
- Structure : objet explicite en gras, explication factuelle de la situation, mesures prises par l'école, actions attendues des parents, coordonnées pour questions
- Ton : calme, informatif et rassurant sans minimiser la situation
- Éléments essentiels : instructions claires sur ce que doivent faire les parents, personne-ressource à contacter pour plus d'informations
- Mise en page : utiliser des caractères gras pour les informations cruciales et les délais`,
    example: 'Fermeture d\'urgence due à une panne de chauffage, cas de maladie contagieuse'
  },
  {
    id: 'deadline-reminder',
    title: 'Rappel pour documents ou échéances',
    category: 'communications',
    role: 'secretary',
    context: 'Suivi des dossiers incomplets, rappels d\'échéances',
    content: `Rédige un rappel courtois aux parents concernant [documents manquants/inscription/paiement/autorisation] dont l'échéance est fixée au [date].

INTENTION : Ce rappel doit inciter à l'action rapide sans être accusatoire, souligner l'importance de ces documents pour le bon fonctionnement administratif et le suivi adéquat de l'élève.

FORMAT :
- Longueur : court et direct (maximum 1/2 page)
- Structure : rappel de l'obligation et de l'échéance initiale, liste des documents/actions en attente, nouvelle échéance, conséquences potentielles du retard, offre d'assistance
- Ton : serviable et compréhensif plutôt que réprobateur
- Éléments spécifiques : mentions des moyens faciles de soumettre les documents
- Personnalisation : espace pour indiquer précisément ce qui manque pour chaque élève`,
    example: 'Formulaires d\'inscription non retournés, autorisations pour sorties'
  },
  {
    id: 'event-invitation',
    title: 'Invitation à un événement scolaire',
    category: 'communications',
    role: 'secretary',
    context: 'Occasions spéciales et rassemblements',
    content: `Crée une invitation attrayante pour [événement : remise de diplômes/spectacle/exposition/portes ouvertes] qui aura lieu le [date] à [heure] à [lieu précis].

INTENTION : Cette invitation doit générer de l'enthousiasme, maximiser la participation des parents, et mettre en valeur les réalisations des élèves et de l'école.

FORMAT :
- Longueur : une page maximum, aérée et visuellement attrayante
- Structure : titre accrocheur, présentation de l'événement, détails pratiques, points forts à ne pas manquer
- Ton : enthousiaste et festif tout en restant professionnel
- Éléments visuels : suggestions d'emplacement pour 1-2 images thématiques
- Conclusion : formule cordiale d'invitation et mention de l'importance de la présence des familles`,
    example: 'Spectacle de fin d\'année, exposition de projets d\'élèves'
  }
];