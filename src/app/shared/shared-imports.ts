import { SHARED_DIRECTIVES } from './shared-directives';
import { SHARED_COMPONENTS } from './shared-components';
import { TranslateModule } from '@ngx-translate/core';
import { SHARED_MODULES } from './shared-modules';

export const SHARED_IMPORTS = [
  ...SHARED_DIRECTIVES,
  ...SHARED_COMPONENTS,
  ...SHARED_MODULES
];
