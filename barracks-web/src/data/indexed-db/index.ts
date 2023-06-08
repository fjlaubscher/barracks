import {
  DATABASE_NAME,
  DATABASE_VERSION,
  ARMY_OBJECT_STORE,
  CORE_OBJECT_STORE,
  SPECIAL_RULES_OBJECT_STORE
} from './config';

const getDBConnection = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(ARMY_OBJECT_STORE);
      request.result.createObjectStore(CORE_OBJECT_STORE);
      request.result.createObjectStore(SPECIAL_RULES_OBJECT_STORE);
    };
  });

export const createOrUpdateAsync = async <T>(storeName: string, key: string, value: T) => {
  const connection = await getDBConnection();
  const transaction = connection.transaction(storeName, 'readwrite');
  const objectStore = transaction.objectStore(storeName);

  objectStore.put(value, key);
  connection.close();
};

export const getByKeyAsync = async <T>(storeName: string, key?: string): Promise<T | undefined> =>
  new Promise(async (resolve, reject) => {
    if (!key) {
      return reject('Invalid key provided');
    }

    const connection = await getDBConnection();
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
      return reject(request.error);
    };
  });

export const getKeysAsync = async (storeName: string): Promise<string[]> =>
  new Promise(async (resolve, reject) => {
    const connection = await getDBConnection();
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

export const destroy = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
