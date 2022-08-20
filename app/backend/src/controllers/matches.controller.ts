import { Request, Response } from 'express';
import { getAllMatches, getAllMatchesInProgress } from '../services/matches.service';

const getMatchesInProgress = async (req: Request, res: Response) => {
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

export default getMatchesInProgress;
