import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getUnitTypesAsync = async () => {
  const client = new pg.Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * FROM unit_type');
  await client.end();

  return mapFromPSQL<Barracks.UnitType>(rows);
};
