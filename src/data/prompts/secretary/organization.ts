import type { Prompt } from '../types';

export const organizationPrompts: Prompt[] = [
  {
    id: 'event-planning',
    title: 'Planification d\'événement',
    category: 'organization',
    role: 'secretary',
    context: 'Organisation d\'activités spéciales, journées particulières',
    content: `Développe un plan d'action détaillé pour l'organisation de [événement scolaire : journée portes ouvertes/remise de bulletins/accueil de la rentrée] prévu(e) le [date].

INTENTION : Ce plan doit servir de feuille de route chronologique, permettre de n'oublier aucun détail important, clarifier les responsabilités, et assurer la coordination entre tous les intervenants.

FORMAT :
- Structure : description de l'événement et objectifs, chronologie des actions (3-4 semaines avant, 1 semaine avant, la veille, le jour même, après l'événement), répartition des responsabilités, liste des ressources nécessaires, plan de communication
- Présentation : tableau chronologique avec colonnes (tâche, responsable, échéance, statut)
- Éléments spécifiques : points de décision critiques, alternatives en cas d'imprévu (plan B)
- Détails pratiques : liste de vérification finale avant l'événement
- Longueur : 2-3 pages incluant tableaux et listes`,
    example: 'Organisation de la rentrée scolaire, soirée de remise des bulletins, journée portes ouvertes'
  },
  {
    id: 'admin-calendar',
    title: 'Calendrier administratif',
    category: 'organization',
    role: 'secretary',
    context: 'Planification des tâches récurrentes et échéances',
    content: `Crée un calendrier administratif pour [période : mois/trimestre/année scolaire] identifiant toutes les tâches récurrentes et échéances importantes du secrétariat.

INTENTION : Ce calendrier doit servir d'outil de planification proactive, permettre d'anticiper les périodes chargées, et assurer qu'aucune échéance importante ne soit manquée.

FORMAT :
- Structure : vue mensuelle avec identification des tâches quotidiennes, hebdomadaires, mensuelles et événements ponctuels
- Catégorisation : regroupement par type d'activité (inscriptions, communications, rapports, réunions)
- Présentation : format visuel intuitif avec code couleur par catégorie
- Éléments spécifiques : indication des périodes critiques à fort volume, rappels anticipés pour les préparatifs des événements majeurs
- Intégration : suggestions pour l'alignement avec le calendrier de la direction et des enseignants
- Précisions : indication du temps estimé pour chaque tâche majeure`,
    example: 'Planification annuelle, préparation des périodes chargées (rentrée, fin d\'année)'
  }
];