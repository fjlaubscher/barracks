import { Router } from 'express';

// db
import { getRulesAsync, createRuleAsync, getRuleByIdAsync, updateRuleAsync } from '../db/rule.js';

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const payload = req.body as Barracks.Rule;
    const created = await createRuleAsync({ ...payload });

    if (created) {
      return res.redirect('/rule');
    } else {
      return res.status(500).json({ status: 'error', data: 'Unable to create rule.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/create', async (req, res) => {
  try {
    return res.render('create-rule', {
      title: 'Create Rule'
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const ruleId = Number(req.params.id);
    const payload = req.body as Barracks.Rule;
    const updated = await updateRuleAsync({ ...payload, id: ruleId });

    if (updated) {
      return res.redirect(`/rule/${ruleId}`);
    } else {
      return res.status(500).json({ status: 'error', data: 'Unable to update rule.' });
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ruleId = Number(req.params.id);
    const rule = await getRuleByIdAsync(ruleId);
    return res.render('rule', {
      title: `Edit Rule - #${ruleId}`,
      data: rule
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const rules = await getRulesAsync();
    return res.render('rules', {
      title: 'Rules',
      data: rules
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
