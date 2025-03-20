import type { Prompt } from '../types';

export const projectPrompts: Prompt[] = [
  {
    id: 'simple-project',
    title: 'Gestion de projet simple',
    category: 'organization',
    role: 'secretary',
    context: 'Coordination de projets administratifs multi-étapes',
    content: `Élabore un plan de gestion pour le projet [nom du projet : mise à jour de dossiers/changement de système/préparation d'un événement] qui doit être complété d'ici le [date].

INTENTION : Ce plan doit décomposer un projet complexe en étapes gérables, définir clairement les attentes et échéances, et permettre un suivi efficace de l'avancement.

FORMAT :
- Structure : objectif du projet, livrables attendus, étapes clés avec échéances, ressources nécessaires
- Présentation : diagramme de Gantt simplifié ou tableau des échéances
- Suivi : indicateurs d'avancement, points de contrôle réguliers
- Collaboration : identification des personnes/services à impliquer
- Flexibilité : marges tampons pour les imprévus
- Longueur : 2-4 pages selon la complexité du projet`,
    example: 'Organisation d\'une campagne de financement, préparation des inscriptions'
  },
  {
    id: 'checklist',
    title: 'Liste de contrôle (Checklist)',
    category: 'organization',
    role: 'secretary',
    context: 'Vérification des procédures complexes ou cruciales',
    content: `Crée une liste de vérification détaillée pour [processus : préparation de la rentrée scolaire/fin d'année/organisation d'une sortie] couvrant tous les aspects à ne pas oublier.

INTENTION : Cette checklist doit servir d'outil de vérification complet garantissant qu'aucun élément important n'est oublié dans ce processus multi-étapes.

FORMAT :
- Structure : sections thématiques clairement identifiées, éléments à vérifier listés chronologiquement
- Présentation : format permettant de cocher facilement les éléments complétés
- Éléments pratiques : indication du délai idéal pour chaque action
- Responsabilités : identification des personnes en charge de chaque section
- Détails importants : inclusion des petits détails facilement oubliés mais importants
- Adaptabilité : espace pour ajouter des éléments spécifiques`,
    example: 'Préparation de la rentrée, vérification de fin d\'année'
  }
];