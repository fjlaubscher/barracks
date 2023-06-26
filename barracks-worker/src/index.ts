import { withCORS } from './helpers';
import { createList, deleteList, getList, getLists } from './list';

const handleGET = (env: Env, path: string, slug: string) => {
  switch (path) {
    case 'lists':
      return getLists(env, slug);
    default:
      return getList(env, slug);
  }
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const parts = request.url.split('/');
    const path = parts[parts.length - 2];
    const slug = parts[parts.length - 1];

    switch (request.method) {
      case 'GET':
        return handleGET(env, path, slug);
      case 'POST':
        const input = await request.json();
        return createList(env, input as Barracks.PublicList);
      case 'DELETE':
        return deleteList(env, slug);
      case 'OPTIONS':
        return withCORS(undefined, {
          headers: {
            Allow: 'GET, POST, DELETE, OPTIONS'
          }
        });
      default:
        return withCORS(undefined, {
          status: 405
        });
    }
  }
};
