import type { Prompt } from '../types';

export const documentPrompts: Prompt[] = [
  {
    id: 'meeting-agenda',
    title: 'Ordre du jour de réunion',
    category: 'documents',
    role: 'secretary',
    context: 'Préparation des rencontres (équipe-école, conseil d\'établissement, comités)',
    content: `Crée un ordre du jour détaillé pour la réunion [type de réunion : personnel/conseil d'établissement/comité] prévue le [date] à [heure] portant principalement sur [thèmes principaux].

INTENTION : Ce document doit organiser efficacement la réunion, permettre à tous les participants de se préparer adéquatement, et garantir que tous les sujets importants soient abordés dans le temps imparti.

FORMAT :
- Structure : en-tête complet (titre, date, heure, lieu, participants attendus), points à l'ordre du jour numérotés avec temps alloué pour chacun, indication des intervenants par point
- Éléments spécifiques : inclure des points standards (adoption de l'ordre du jour, approbation du PV précédent, varia, date de la prochaine réunion)
- Présentation : tableau avec colonnes (point, responsable, durée, documents associés)
- Longueur : une page (recto) dans la mesure du possible
- Adaptations : ajout de pièces jointes ou documents à consulter au préalable si nécessaire`,
    example: 'Réunion mensuelle du personnel, conseil d\'établissement, comité de perfectionnement'
  },
  {
    id: 'minutes',
    title: 'Procès-verbal',
    category: 'documents',
    role: 'secretary',
    context: 'Documentation des décisions et discussions lors des réunions',
    content: `Crée un modèle de procès-verbal pour la réunion [type de réunion] qui s'est tenue le [date] concernant [sujets principaux].

INTENTION : Ce document doit servir de trace officielle de la réunion, permettre aux personnes absentes de comprendre les discussions et décisions, et faciliter le suivi des actions décidées.

FORMAT :
- Structure : en-tête complet (titre, date, lieu, liste des présents/absents/excusés), ordre du jour réel, compte-rendu des discussions par point, décisions prises (clairement mises en évidence), actions à suivre avec responsables et échéances, heure de fin, signature du rédacteur
- Style : phrases complètes, temps au présent, formulation neutre et factuelle
- Présentation : numérotation cohérente avec l'ordre du jour, tableau pour les actions à suivre
- Éléments particuliers : encadrer ou mettre en gras les décisions officielles et votes
- Longueur : proportionnelle à la durée et complexité de la réunion (généralement 2-4 pages)`,
    example: 'Documentation des réunions officielles, synthèse des journées pédagogiques'
  },
  {
    id: 'admin-procedure',
    title: 'Procédure administrative',
    category: 'documents',
    role: 'secretary',
    context: 'Standardisation des processus, formation du personnel',
    content: `Rédige une procédure étape par étape pour [processus administratif : inscription/demande de remboursement/réservation de locaux/gestion des absences] à l'usage du personnel de l'école.

INTENTION : Cette procédure doit standardiser le processus, réduire les erreurs et gagner du temps, même pour quelqu'un qui effectue cette tâche pour la première fois.

FORMAT :
- Structure : titre descriptif, brève introduction expliquant l'objectif, conditions préalables ou matériel nécessaire, étapes numérotées chronologiquement, coordonnées de la personne-ressource pour questions
- Style : phrases courtes commençant par des verbes d'action, langage direct et sans ambiguïté
- Présentation : sections clairement délimitées, points importants en gras, espacement généreux
- Éléments pratiques : inclusion d'exemples, captures d'écran (à ajouter ultérieurement si nécessaire), erreurs fréquentes à éviter
- Longueur : maximum 2 pages, privilégier la clarté à l'exhaustivité`,
    example: 'Procédure de signalement d\'absence, processus d\'inscription, demande de matériel'
  }
];