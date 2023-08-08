import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<Barracks.UnitProfile>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    (profile) => html`
      <form id="profile" method="POST">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" name="name" value="${profile.name}" />
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
                  value="${profile.inexperiencedCost}"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="regularCost">Regular Cost</label>
              <div class="control">
                <input
                  class="input"
                  id="regularCost"
                  type="number"
                  name="regularCost"
                  value="${profile.regularCost}"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label" for="veteranCost">Veteran Cost</label>
              <div class="control">
                <input
                  class="input"
                  id="veteranCost"
                  type="number"
                  name="veteranCost"
                  value="${profile.veteranCost}"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="armour">Armour</label>
          <div class="control">
            <input class="input" id="armour" type="text" name="armour" value="${profile.armour}" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="transport">Transport</label>
          <div class="control">
            <input
              class="input"
              id="transport"
              type="text"
              name="transport"
              value="${profile.transport}"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="tow">Tow</label>
          <div class="control">
            <input class="input" id="tow" type="text" name="tow" value="${profile.tow}" />
          </div>
        </div>

        <button type="submit" class="button is-primary">Submit</button>
      </form>
    `
  );
