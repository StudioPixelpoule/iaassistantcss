import type { Prompt } from '../types';

export const planningPrompts: Prompt[] = [
  {
    id: 'multi-year-planning',
    title: 'Planification budgétaire pluriannuelle',
    category: 'planning',
    role: 'financial',
    context: 'Développement de projections financières à moyen terme',
    content: `Élabore un modèle de planification budgétaire pluriannuelle sur [nombre] années pour [établissement/service] intégrant projections et scénarios.

INTENTION : Cette planification doit permettre une vision financière à moyen terme, anticiper les besoins et contraintes futures, aligner la gestion financière avec les objectifs stratégiques.

FORMAT :
- Structure : hypothèses et paramètres de projection, tendances historiques, scénarios
- Présentation : tableaux de projections avec évolution sur les années
- Sensibilité : analyse de l'impact des variations de paramètres clés
- Intégration : alignement avec le plan stratégique
- Flexibilité : mécanismes d'ajustement selon l'évolution
- Longueur : document principal (10 pages) avec annexes détaillées`,
    example: 'Plan financier quinquennal, projections d\'investissements'
  }
];