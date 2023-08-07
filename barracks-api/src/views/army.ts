import { html } from 'html-express-js';

import withLayout from './_layout.js';

interface Model {
  army: Barracks.Army;
  units: Barracks.Unit[];
}

export const view = (props: HtmlExpressProps<Model>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    ({ army, units }) => html`
      <div class="block">
        <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
          <p class="is-size-3">Edit Army</p>
          <button type="submit" form="army" class="button is-primary">Submit</button>
        </div>

        <form id="army" method="POST">
          <div class="field">
            <label class="label" for="name">Name</label>
            <div class="control">
              <input class="input" id="name" type="text" name="name" value="${army.name}" />
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div class="block">
        <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
          <p class="is-size-3">Units</p>
          <a href="/army/${army.id}/unit/create" class="button is-primary">Add</a>
        </div>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${units
              .map(
                (unit) => `
                    <tr>
                      <td>${unit.id}</td>
                      <td>${unit.name}</td>
                      <td><a class="button is-info" href="/unit/${unit.id}">Edit</a></td>
                    </tr>
                  `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `
  );
