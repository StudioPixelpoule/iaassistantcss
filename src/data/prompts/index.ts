import { secretaryPrompts } from './secretary';
import { managementPrompts } from './management';
import { financialPrompts } from './financial';
import { hrPrompts } from './hr';
import { teachingPrompts } from './teaching';
import { educationalPrompts } from './educational';

export const allPrompts = [
  ...secretaryPrompts,
  ...managementPrompts,
  ...financialPrompts,
  ...hrPrompts,
  ...teachingPrompts,
  ...educationalPrompts
];