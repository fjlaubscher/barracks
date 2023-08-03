import { Router } from 'express';

// db
import { getArmiesAsync, getArmyByIdAsync } from '../db/army';
import { getRulesByArmyIdAsync } from '../db/rule';

const router = Router();

router.get('/:id/rules', async (req, res) => {
  try {
    const armyId = parseInt(req.params.id);
    const rules = await getRulesByArmyIdAsync(armyId);
    return res.status(200).json({ status: 'ok', data: rules });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const armyId = parseInt(req.params.id);
    const army = await getArmyByIdAsync(armyId);
    return res.status(200).json({ status: 'ok', data: army });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const armies = await getArmiesAsync();
    return res.status(200).json({ status: 'ok', data: armies });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
