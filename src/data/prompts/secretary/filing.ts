import type { Prompt } from '../types';

export const filingPrompts: Prompt[] = [
  {
    id: 'filing-system',
    title: 'Guide de classement et d\'archivage',
    category: 'organization',
    role: 'secretary',
    context: 'Organisation des documents physiques et numériques',
    content: `Élabore un système de classement et d'archivage pour [type de documents : correspondance/dossiers élèves/procès-verbaux] adapté aux besoins du secrétariat scolaire.

INTENTION : Ce système doit standardiser les pratiques de classement, faciliter la recherche rapide de documents, assurer la conformité avec les exigences de conservation, et permettre une transition fluide en cas de changement de personnel.

FORMAT :
- Structure : principes généraux de classement, arborescence des dossiers, conventions de nommage
- Présentation : combinaison de texte explicatif et de schémas visuels
- Aspects pratiques : modèles d'étiquetage, exemples de nommage de fichiers
- Conformité : références aux exigences légales de conservation
- Transition : procédures pour la fin d'année scolaire et le transfert vers les archives
- Recherche : méthodes pour retrouver efficacement un document`,
    example: 'Organisation des dossiers d\'élèves, système de classement administratif'
  }
];