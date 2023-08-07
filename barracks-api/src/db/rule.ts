import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getRuleByIdAsync = async (id: number) => {
  const client = new pg.Client();
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
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT rule.*
    FROM rule
    INNER JOIN army_rule ON army_rule.rule_id = rule.id
    WHERE army_rule.army_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [armyId]);
  await client.end();

  return mapFromPSQL<Barracks.Rule>(rows);
};

export const createRuleAsync = async (rule: Barracks.Rule) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO rule (
      name,
      description
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [rule.name, rule.description]);
  await client.end();

  return mapFromPSQL<Barracks.Rule>(rows)[0];
};

export const updateRuleAsync = async (rule: Barracks.Rule) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    UPDATE rule
    SET name = $1,
        description = $2
    WHERE id = $3
  `;
  const { rowCount } = await client.query<TableRow>(query, [rule.name, rule.description, rule.id]);
  await client.end();

  return rowCount === 1;
};

export const getRulesAsync = async (term?: string) => {
  const client = new pg.Client();
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

  return mapFromPSQL<Barracks.Rule>(rows);
};
