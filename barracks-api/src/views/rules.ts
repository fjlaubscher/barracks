import { html } from 'html-express-js';

import withLayout from './_layout.js';

export const view = (props: HtmlExpressProps<Barracks.Rule[]>, state: HtmlExpressState) =>
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
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (rule) => `
            <tr>
              <td>${rule.id}</td>
              <td>${rule.name}</td>
              <td>${rule.description}</td>
              <td><a class="button is-info" href="/rule/${rule.id}">Edit</a></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `
  );
