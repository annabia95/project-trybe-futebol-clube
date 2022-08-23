import { Router } from 'express';
import getHomeLeaderboard from '../controllers/leaderboard.controllerr';

const leaderRoutes = Router();

leaderRoutes.get('/home', getHomeLeaderboard);

export default leaderRoutes;
