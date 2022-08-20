import { Router } from 'express';
import getMatchesInProgress from '../controllers/matches.controller';

const matchesRoutes = Router();

matchesRoutes.get('/', getMatchesInProgress);

export default matchesRoutes;
