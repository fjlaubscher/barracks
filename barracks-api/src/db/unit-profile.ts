import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getUnitProfilesByUnitIdAsync = async (unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM unit_profile
    WHERE unit_profile.unit_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [unitId]);
  await client.end();

  return mapFromPSQL<Barracks.UnitProfile>(rows);
};

export const getUnitProfileByIdAsync = async (id: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM unit_profile
    WHERE unit_profile.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Barracks.UnitProfile>(rows)[0];
};

export const createUnitProfileAsync = async (profile: Barracks.UnitProfile) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO unit_profile (
      name,
      inexperienced_cost,
      regular_cost,
      veteran_cost,
      armour,
      transport,
      tow,
      unit_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [
    profile.name,
    profile.inexperiencedCost,
    profile.regularCost,
    profile.veteranCost,
    profile.armour,
    profile.transport,
    profile.tow,
    profile.unitId
  ]);
  await client.end();

  return mapFromPSQL<Barracks.UnitProfile>(rows)[0];
};
