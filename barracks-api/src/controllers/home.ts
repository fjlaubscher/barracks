import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    return res.render('home', {
      title: 'Home'
    });
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
