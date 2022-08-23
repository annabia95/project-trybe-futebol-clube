import {
  calculateVictoriesHome,
  calculatePointsHome,
  cDrawsHome,
  calculateLossesHome,
  calculateEfficiency,
  calculateTotalScore,
  totalFavorGoals,
  totalOwnGoals,
} from '../middlewares/homeCalculateLeaderboard';
import { getTeams } from './teams.service';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import { IHomeMatches } from '../interfaces/matchesInterface';

export const getAllHomeMatches = async () => {
  const result = await Matches.findAll({
    where: {
      inProgress: false,
    },
    include: [
      {
        model: Teams,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        },
      },
    ],
  });
  return result as unknown as IHomeMatches[];
};

export const leaderboardHome = async () => {
  const teams = await getTeams();
  const matches = await getAllHomeMatches();
  const matchesMap = teams.map((e) => {
    const result = matches.filter((match) => match.teamHome.teamName === e.teamName);
    return {
      name: e.teamName,
      totalPoints: calculatePointsHome(result),
      totalGames: result.length,
      totalVictories: calculateVictoriesHome(result),
      totalDraws: cDrawsHome(result),
      totalLosses: calculateLossesHome(result),
      goalsFavor: totalFavorGoals(result),
      goalsOwn: totalOwnGoals(result),
      goalsBalance: calculateTotalScore(result),
      efficiency: calculateEfficiency(result),
    };
  });
  return matchesMap;
};

export const sortLeaderboardHome = async () => {
  const result = await leaderboardHome();

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
