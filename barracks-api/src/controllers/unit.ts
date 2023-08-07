import { Router } from 'express';

// db
import { getRulesAsync } from '../db/rule.js';
import { getUnitByIdAsync } from '../db/unit.js';
import { getUnitTypesAsync } from '../db/unit-type.js';
import { getWeaponsAsync } from '../db/weapon.js';
import { createUnitRuleAsync, deleteUnitRulesAsync, getUnitRulesAsync } from '../db/unit-rule.js';
import {
  createUnitWeaponAsync,
  deleteUnitWeaponsAsync,
  getUnitWeaponsAsync
} from '../db/unit-weapon.js';

const router = Router();

router.post('/:id/rules', async (req, res) => {
  try {
    const unitId = Number(req.params.id);
    const { ruleId } = req.body as { ruleId: string | string[] };
    const ruleIds = typeof ruleId === 'string' ? [Number(ruleId)] : ruleId.map((id) => Number(id));

    await deleteUnitRulesAsync(unitId);

    for (let i = 0; i < ruleIds.length; i++) {
      await createUnitRuleAsync(ruleIds[i], unitId);
    }

    return res.redirect(`/unit/${unitId}`);
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id/weapons', async (req, res) => {
  try {
    const unitId = Number(req.params.id);
    console.log(req.body);
    const { weaponId } = req.body as { weaponId: string | string[] };
    const weaponIds =
      typeof weaponId === 'string' ? [Number(weaponId)] : weaponId.map((id) => Number(id));

    await deleteUnitWeaponsAsync(unitId);

    for (let i = 0; i < weaponIds.length; i++) {
      await createUnitWeaponAsync(weaponIds[i], unitId);
    }

    return res.redirect(`/unit/${unitId}`);
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const unitId = Number(req.params.id);

    const rules = await getRulesAsync();
    const weapons = await getWeaponsAsync();

    const unit = await getUnitByIdAsync(unitId);
    const unitTypes = await getUnitTypesAsync();
    const unitWeapons = await getUnitWeaponsAsync(unitId);
    const unitRules = await getUnitRulesAsync(unitId);

    if (unit) {
      return res.render('unit', {
        title: `Edit Unit - #${unitId}`,
        data: {
          rules,
          unit,
          unitTypes,
          weapons,
          unitWeapons,
          unitRules
        }
      });
    } else {
      return res.status(400);
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
