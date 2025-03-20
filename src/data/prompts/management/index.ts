import { strategicPrompts } from './strategic';
import { planningPrompts } from './planning';
import { meetingPrompts } from './meetings';
import { analysisPrompts } from './analysis';
import { crisisPrompts } from './crisis';
import { professionalPrompts } from './professional';

export const managementPrompts = [
  ...strategicPrompts,
  ...planningPrompts,
  ...meetingPrompts,
  ...analysisPrompts,
  ...crisisPrompts,
  ...professionalPrompts
];