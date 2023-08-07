import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<Barracks.Army[]>, state: HtmlExpressState) =>
  withLayout(
    props,
    state
  )(
    (data) => html`
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (army) => `
            <tr>
              <td>${army.id}</td>
              <td>${army.name}</td>
              <td>${new Date(army.lastUpdated).toLocaleDateString()}</td>
              <td><a class="button is-info" href="/army/${army.id}">Edit</a></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `
  );
