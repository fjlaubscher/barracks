import { html } from 'html-express-js';

const withLayout =
  <T>(props: HtmlExpressProps<T>, state: HtmlExpressState) =>
  (render: (data: T) => any) => html`
    <!doctype html>
    <html lang="en">
      <head>
        ${state.includes.head}
        <title>${props.title} | Barracks Admin</title>
      </head>
      <body>
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">Barracks Admin</a>
            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="barracks-nav"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="barracks-nav" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" href="/army">Armies</a>
              <a class="navbar-item" href="/rule">Rules</a>
              <a class="navbar-item" href="/weapon">Weapons</a>
            </div>
          </div>
        </nav>
        <section class="hero is-primary">
          <div class="container is-widescreen">
            <div class="hero-body">
              <p class="title">${props.title}</p>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="container is-widescreen">${render(props.data)}</div>
        </section>
      </body>
    </html>
  `;

export default withLayout;
