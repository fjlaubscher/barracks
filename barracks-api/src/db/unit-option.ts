import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getUnitOptionsByUnitIdAsync = async (unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM unit_option
    WHERE unit_option.unit_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [unitId]);
  await client.end();

  return mapFromPSQL<Barracks.UnitOption>(rows);
};

export const getUnitOptionByIdAsync = async (id: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM unit_option
    WHERE unit_option.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Barracks.UnitOption>(rows)[0];
};

export const createUnitOptionAsync = async (option: Barracks.UnitOption) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO unit_option (
      name,
      inexperienced_cost,
      regular_cost,
      veteran_cost,
      max_allowed,
      rule_id,
      weapon_id,
      unit_id,
      is_unit_upgrade
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [
    option.name,
    option.inexperiencedCost,
    option.regularCost,
    option.veteranCost,
    option.maxAllowed,
    option.ruleId,
    option.weaponId,
    option.unitId,
    option.isUnitUpgrade
  ]);
  await client.end();

  return mapFromPSQL<Barracks.UnitOption>(rows)[0];
};

export const updateUnitOptionAsync = async (option: Barracks.UnitOption) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    UPDATE unit_option
    SET name = $1,
        inexperienced_cost = $2,
        regular_cost = $3,
        veteran_cost = $4,
        max_allowed = $5,
        rule_id = $6,
        weapon_id = $7,
        is_unit_upgrade = $8
    WHERE id = $9
  `;
  const { rowCount } = await client.query<TableRow>(query, [
    option.name,
    option.inexperiencedCost,
    option.regularCost,
    option.veteranCost,
    option.maxAllowed,
    option.ruleId,
    option.weaponId,
    option.isUnitUpgrade,
    option.id
  ]);
  await client.end();

  return rowCount === 1;
};
