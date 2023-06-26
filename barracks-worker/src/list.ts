import { withCORS } from './helpers';

export const getList = async (env: Env, slug: string) => {
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

export const getLists = async (env: Env, slug: string) => {
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

export const createList = async (env: Env, input: Barracks.PublicList) => {
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

export const deleteList = async (env: Env, slug: string) => {
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
