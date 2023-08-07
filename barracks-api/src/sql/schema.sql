-- Army
CREATE TABLE army (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    image VARCHAR(256) NOT NULL,
    last_updated DATE NOT NULL
);
CREATE INDEX ix_army ON army(id);

-- Rule
CREATE TABLE rule (
    id SERIAL PRIMARY KEY,
    name VARCHAR(1024) NOT NULL,
    description VARCHAR(4096) NOT NULL
);
CREATE INDEX ix_rule ON rule(id);

-- ArmyRule
CREATE TABLE army_rule (
    id SERIAL PRIMARY KEY,
    army_id INTEGER NOT NULL,
    rule_id INTEGER NOT NULL,
    FOREIGN KEY (army_id) REFERENCES army(id) ON DELETE CASCADE,
    FOREIGN KEY (rule_id) REFERENCES rule(id) ON DELETE CASCADE
);
CREATE INDEX ix_army_rule ON army_rule(id);
CREATE INDEX ix_army_rule_army ON army_rule(army_id);
CREATE INDEX ix_army_rule_rule ON army_rule(rule_id);

-- Unit Type
CREATE TABLE unit_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL
);
CREATE INDEX ix_unit_type ON unit_type(id);

-- Unit
CREATE TABLE unit (
  id SERIAL PRIMARY KEY,
  army_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  name VARCHAR(64) NOT NULL,
  description VARCHAR(256) NOT NULL,
  models INTEGER NOT NULL,
  FOREIGN KEY (army_id) REFERENCES army(id) ON DELETE CASCADE,
  FOREIGN KEY (type_id) REFERENCES unit_type(id) ON DELETE CASCADE
);
CREATE INDEX ix_unit ON unit(id);
CREATE INDEX ix_unit_army ON unit(army_id);
CREATE INDEX ix_unit_type ON unit(type_id);

-- UnitRule
CREATE TABLE unit_rule (
    id SERIAL PRIMARY KEY,
    rule_id INTEGER NOT NULL,
    unit_id INTEGER NOT NULL,
    FOREIGN KEY (rule_id) REFERENCES rule(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE
);
CREATE INDEX ix_unit_rule ON unit_rule(id);
CREATE INDEX ix_unit_rule_rule ON unit_rule(rule_id);
CREATE INDEX ix_unit_rule_unit ON unit_rule(unit_id);

-- Weapon
CREATE TABLE weapon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    range VARCHAR(16) NOT NULL,
    shots VARCHAR(8) NOT NULL,
    pen VARCHAR(8),
    is_heavy BOOLEAN NOT NULL
);
CREATE INDEX ix_weapon ON weapon(id);

-- WeaponRule
CREATE TABLE weapon_rule (
    id SERIAL PRIMARY KEY,
    rule_id INTEGER NOT NULL,
    weapon_id INTEGER NOT NULL,
    FOREIGN KEY (rule_id) REFERENCES rule(id) ON DELETE CASCADE,
    FOREIGN KEY (weapon_id) REFERENCES weapon(id) ON DELETE CASCADE
);
CREATE INDEX ix_weapon_rule ON weapon_rule(id);
CREATE INDEX ix_weapon_rule_rule ON weapon_rule(rule_id);
CREATE INDEX ix_weapon_rule_weapon ON weapon_rule(weapon_id);

-- UnitOption
CREATE TABLE unit_option (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  inexperienced_cost INTEGER,
  regular_cost INTEGER,
  veteran_cost INTEGER,
  rule_id INTEGER,
  unit_id INTEGER NOT NULL,
  weapon_id INTEGER,
  is_unit_upgrade BOOLEAN NOT NULL,
  FOREIGN KEY (rule_id) REFERENCES rule(id) ON DELETE CASCADE,
  FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE,
  FOREIGN KEY (weapon_id) REFERENCES weapon(id) ON DELETE CASCADE
);
CREATE INDEX ix_unit_option ON unit_option(id);
CREATE INDEX ix_unit_option_rule ON unit_option(rule_id);
CREATE INDEX ix_unit_option_unit ON unit_option(unit_id);
CREATE INDEX ix_unit_option_weapon ON unit_option(weapon_id);

-- UnitProfile
CREATE TABLE unit_profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    inexperienced_cost INTEGER,
    regular_cost INTEGER,
    veteran_cost INTEGER,
    armour VARCHAR(8),
    transport VARCHAR(64),
    tow VARCHAR(64),
    unit_id INTEGER NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE
);
CREATE INDEX ix_unit_profile ON unit_profile(id);
CREATE INDEX ix_unit_profile_unit ON unit_profile(unit_id);

-- UnitWeapon
CREATE TABLE unit_weapon (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER NOT NULL,
    weapon_id INTEGER NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE CASCADE,
    FOREIGN KEY (weapon_id) REFERENCES weapon(id) ON DELETE CASCADE
);
CREATE INDEX ix_unit_weapon ON unit_weapon(id);
CREATE INDEX ix_unit_weapon_unit ON unit_weapon(unit_id);
CREATE INDEX ix_unit_weapon_weapon ON unit_weapon(weapon_id);

-- List
CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    army_id INTEGER NOT NULL,
    created_date DATE NOT NULL,
    created_by VARCHAR(128) NOT NULL,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(4096) NOT NULL,
    points INTEGER NOT NULL,
    points_limit INTEGER NOT NULL,
    is_public BOOLEAN NOT NULL,
    FOREIGN KEY (army_id) REFERENCES army(id) ON DELETE CASCADE
);
CREATE INDEX ix_list ON list(id);
CREATE INDEX ix_list_army ON list(army_id);
CREATE INDEX ix_list_created_by ON list(created_by);

-- ListUnit
CREATE TABLE list_unit (
    id SERIAL PRIMARY KEY,
    list_id INTEGER NOT NULL,
    unit_profile_id INTEGER NOT NULL,
    FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_profile_id) REFERENCES unit_profile(id) ON DELETE CASCADE
);
CREATE INDEX ix_list_unit ON list_unit(id);
CREATE INDEX ix_list_unit_list ON list_unit(list_id);
CREATE INDEX ix_list_unit_profile ON list_unit(unit_profile_id);

-- ListUnitOption
CREATE TABLE list_unit_option (
    id SERIAL PRIMARY KEY,
    list_unit_id INTEGER NOT NULL,
    unit_option_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    FOREIGN KEY (list_unit_id) REFERENCES list_unit(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_option_id) REFERENCES unit_option(id) ON DELETE CASCADE
);
CREATE INDEX ix_list_unit_option ON list_unit_option(id);
CREATE INDEX ix_list_unit_option_unit ON list_unit_option(list_unit_id);
CREATE INDEX ix_list_unit_option_option ON list_unit_option(unit_option_id);

