import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<undefined>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    () => html`
      <form id="weapon" method="POST">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" name="name" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="range">Range</label>
          <div class="control">
            <input class="input" id="range" type="text" name="range" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="shots">Shots</label>
          <div class="control">
            <input class="input" id="shots" type="text" name="shots" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="pen">Pen</label>
          <div class="control">
            <input class="input" id="pen" type="text" name="pen" />
          </div>
        </div>
        <label class="checkbox"><input type="checkbox" name="isHeavy" /> Heavy Weapon</label>
        <button type="submit" class="button is-primary">Submit</button>
      </form>
    `
  );
