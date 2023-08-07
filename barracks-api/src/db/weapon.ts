import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const getWeaponsAsync = async () => {
  const client = new pg.Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * FROM weapon');
  await client.end();

  return mapFromPSQL<Barracks.Weapon>(rows);
};

export const getWeaponByIdAsync = async (id: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT *
    FROM weapon
    WHERE weapon.id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [id]);
  await client.end();

  return mapFromPSQL<Barracks.Weapon>(rows)[0];
};

export const createWeaponAsync = async (weapon: Barracks.Weapon) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO weapon (
      name,
      range,
      shots,
      pen,
      is_heavy
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const { rows } = await client.query<TableRow>(query, [
    weapon.name,
    weapon.range,
    weapon.shots,
    weapon.pen,
    weapon.isHeavy
  ]);
  await client.end();

  return mapFromPSQL<Barracks.Weapon>(rows)[0];
};

export const updateWeaponAsync = async (weapon: Barracks.Weapon) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    UPDATE weapon
    SET name = $1,
        range = $2,
        shots = $3,
        pen = $4,
        is_heavy = $5
    WHERE id = $6
  `;
  const { rowCount } = await client.query<TableRow>(query, [
    weapon.name,
    weapon.range,
    weapon.shots,
    weapon.pen,
    weapon.isHeavy,
    weapon.id
  ]);
  await client.end();

  return rowCount === 1;
};
