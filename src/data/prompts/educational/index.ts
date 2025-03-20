import { developmentPrompts } from './development';
import { resourcePrompts } from './resources';
import { analysisPrompts } from './analysis';

export const educationalPrompts = [
  ...developmentPrompts,
  ...resourcePrompts,
  ...analysisPrompts
];