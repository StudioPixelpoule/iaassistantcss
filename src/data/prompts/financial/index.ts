import { analysisPrompts } from './analysis';
import { communicationPrompts } from './communication';
import { procedurePrompts } from './procedure';
import { planningPrompts } from './planning';

export const financialPrompts = [
  ...analysisPrompts,
  ...communicationPrompts,
  ...procedurePrompts,
  ...planningPrompts
];