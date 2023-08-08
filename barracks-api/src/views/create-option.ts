import { html } from 'html-express-js';

import withLayout from './_layout.js';

interface Model {
  rules: Barracks.Rule[];
  weapons: Barracks.Weapon[];
}

export const view = (props: HtmlExpressProps<Model>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    ({ rules, weapons }) => html`
      <form id="option" method="POST">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" id="name" type="text" name="name" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="maxAllowed">Max Allowed</label>
          <div class="control">
            <input class="input" id="maxAllowed" type="number" name="maxAllowed" />
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
          <label class="checkbox"
            ><input type="checkbox" name="isUnitUpgrade" /> Entire Unit Upgrade</label
          >
        </div>

        <div class="field">
          <label class="label" for="ruleId">Associated Rule</label>
          <div class="control">
            <div class="select">
              <select name="ruleId">
                <option value="0">Select an option</option>
                ${rules.map((rule) => `<option value="${rule.id}">${rule.name}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="weaponId">Associated Weapon</label>
          <div class="control">
            <div class="select">
              <select name="weaponId">
                <option value="0">Select an option</option>
                ${weapons
                  .map((weapon) => `<option value="${weapon.id}">${weapon.name}</option>`)
                  .join('')}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" class="button is-primary">Submit</button>
      </form>
    `
  );
