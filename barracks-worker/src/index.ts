export interface Env {
  NAMESPACE: KVNamespace;
}

const withCORS = (body?: BodyInit | null, init?: ResponseInit) =>
  new Response(body, {
    ...init,
    headers: {
      ...init?.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    }
  });

const getList = async (env: Env, slug: string) => {
  try {
    const list = await env.NAMESPACE.get(slug);
    if (list) {
      return withCORS(list, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return withCORS(undefined, {
        status: 404
      });
    }
  } catch (ex: any) {
    return withCORS(ex.message, {
      status: 500
    });
  }
};

const getLists = async (env: Env, slug: string) => {
  try {
    const list = await env.NAMESPACE.list<{ createdBy: string }>();
    const keys = list.keys.filter((l) => l.metadata?.createdBy === slug).map((l) => l.name);

    const lists: Barracks.PublicList[] = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const list = await env.NAMESPACE.get(key);
      if (list) {
        lists.push(JSON.parse(list));
      }
    }

    if (lists) {
      return withCORS(JSON.stringify(lists), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return withCORS(undefined, {
        status: 404
      });
    }
  } catch (ex: any) {
    return withCORS(ex.message, {
      status: 500
    });
  }
};

const createList = async (env: Env, input: Barracks.PublicList) => {
  try {
    await env.NAMESPACE.put(input.slug, JSON.stringify(input), {
      metadata: { createdBy: input.createdBy }
    });
    return withCORS(JSON.stringify(input), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (ex: any) {
    return withCORS(ex.message, {
      status: 500
    });
  }
};

const deleteList = async (env: Env, slug: string) => {
  try {
    await env.NAMESPACE.delete(slug);
    return withCORS(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (ex: any) {
    return withCORS(ex.message, {
      status: 500
    });
  }
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const parts = request.url.split('/');
    const path = parts[parts.length - 2];
    const slug = parts[parts.length - 1];

    switch (request.method) {
      case 'GET':
        return path === 'lists' ? getLists(env, slug) : getList(env, slug);
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
