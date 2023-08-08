import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<undefined>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    () => html`
      <form id="profile" method="POST">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" name="name" />
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label" for="inexperiencedCost">Inexperienced Cost</label>
              <div class="control">
                <input
                  class="input"
                  id="inexperiencedCost"
                  type="number"
                  name="inexperiencedCost"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="regularCost">Regular Cost</label>
              <div class="control">
                <input class="input" id="regularCost" type="number" name="regularCost" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="veteranCost">Veteran Cost</label>
              <div class="control">
                <input class="input" id="veteranCost" type="number" name="veteranCost" />
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="armour">Armour</label>
          <div class="control">
            <input class="input" id="armour" type="text" name="armour" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="transport">Transport</label>
          <div class="control">
            <input class="input" id="transport" type="text" name="transport" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="tow">Tow</label>
          <div class="control">
            <input class="input" id="tow" type="text" name="tow" />
          </div>
        </div>

        <button type="submit" class="button is-primary">Submit</button>
      </form>
    `
  );
