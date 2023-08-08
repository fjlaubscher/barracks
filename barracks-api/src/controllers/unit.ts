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
import { createUnitProfileAsync, getUnitProfilesByUnitIdAsync } from '../db/unit-profile.js';
import { createUnitOptionAsync, getUnitOptionsByUnitIdAsync } from '../db/unit-option.js';

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

router.post('/:id/profile/create', async (req, res) => {
  try {
    const unitId = Number(req.params.id);
    const payload = req.body as Barracks.UnitProfile;
    const created = await createUnitProfileAsync({ ...payload, unitId });

    if (created) {
      return res.redirect(`/profile/${created.id}`);
    } else {
      return res.status(500).json({ status: 'error', data: 'Failed to create profile.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/profile/create', async (req, res) => {
  try {
    return res.render('create-profile', {
      title: 'Create Unit Profile'
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id/option/create', async (req, res) => {
  try {
    const unitId = Number(req.params.id);
    const payload = req.body as Barracks.UnitOption;
    const created = await createUnitOptionAsync({
      ...payload,
      isUnitUpgrade: payload.isUnitUpgrade ?? false,
      ruleId: Number(payload.ruleId) || null,
      weaponId: Number(payload.weaponId) || null,
      maxAllowed: Number(payload.maxAllowed) || null,
      unitId
    });

    if (created) {
      return res.redirect(`/option/${created.id}`);
    } else {
      return res.status(500).json({ status: 'error', data: 'Failed to create option.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/option/create', async (req, res) => {
  try {
    const rules = await getRulesAsync();
    const weapons = await getWeaponsAsync();

    return res.render('create-option', {
      title: 'Create Unit Option',
      data: {
        rules,
        weapons
      }
    });
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
    const unitOptions = await getUnitOptionsByUnitIdAsync(unitId);
    const unitProfiles = await getUnitProfilesByUnitIdAsync(unitId);
    const unitRules = await getUnitRulesAsync(unitId);
    const unitTypes = await getUnitTypesAsync();
    const unitWeapons = await getUnitWeaponsAsync(unitId);

    if (unit) {
      return res.render('unit', {
        title: `Edit Unit - #${unitId}`,
        data: {
          rules,
          unit,
          unitOptions,
          unitProfiles,
          unitRules,
          unitTypes,
          unitWeapons,
          weapons
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
