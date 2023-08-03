import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getRuleByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT *
    FROM rule
    WHERE rule.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Barracks.Rule>(rows)[0];
};

export const getRulesByArmyIdAsync = async (armyId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    SELECT rule.*
    FROM rule
    INNER JOIN army_rule ON army_rule.rule_id = rule.id
    WHERE army_rule.army_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [armyId]);
  await client.end();

  return mapFromPSQL<Barracks.Army>(rows);
};

export const getRulesAsync = async (term?: string) => {
  const client = new Client();
  await client.connect();

  const searchTerm = term ? `%${term}%` : '%';
  const query = `
    SELECT rule.*
    FROM rule
    WHERE rule.name ILIKE $1
    ORDER BY rule.name
  `;
  const { rows } = await client.query<TableRow>(query, [searchTerm]);
  await client.end();

  return mapFromPSQL<Barracks.Army>(rows);
};
