import type { Prompt } from '../types';

export const monitoringPrompts: Prompt[] = [
  {
    id: 'action-tracking',
    title: 'Suivi des actions et décisions',
    category: 'monitoring',
    role: 'secretary',
    context: 'Gestion des suivis post-réunions, projets en cours',
    content: `Conçois un tableau de suivi des actions décidées lors des réunions [type de réunions] permettant de monitorer efficacement leur mise en œuvre.

INTENTION : Ce tableau doit permettre un suivi visuel rapide de l'état d'avancement des actions, clarifier les responsabilités, faciliter les rappels, et servir d'outil de reddition de comptes.

FORMAT :
- Structure : tableau avec colonnes essentielles (action, contexte/décision associée, responsable, échéance, statut, commentaires, date de finalisation)
- Présentation : format permettant un tri par responsable, par échéance ou par statut
- Statuts : système visuel d'identification (à faire, en cours, en retard, complété, reporté)
- Priorisation : indication du niveau d'urgence ou d'importance
- Fonctionnalités suggérées : système d'alerte pour les échéances approchantes
- Accessibilité : format facilement partageable avec les personnes concernées`,
    example: 'Suivi des décisions du conseil d\'établissement, actions issues des réunions du personnel'
  },
  {
    id: 'synthesis-report',
    title: 'Rapport de synthèse',
    category: 'monitoring',
    role: 'secretary',
    context: 'Résumés périodiques, bilans d\'activités',
    content: `Rédige un cadre de rapport synthétique sur [sujet : activités du mois/statistiques de fréquentation/demandes particulières] couvrant la période du [date de début] au [date de fin].

INTENTION : Ce rapport doit présenter les informations essentielles de façon condensée et structurée, permettre une compréhension rapide des points clés, et faciliter la prise de décision basée sur des données.

FORMAT :
- Structure : résumé exécutif, faits saillants, données quantitatives, tendances observées, points nécessitant une attention particulière, recommandations si approprié
- Présentation : combinaison de texte concis et d'éléments visuels (tableaux, graphiques simples)
- Style : phrases directes, évitement du jargon inutile, mise en évidence des conclusions importantes
- Objectivité : présentation factuelle distinguant clairement les données des interprétations
- Longueur : 1-2 pages maximum, privilégiant la concision`,
    example: 'Rapport mensuel à la direction, synthèse des activités du secrétariat, bilan des communications aux parents'
  }
];