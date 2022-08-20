import { ITeam } from '../interfaces/teamsInterface';
import Teams from '../database/models/teams';

export const getTeams = async (): Promise<ITeam[]> => {
  const teams = await Teams.findAll();
  return teams;
};

export const getTeamById = async (id: number) => {
  const team = await Teams.findByPk(id);
  if (!team) return null;
  return team;
};
