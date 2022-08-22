import { Request, Response } from 'express';
import {
  getAllMatches,
  getAllMatchesInProgress,
  createMatch,
  finishMatches,
  updateMatches } from '../services/matches.service';

export const getMatchesInProgress = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  let matches;

  if (inProgress) {
    const convertValue = inProgress === 'true';
    matches = await getAllMatchesInProgress(convertValue);

    return res.status(200).json(matches);
  }

  matches = await getAllMatches();
  return res.status(200).json(matches);
};

export const createMatches = async (req: Request, res: Response) => {
  const match = req.body;
  const newMatch = await createMatch(match);
  return res.status(201).json(newMatch);
};

export const finishAllMatches = async (req: Request, res: Response) => {
  const { id } = req.params;
  const finishedMatches = await finishMatches(Number(id));
  if (!finishedMatches) return 'It is not possible to update!';
  return res.status(200).json({ message: 'Finished' });
};

export const updateAllMatches = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const updated = await updateMatches(Number(id), homeTeamGoals, awayTeamGoals);
  if (!updated) return 'It is not possible to update!';
  return res.status(200).json({ message: 'Updated!' });
};
