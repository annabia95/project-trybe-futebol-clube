import { Request, Response } from 'express';
import { getAllMatches, getAllMatchesInProgress, createMatch } from '../services/matches.service';

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
