import { Router } from 'express';
import { getAllTeams, getAllTeamById } from '../controllers/teams.controller';

const teamsRoutes = Router();

teamsRoutes.get('/', getAllTeams);
teamsRoutes.get('/:id', getAllTeamById);

export default teamsRoutes;
