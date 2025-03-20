import { planningPrompts } from './planning';
import { materialsPrompts } from './materials';
import { evaluationPrompts } from './evaluation';
import { collaborationPrompts } from './collaboration';

export const teachingPrompts = [
  ...planningPrompts,
  ...materialsPrompts,
  ...evaluationPrompts,
  ...collaborationPrompts
];