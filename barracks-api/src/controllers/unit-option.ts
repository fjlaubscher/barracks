import { Router } from 'express';

// db
import { getUnitOptionByIdAsync, updateUnitOptionAsync } from '../db/unit-option.js';
import { getRulesAsync } from '../db/rule.js';
import { getWeaponsAsync } from '../db/weapon.js';

const router = Router();

router.post('/:id', async (req, res) => {
  try {
    const optionId = Number(req.params.id);
    const payload = req.body as Barracks.UnitOption;
    const updated = await updateUnitOptionAsync({
      ...payload,
      isUnitUpgrade: payload.isUnitUpgrade ?? false,
      ruleId: Number(payload.ruleId) || null,
      weaponId: Number(payload.weaponId) || null,
      maxAllowed: Number(payload.maxAllowed) || null,
      id: optionId
    });

    if (updated) {
      return res.redirect(`/option/${optionId}`);
    } else {
      return res.status(400);
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const optionId = Number(req.params.id);
    const option = await getUnitOptionByIdAsync(optionId);
    const rules = await getRulesAsync();
    const weapons = await getWeaponsAsync();

    if (option) {
      return res.render('option', {
        title: `Edit Unit Option - #${optionId}`,
        data: {
          option,
          rules,
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
