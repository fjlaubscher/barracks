import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<undefined>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    () => html`
      <form id="rule" method="POST">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" name="name" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="description">Description</label>
          <div class="control">
            <textarea id="description" class="textarea" rows="10" name="description" />
          </div>
        </div>

        <button type="submit" class="button is-primary">Submit</button>
      </form>
    `
  );
