import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getUnitsByArmyIdAsync = async (armyId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM unit
    WHERE unit.army_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [armyId]);
  await client.end();

  return mapFromPSQL<Barracks.Unit>(rows);
};

export const getUnitByIdAsync = async (id: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM unit
    WHERE unit.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Barracks.Unit>(rows)[0];
};

export const createUnitAsync = async (unit: Barracks.Unit) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO unit (
      army_id,
      type_id,
      name,
      description,
      models
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [
    unit.armyId,
    unit.typeId,
    unit.name,
    unit.description,
    unit.models
  ]);
  await client.end();

  return mapFromPSQL<Barracks.Unit>(rows)[0];
};
