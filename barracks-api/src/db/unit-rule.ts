import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const createUnitRuleAsync = async (ruleId: number, unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO unit_rule (
      rule_id,
      unit_id
    )
    VALUES ($1, $2)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [ruleId, unitId]);
  await client.end();

  return mapFromPSQL<Barracks.UnitRule>(rows)[0];
};

export const getUnitRulesAsync = async (unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT rule.*
    FROM rule
    INNER JOIN unit_rule ON unit_rule.rule_id = rule.id 
    WHERE unit_rule.unit_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [unitId]);
  await client.end();

  return mapFromPSQL<Barracks.Rule>(rows);
};

export const deleteUnitRulesAsync = async (unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>(`DELETE FROM unit_rule WHERE unit_id = $1`, [
    unitId
  ]);
  await client.end();

  return rowCount > 0;
};
