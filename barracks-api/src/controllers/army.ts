import { Router } from 'express';

// db
import { getArmiesAsync, getArmyByIdAsync } from '../db/army.js';
import { createUnitAsync, getUnitsByArmyIdAsync } from '../db/unit.js';
import { getUnitTypesAsync } from '../db/unit-type.js';

const router = Router();

router.post('/:id/unit/create', async (req, res) => {
  try {
    const armyId = Number(req.params.id);
    const payload = req.body as Barracks.Unit;
    const createdUnit = await createUnitAsync({ ...payload, armyId });

    if (createdUnit) {
      return res.redirect(`/unit/${createdUnit.id}`);
    } else {
      return res.status(500).json({ status: 'error', data: 'Failed to create unit.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id/unit/create', async (req, res) => {
  try {
    const unitTypes = await getUnitTypesAsync();
    return res.render('create-unit', {
      title: 'Create Unit',
      data: unitTypes
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const armyId = Number(req.params.id);
    const army = await getArmyByIdAsync(armyId);
    const units = await getUnitsByArmyIdAsync(armyId);

    return res.render('army', {
      title: army.name,
      data: {
        army,
        units
      }
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const armies = await getArmiesAsync();

    return res.render('armies', {
      title: 'Armies',
      data: armies
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
