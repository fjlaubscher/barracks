import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<Barracks.Weapon[]>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    (data) => html`
      <div class="block">
        <a href="/weapon/create" class="button is-primary">Add</a>
      </div>
      <div class="block">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Range</th>
              <th>Shots</th>
              <th>Pen</th>
              <th>Heavy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (weapon) => `
            <tr>
              <td>${weapon.id}</td>
              <td>${weapon.name}</td>
              <td>${weapon.range}</td>
              <td>${weapon.shots}</td>
              <td>${weapon.pen}</td>
              <td>${weapon.isHeavy}</td>
              <td><a class="button is-info" href="/weapon/${weapon.id}">Edit</a></td>
            </tr>
          `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `
  );
