import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getArmiesAsync = async () => {
  const client = new pg.Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from army');
  await client.end();

  return mapFromPSQL<Barracks.Army>(rows);
};

export const getArmyByIdAsync = async (id: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM army
    WHERE army.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Barracks.Army>(rows)[0];
};
