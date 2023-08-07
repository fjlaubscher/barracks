import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<Barracks.Army[]>, state: HtmlExpressState) =>
  withLayout(props, state)((data) => '');
