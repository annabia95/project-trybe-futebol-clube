import { Request, Response, NextFunction } from 'express';
import { sortLeaderboardHome } from '../services/homeLeaderboard.service';
import { sortLeaderboardAway } from '../services/awayLeaderboard.service';

export const getHomeLeaderboard = async (_req: Request, res: Response, _next: NextFunction) => {
  const homeRank = await sortLeaderboardHome();

  if (!homeRank) return res.status(404).json();

  return res.status(200).json(homeRank);
};

export const getAwayLeaderboard = async (_req: Request, res: Response, _next: NextFunction) => {
  const awayRank = await sortLeaderboardAway();

  if (!awayRank) return res.status(404).json();

  return res.status(200).json(awayRank);
};
