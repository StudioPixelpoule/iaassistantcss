import type { Prompt } from '../types';

export const resourcePrompts: Prompt[] = [
  {
    id: 'pedagogical-guide',
    title: 'Guide pédagogique',
    category: 'teaching-materials',
    role: 'educational',
    context: 'Création de documents d\'orientation pour les enseignants',
    content: `Élabore un guide pédagogique sur [thématique/approche pédagogique] destiné aux enseignants de [niveau/matière] du CSS.

INTENTION : Ce guide doit servir de référence professionnelle accessible et fournir des orientations pratiques pour l'implantation en classe.

FORMAT :
- Structure : fondements théoriques, principes directeurs, mise en œuvre concrète
- Accessibilité : équilibre entre rigueur conceptuelle et langage clair
- Pragmatisme : focus sur l'application concrète
- Différenciation : suggestions adaptées à divers contextes
- Longueur : document principal (15-25 pages) + annexes pratiques`,
    example: 'Guide sur l\'évaluation des compétences, référentiel d\'enseignement de la lecture'
  },
  {
    id: 'planning-tools',
    title: 'Outils de planification pédagogique',
    category: 'teaching-materials',
    role: 'educational',
    context: 'Développement de gabarits et modèles pour soutenir la planification',
    content: `Conçois un [type d'outil] de planification pour [niveau/matière/contexte spécifique].

INTENTION : Cet outil doit faciliter le travail de planification des enseignants et assurer l'alignement avec le programme.

FORMAT :
- Structure : sections essentielles avec instructions claires
- Alignement : liens explicites avec le Programme de formation
- Flexibilité : format adaptable à différents styles d'enseignement
- Efficacité : équilibre entre complétude et simplicité
- Longueur : gabarit (2-5 pages) + guide d'utilisation`,
    example: 'Gabarit de planification globale annuelle, canevas de séquence d\'apprentissage'
  }
];