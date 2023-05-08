export interface Env {
  NAMESPACE: KVNamespace;
}

const getList = async (env: Env, slug: string) => {
  try {
    const list = await env.NAMESPACE.get(slug);
    if (list) {
      return new Response(list, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(undefined, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        status: 404
      });
    }
  } catch (ex: any) {
    return new Response(ex.message, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    });
  }
};

const createList = async (env: Env, input: Barracks.PublicList) => {
  try {
    await env.NAMESPACE.put(input.slug, JSON.stringify(input));
    return new Response(JSON.stringify(input), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (ex: any) {
    return new Response(ex.message, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    });
  }
};

const deleteList = async (env: Env, slug: string) => {
  try {
    await env.NAMESPACE.delete(slug);
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (ex: any) {
    return new Response(ex.message, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    });
  }
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const parts = request.url.split('/');
    const slug = parts[parts.length - 1];

    switch (request.method) {
      case 'GET':
        return getList(env, slug);
      case 'POST':
        const input = await request.json();
        return createList(env, input as Barracks.PublicList);
      case 'DELETE':
        return deleteList(env, slug);
      default:
        return new Response(undefined, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          status: 405
        });
    }
  }
};
