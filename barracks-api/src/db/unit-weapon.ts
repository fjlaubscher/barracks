import pg from 'pg';
import { mapFromPSQL } from '../helpers.js';

export const createUnitWeaponAsync = async (weaponId: number, unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    INSERT INTO unit_weapon (
      unit_id,
      weapon_id
    )
    VALUES ($1, $2)
    RETURNING *    
  `;
  const { rows } = await client.query<TableRow>(query, [unitId, weaponId]);
  await client.end();

  return mapFromPSQL<Barracks.UnitWeapon>(rows)[0];
};

export const getUnitWeaponsAsync = async (unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const query = `
    SELECT weapon.*
    FROM weapon
    INNER JOIN unit_weapon ON unit_weapon.weapon_id = weapon.id 
    WHERE unit_weapon.unit_id = $1
  `;
  const { rows } = await client.query<TableRow>(query, [unitId]);
  await client.end();

  return mapFromPSQL<Barracks.Weapon>(rows);
};

export const deleteUnitWeaponsAsync = async (unitId: number) => {
  const client = new pg.Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>(`DELETE FROM unit_weapon WHERE unit_id = $1`, [
    unitId
  ]);
  await client.end();

  return rowCount > 0;
};
