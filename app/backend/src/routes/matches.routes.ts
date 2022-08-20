import { Router } from 'express';
import { validateToken } from '../middlewares/jwtValidation';
import midMatchesRequired from '../middlewares/matchesValidation';
import { getMatchesInProgress, createMatches } from '../controllers/matches.controller';

const matchesRoutes = Router();

matchesRoutes.get('/', getMatchesInProgress);
matchesRoutes.post('/', validateToken, midMatchesRequired, createMatches);

export default matchesRoutes;
