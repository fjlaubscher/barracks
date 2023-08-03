import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// api
import ArmyRouter from './api/army';
import RuleRouter from './api/rule';

const initAPI = async () => {
  try {
    const app = express();
    app.use(express.json());

    app.use('/api/army', ArmyRouter);
    app.use('/api/rule', RuleRouter);

    app.get('/', (req, res) => {
      res.status(200).send('Barracks API is running');
    });

    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    app.listen(port, () => console.log(`Barracks API is listening on http://localhost:${port}`));
  } catch (ex: any) {
    console.log(ex.stack);
  }
};

initAPI();