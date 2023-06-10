const DATABASE_NAME = 'BARRACKS';
const DATABASE_VERSION = 1;

const getDBConnectionAsync = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('ARMY');
      request.result.createObjectStore('ARMIES');
      request.result.createObjectStore('CORE');
      request.result.createObjectStore('LIST');
      request.result.createObjectStore('SPECIAL_RULES');
    };
  });

export const createOrUpdateAsync = <T>(storeName: string, key: string | undefined, value: T) =>
  new Promise<void>(async (resolve, reject) => {
    if (!key) {
      return reject('Invalid key provided');
    }

    const connection = await getDBConnectionAsync();
    const transaction = connection.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    objectStore.put(value, key);
    connection.close();
    resolve();
  });

export const getByKeyAsync = <T>(storeName: string, key?: string) =>
  new Promise<T | undefined>(async (resolve, reject) => {
    if (!key) {
      return reject('Invalid key provided');
    }

    const connection = await getDBConnectionAsync();
    const transaction = connection.transaction(storeName, 'readonly');
    transaction.onerror = () => {
      connection.close();
      return reject(transaction.error);
    };

    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(key);
    request.onsuccess = () => {
      connection.close();
      return resolve(request.result as T);
    };
    request.onerror = () => {
      connection.close();
      return resolve(undefined);
    };
  });

export const getKeysAsync = (storeName: string) =>
  new Promise<string[]>(async (resolve, reject) => {
    const connection = await getDBConnectionAsync();
    const transaction = connection.transaction(storeName, 'readonly');
    transaction.onerror = () => {
      connection.close();
      return reject(transaction.error);
    };

    const keys: string[] = [];
    const objectStore = transaction.objectStore(storeName);
    const cursor = objectStore.openCursor();
    cursor.onsuccess = () => {
      const result = cursor.result;
      if (result) {
        keys.push(result.key as string);
        cursor.result.continue();
      } else {
        return resolve(keys);
      }
    };
  });

export const deleteByKeyAsync = (storeName: string, key?: string) =>
  new Promise<void>(async (resolve, reject) => {
    if (!key) {
      return reject('Invalid key provided');
    }

    const connection = await getDBConnectionAsync();
    const transaction = connection.transaction(storeName, 'readonly');
    transaction.onerror = () => {
      connection.close();
      return reject(transaction.error);
    };

    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(key);
    request.onsuccess = () => {
      connection.close();
      return resolve();
    };
    request.onerror = () => {
      connection.close();
      return reject(request.error);
    };
  });

export const destroyAsync = () =>
  new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
