interface TableRow {
  [key: string]: string | number | Date | null;
}

declare module 'html-express-js';

interface HtmlExpressProps<T> {
  title: string;
  data: T;
}

interface HtmlExpressState {
  includes: {
    head: string;
  }
}