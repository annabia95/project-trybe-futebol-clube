import { Request, Response } from 'express';
import { getTeams, getTeamById } from '../services/teams.service';

export const getAllTeams = async (req: Request, res: Response) => {
  const teams = await getTeams();

  return res.status(200).json(teams);
};

export const getAllTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await getTeamById(Number(id));

  return res.status(200).json(team);
};
