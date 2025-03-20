import type { Prompt } from '../types';

export const trainingPrompts: Prompt[] = [
  {
    id: 'development-plan',
    title: 'Plan de développement professionnel',
    category: 'training',
    role: 'hr',
    context: 'Création de parcours de développement personnalisés',
    content: `Crée un modèle de plan de développement professionnel individualisé pour [catégorie d'employés] permettant de structurer leur parcours d'évolution sur [période].

INTENTION : Ce plan doit lier les aspirations professionnelles individuelles avec les besoins organisationnels, identifier clairement les compétences à développer.

FORMAT :
- Structure : profil professionnel actuel, objectifs de carrière, compétences à développer
- Présentation : document interactif combinant autoévaluation et planification
- Éléments spécifiques : distinction entre développement à court terme et moyen terme
- Adaptabilité : modèle personnalisable selon les différents profils de poste
- Intégration : lien avec les objectifs stratégiques du CSS
- Longueur : 4-5 pages incluant outils d'autoévaluation`,
    example: 'Plan de développement pour enseignant, parcours professionnel pour personnel administratif'
  },
  {
    id: 'onboarding-program',
    title: 'Programme d\'intégration des nouveaux employés',
    category: 'training',
    role: 'hr',
    context: 'Optimisation de l\'accueil et de l\'intégration pour favoriser la rétention',
    content: `Développe un programme d'accueil et d'intégration complet pour les nouveaux [catégorie d'employés] couvrant les [nombre] premiers mois.

INTENTION : Ce programme doit faciliter l'intégration rapide et efficace des nouveaux employés, transmettre la culture organisationnelle.

FORMAT :
- Structure : processus pré-arrivée, premier jour, première semaine, premier mois
- Présentation : guide d'intégration avec checklist pour le superviseur et l'employé
- Composantes : formation technique, familiarisation avec l'environnement
- Éléments spécifiques : ressources à fournir, personnes à rencontrer
- Personnalisation : adaptations selon les différents types de postes
- Longueur : document principal (10 pages) + outils d'accompagnement`,
    example: 'Programme d\'accueil des nouveaux enseignants, intégration du personnel administratif'
  },
  {
    id: 'training-needs',
    title: 'Évaluation des besoins de formation',
    category: 'training',
    role: 'hr',
    context: 'Identification et priorisation des besoins de développement collectifs',
    content: `Conçois un cadre d'analyse des besoins de formation pour [département/catégorie d'employés].

INTENTION : Cette évaluation doit permettre d'identifier systématiquement les écarts de compétences et prioriser les besoins.

FORMAT :
- Structure : méthodologie d'évaluation, matrice de compétences, analyse des écarts
- Présentation : combinaison d'outils de collecte et d'analyse
- Éléments spécifiques : considération des compétences techniques et relationnelles
- Adaptabilité : processus applicable à différents contextes
- Participation : mécanismes pour impliquer les employés
- Longueur : 6-7 pages + outils de collecte`,
    example: 'Analyse des besoins pour une école, évaluation des compétences numériques'
  },
  {
    id: 'training-design',
    title: 'Conception de formation',
    category: 'training',
    role: 'hr',
    context: 'Développement de programmes de formation internes efficaces',
    content: `Élabore un plan de formation sur [thématique] pour les [public cible] du Centre de Services Scolaire.

INTENTION : Cette formation doit développer efficacement les compétences ciblées et assurer un transfert optimal.

FORMAT :
- Structure : objectifs d'apprentissage, progression pédagogique, activités variées
- Présentation : plan pour le formateur, matériel pour les participants
- Andragogie : approches adaptées aux adultes professionnels
- Interactivité : équilibre entre théorie et pratique
- Ressources : identification du matériel nécessaire
- Longueur : plan détaillé (8-10 pages) + matériel`,
    example: 'Formation sur la gestion de classe, développement des compétences numériques'
  }
];