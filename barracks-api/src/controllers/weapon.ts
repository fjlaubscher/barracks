import { Router } from 'express';

// db
import {
  getWeaponsAsync,
  getWeaponByIdAsync,
  createWeaponAsync,
  updateWeaponAsync
} from '../db/weapon.js';
import { getRulesAsync } from '../db/rule.js';
import {
  createWeaponRuleAsync,
  deleteWeaponRulesAsync,
  getWeaponRulesAsync
} from '../db/weapon-rule.js';

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const payload = req.body as Barracks.Weapon;
    const created = await createWeaponAsync({ ...payload, isHeavy: payload.isHeavy ?? false });

    if (created) {
      return res.redirect('/weapon');
    } else {
      return res.status(500).json({ status: 'error', data: 'Unable to create weapon.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/create', async (req, res) => {
  try {
    return res.render('create-weapon', {
      title: 'Create Weapon'
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id/rules', async (req, res) => {
  try {
    const weaponId = Number(req.params.id);
    const { ruleId } = req.body as { ruleId: string | string[] };
    const ruleIds = typeof ruleId === 'string' ? [Number(ruleId)] : ruleId.map((id) => Number(id));

    await deleteWeaponRulesAsync(weaponId);

    for (let i = 0; i < ruleIds.length; i++) {
      await createWeaponRuleAsync(ruleIds[i], weaponId);
    }

    return res.redirect(`/weapon/${weaponId}`);
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const weaponId = Number(req.params.id);
    const payload = req.body as Barracks.Weapon;
    const updated = await updateWeaponAsync({
      ...payload,
      isHeavy: payload.isHeavy ?? false,
      id: weaponId
    });

    if (updated) {
      return res.redirect(`/weapon/${weaponId}`);
    } else {
      return res.status(500).json({ status: 'error', data: 'Unable to update weapon.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const weaponId = Number(req.params.id);
    const weapon = await getWeaponByIdAsync(weaponId);
    const weaponRules = await getWeaponRulesAsync(weaponId);
    const rules = await getRulesAsync();

    return res.render('weapon', {
      title: `Edit Weapon - #${weaponId}`,
      data: {
        weapon,
        weaponRules,
        rules
      }
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const weapons = await getWeaponsAsync();
    return res.render('weapons', {
      title: 'Weapons',
      data: weapons
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
