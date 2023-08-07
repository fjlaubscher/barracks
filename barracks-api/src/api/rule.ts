import { Router } from 'express';

// db
import { getRulesAsync, getRuleByIdAsync } from '../db/rule.js';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const ruleId = parseInt(req.params.id);
    const rule = await getRuleByIdAsync(ruleId);
    return res.status(200).json({ status: 'ok', data: rule });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const queryTerm = req.query.query as string | undefined;
    const rules = await getRulesAsync(queryTerm);
    return res.status(200).json({ status: 'ok', data: rules });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
