import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const createWeaponRuleAsync = async (ruleId: number, weaponId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO weapon_rule (
      rule_id,
      weapon_id
    )
    VALUES ($1, $2)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [ruleId, weaponId]);
  await client.end();

  return mapFromPSQL<Barracks.WeaponRule>(rows)[0];
};

export const getWeaponRulesAsync = async (weaponId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT rule.*
    FROM rule
    INNER JOIN weapon_rule ON weapon_rule.rule_id = rule.id 
    WHERE weapon_rule.weapon_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [weaponId]);
  await client.end();

  return mapFromPSQL<Barracks.Rule>(rows);
};

export const deleteWeaponRulesAsync = async (weaponId: number) => {
  const client = new pg.Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>(
    `DELETE FROM weapon_rule WHERE weapon_id = $1`,
    [weaponId]
  );
  await client.end();

  return rowCount > 0;
};
