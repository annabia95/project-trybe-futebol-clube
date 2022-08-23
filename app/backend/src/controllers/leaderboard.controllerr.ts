import { Request, Response, NextFunction } from 'express';
import { sortLeaderboardHome } from '../services/homeLeaderboard.service';

const getHomeLeaderboard = async (_req: Request, res: Response, _next: NextFunction) => {
  const homeRank = await sortLeaderboardHome();

  if (!homeRank) return res.status(404).json();

  return res.status(200).json(homeRank);
};

export default getHomeLeaderboard;
