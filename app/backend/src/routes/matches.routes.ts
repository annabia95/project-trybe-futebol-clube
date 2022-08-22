import { Router } from 'express';
import { validateToken } from '../middlewares/jwtValidation';
import midMatchesRequired from '../middlewares/matchesValidation';
import {
  getMatchesInProgress,
  createMatches,
  finishAllMatches,
  updateAllMatches } from '../controllers/matches.controller';

const matchesRoutes = Router();

matchesRoutes.get('/', getMatchesInProgress);
matchesRoutes.post('/', validateToken, midMatchesRequired, createMatches);
matchesRoutes.patch('/:id/finish', finishAllMatches);
matchesRoutes.patch('/:id', updateAllMatches);

export default matchesRoutes;
