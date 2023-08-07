import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<Barracks.UnitType[]>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    (unitTypes) => html`
      <form id="unit" method="POST">
        <div class="field">
          <label class="label" for="typeId">Type</label>
          <div class="control">
            <div class="select">
              <select name="typeId">
                ${unitTypes
                  .map((unitType) => `<option value="${unitType.id}">${unitType.name}</option>`)
                  .join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" name="name" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="description">Composition</label>
          <div class="control">
            <input class="input" id="description" type="text" name="description" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="models">Models</label>
          <div class="control">
            <input class="input" id="models" type="number" name="models" />
          </div>
        </div>

        <button type="submit" class="button is-primary">Submit</button>
      </form>
    `
  );
