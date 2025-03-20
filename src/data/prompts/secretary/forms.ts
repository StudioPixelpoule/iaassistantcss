import type { Prompt } from '../types';

export const formPrompts: Prompt[] = [
  {
    id: 'administrative-form',
    title: 'Formulaire administratif',
    category: 'documents',
    role: 'secretary',
    context: 'Collecte d\'informations standardisée',
    content: `Conçois un formulaire pour [objectif : collecte d'information/autorisation/inscription] concernant [activité/service/besoin] destiné aux [public cible].

INTENTION : Ce formulaire doit recueillir toutes les informations nécessaires de manière efficace, être facile à remplir pour l'utilisateur, et simple à traiter pour l'administration.

FORMAT :
- Structure : titre clair, instructions concises, champs logiquement organisés, espace pour signature et date
- Disposition : regroupement des informations connexes, progression logique des questions
- Éléments pratiques : cases à cocher pour les choix prédéfinis, lignes pour réponses écrites
- Identification : numéro de formulaire, date de version, référence au service concerné
- Longueur : limiter à une page recto-verso si possible
- Présentation : suggérer une mise en page aérée`,
    example: 'Formulaire d\'inscription à une activité, autorisation de sortie'
  }
];