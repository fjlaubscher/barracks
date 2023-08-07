import { Router } from 'express';

// db
import { getUnitByIdAsync } from '../db/unit.js';
import { getUnitTypesAsync } from '../db/unit-type.js';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const unitId = Number(req.params.id);
    const unit = await getUnitByIdAsync(unitId);
    const unitTypes = await getUnitTypesAsync();

    if (unit) {
      return res.render('unit', {
        title: `Edit Unit - #${unitId}`,
        data: {
          unit,
          unitTypes
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
