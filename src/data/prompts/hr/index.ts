import { recruitmentPrompts } from './recruitment';
import { trainingPrompts } from './training';
import { communicationPrompts } from './communication';
import { performancePrompts } from './performance';

export const hrPrompts = [
  ...recruitmentPrompts,
  ...trainingPrompts,
  ...communicationPrompts,
  ...performancePrompts
];