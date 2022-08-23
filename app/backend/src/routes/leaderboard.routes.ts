import { Router } from 'express';
import { getHomeLeaderboard, getAwayLeaderboard } from '../controllers/leaderboard.controllerr';

const leaderRoutes = Router();

leaderRoutes.get('/home', getHomeLeaderboard);
leaderRoutes.get('/away', getAwayLeaderboard);

export default leaderRoutes;
