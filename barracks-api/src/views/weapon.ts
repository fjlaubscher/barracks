import { html } from 'html-express-js';

import withLayout from './_layout.js';

interface Model {
  weapon: Barracks.Weapon;
  weaponRules: Barracks.Rule[];
  rules: Barracks.Rule[];
}

export const view = (props: HtmlExpressProps<Model>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(({ weapon, rules, weaponRules }) => {
    const selectedRuleIds = weaponRules.map((rule) => rule.id);

    return html`
      <div class="block">
        <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
          <p class="is-size-3">Edit Weapon</p>
          <button type="submit" form="weapon" class="button is-primary">Submit</button>
        </div>

        <form id="weapon" method="POST">
          <div class="field">
            <label class="label" for="name">Name</label>
            <div class="control">
              <input class="input" id="name" type="text" name="name" value="${weapon.name}" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="range">Range</label>
            <div class="control">
              <input class="input" id="range" type="text" name="range" value="${weapon.range}" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="shots">Shots</label>
            <div class="control">
              <input class="input" id="shots" type="text" name="shots" value="${weapon.shots}" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="pen">Pen</label>
            <div class="control">
              <input class="input" id="pen" type="text" name="pen" value="${weapon.pen}" />
            </div>
          </div>
          <label class="checkbox"
            ><input type="checkbox" name="isHeavy" ${weapon.isHeavy ? 'checked' : ''} /> Heavy
            Weapon</label
          >
        </form>
      </div>
      <hr />
      <div class="block">
        <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
          <p class="is-size-3">Rules</p>
          <button type="submit" form="weapon-rules" class="button is-primary">Submit</button>
        </div>

        <form id="weapon-rules" method="POST" action="/weapon/${weapon.id}/rules">
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
    `;
  });
