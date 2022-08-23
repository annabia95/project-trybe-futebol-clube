import {
  calculateVictoriesAway,
  calculatePointsAway,
  cDrawsAway,
  calculateLossesAway,
  calculateEfficiency,
  calculateTotalScore,
  totalFavorGoals,
  totalOwnGoals,
} from '../middlewares/awayCalculateLeaderboard';
import { getTeams } from './teams.service';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import { IAwayMatches } from '../interfaces/matchesInterface';

export const getAllAwayMatches = async () => {
  const result = await Matches.findAll({
    where: {
      inProgress: false,
    },
    include: [
      {
        model: Teams,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        },
      },
    ],
  });
  return result as unknown as IAwayMatches[];
};

export const leaderboardAway = async () => {
  const teams = await getTeams();
  const matches = await getAllAwayMatches();
  const matchesMap = teams.map((e) => {
    const result = matches.filter((match) => match.teamAway.teamName === e.teamName);
    return {
      name: e.teamName,
      totalPoints: calculatePointsAway(result),
      totalGames: result.length,
      totalVictories: calculateVictoriesAway(result),
      totalDraws: cDrawsAway(result),
      totalLosses: calculateLossesAway(result),
      goalsFavor: totalFavorGoals(result),
      goalsOwn: totalOwnGoals(result),
      goalsBalance: calculateTotalScore(result),
      efficiency: calculateEfficiency(result),
    };
  });
  return matchesMap;
};

export const sortLeaderboardAway = async () => {
  const result = await leaderboardAway();

  result.sort(
    (a, b) => {
      if (b.totalPoints > a.totalPoints) return 1;
      if (b.totalPoints < a.totalPoints) return -1;

      if (b.totalVictories > a.totalVictories) return 1;
      if (b.totalVictories < a.totalVictories) return -1;

      if (b.goalsBalance > a.goalsBalance) return 1;
      if (b.goalsBalance < a.goalsBalance) return -1;

      if (b.goalsFavor > a.goalsFavor) return 1;
      if (b.goalsFavor < a.goalsFavor) return -1;

      if (b.goalsOwn > a.goalsOwn) return 1;
      if (b.goalsOwn < a.goalsOwn) return -1;

      return 0;
    },
  );
  return result;
};
