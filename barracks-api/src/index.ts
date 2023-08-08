import express from 'express';
import htmlExpress from 'html-express-js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

// api
import ArmyRouter from './api/army.js';
import RuleRouter from './api/rule.js';

// controllers
import ArmyController from './controllers/army.js';
import HomeController from './controllers/home.js';
import RuleController from './controllers/rule.js';
import UnitController from './controllers/unit.js';
import UnitOptionController from './controllers/unit-option.js';
import UnitProfileController from './controllers/unit-profile.js';
import WeaponController from './controllers/weapon.js';

const initAPI = async () => {
  try {
    const app = express();
    // api
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use('/api/army', ArmyRouter);
    app.use('/api/rule', RuleRouter);
    // admin
    app.engine(
      'js',
      htmlExpress({
        includesDir: 'includes'
      })
    );
    app.set('view engine', 'js');
    app.set('views', `${process.cwd()}/dist/views`);

    app.use('/weapon', WeaponController);
    app.use('/unit', UnitController);
    app.use('/rule', RuleController);
    app.use('/profile', UnitProfileController);
    app.use('/option', UnitOptionController);
    app.use('/army', ArmyController);
    app.use('/', HomeController);

    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    app.listen(port, () => console.log(`Barracks API is listening on http://localhost:${port}`));
  } catch (ex: any) {
    console.log(ex.stack);
  }
};

initAPI();
