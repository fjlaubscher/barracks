import { Router } from 'express';

// db
import { getUnitProfileByIdAsync, updateUnitProfileAsync } from '../db/unit-profile.js';

const router = Router();

router.post('/:id', async (req, res) => {
  try {
    const profileId = Number(req.params.id);
    const payload = req.body as Barracks.UnitProfile;
    const updated = await updateUnitProfileAsync({ ...payload, id: profileId });

    if (updated) {
      return res.redirect(`/profile/${profileId}`);
    } else {
      return res.status(400);
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profileId = Number(req.params.id);
    const profile = await getUnitProfileByIdAsync(profileId);

    if (profile) {
      return res.render('profile', {
        title: `Edit Profile - #${profileId}`,
        data: profile
      });
    } else {
      return res.status(400);
    }
  } catch (ex: any) {
    return res.status(500).json({ status: 'error', data: ex.message });
  }
});

export default router;
