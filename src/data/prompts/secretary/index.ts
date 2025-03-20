import { communicationPrompts } from './communications';
import { documentPrompts } from './documents';
import { organizationPrompts } from './organization';
import { monitoringPrompts } from './monitoring';
import { formPrompts } from './forms';
import { projectPrompts } from './project';
import { filingPrompts } from './filing';

export const secretaryPrompts = [
  ...communicationPrompts,
  ...documentPrompts,
  ...organizationPrompts,
  ...monitoringPrompts,
  ...formPrompts,
  ...projectPrompts,
  ...filingPrompts
];