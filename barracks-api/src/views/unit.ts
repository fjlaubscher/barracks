import { html } from 'html-express-js';

import withLayout from './_layout.js';

interface Model {
  rules: Barracks.Rule[];
  unit: Barracks.Unit;
  weapons: Barracks.Weapon[];
  unitTypes: Barracks.UnitType[];
  unitWeapons: Barracks.Weapon[];
  unitRules: Barracks.Rule[];
}

export const view = (props: HtmlExpressProps<Model>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(({ unit, unitTypes, rules, unitRules, weapons, unitWeapons }) => {
    const selectedWeaponIds = unitWeapons.map((weapon) => weapon.id);
    const selectedRuleIds = unitRules.map((rule) => rule.id);

    return html`
      <div class="block">
        <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
          <p class="is-size-3">Edit Unit</p>
          <button type="submit" form="unit" class="button is-primary">Submit</button>
        </div>

        <form id="unit" method="POST">
          <div class="field">
            <label class="label" for="typeId">Type</label>
            <div class="control">
              <div class="select">
                <select name="typeId">
                  ${unitTypes
                    .map(
                      (unitType) =>
                        `<option value="${unitType.id}" ${
                          unitType.id === unit.typeId ? 'selected' : ''
                        }>${unitType.name}</option>`
                    )
                    .join('')}
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="name">Name</label>
            <div class="control">
              <input class="input" id="name" type="text" name="name" value="${unit.name}" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="description">Composition</label>
            <div class="control">
              <input
                class="input"
                id="description"
                type="text"
                name="description"
                value="${unit.description}"
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="models">Models</label>
            <div class="control">
              <input class="input" id="models" type="number" name="models" value="${unit.models}" />
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div class="columns is-desktop">
        <div class="column">
          <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
            <p class="is-size-3">Unit Rules</p>
            <button type="submit" form="unit-rules" class="button is-primary">Submit</button>
          </div>

          <form id="unit-rules" method="POST" action="/unit/${unit.id}/rules">
            <div class="is-flex is-flex-wrap-wrap" style="gap: 0.5rem">
              ${rules
                .map(
                  (rule) =>
                    `<label class="checkbox"><input type="checkbox" name="ruleId" value="${
                      rule.id
                    }" ${selectedRuleIds.includes(rule.id) ? 'checked' : ''}> ${rule.name}</label>`
                )
                .join('')}
            </div>
          </form>
        </div>
        <div class="column">
          <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
            <p class="is-size-3">Unit Weapons</p>
            <button type="submit" form="unit-weapons" class="button is-primary">Submit</button>
          </div>

          <form id="unit-weapons" method="POST" action="/unit/${unit.id}/weapons">
            <div class="is-flex is-flex-wrap-wrap" style="gap: 0.5rem">
              ${weapons
                .map(
                  (weapon) =>
                    `<label class="checkbox"><input type="checkbox" name="weaponId" value="${
                      weapon.id
                    }" ${selectedWeaponIds.includes(weapon.id) ? 'checked' : ''}> ${
                      weapon.name
                    }</label>`
                )
                .join('')}
            </div>
          </form>
        </div>
      </div>
    `;
  });
