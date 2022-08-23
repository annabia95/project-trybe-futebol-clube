import { IHomeMatches } from '../interfaces/matchesInterface';

export const calculateVictoriesHome = (matches: IHomeMatches[]) => {
  let vic = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      vic += 1;
    }
  });
  return vic;
};

export const calculatePointsHome = (matches: IHomeMatches[]) => {
  let count = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) count += 3;

    if (match.homeTeamGoals === match.awayTeamGoals) count += 1;
  });
  return count;
};

export const calculateLossesHome = (matches: IHomeMatches[]) => {
  let losses = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

export const cDrawsHome = (matches: IHomeMatches[]) => {
  let draws = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

export const totalFavorGoals = (matches: IHomeMatches[]) => {
  let gols = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals) gols += match.homeTeamGoals;
  });
  return gols;
};

export const totalOwnGoals = (matches: IHomeMatches[]) => {
  let gols = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals) gols += match.awayTeamGoals;
  });
  return gols;
};

export const calculateTotalScore = (matches: IHomeMatches[]) => {
  const homeTeamGoals = totalFavorGoals(matches);
  const awayTeamGoals = totalOwnGoals(matches);

  const goals = homeTeamGoals - awayTeamGoals;
  return goals;
};

export const calculateEfficiency = (matches: IHomeMatches[]) => {
  const points = calculatePointsHome(matches);
  const match = matches.length * 3;
  const efficiency = points / match;

  if (!Number.isInteger(efficiency * 100)) {
    return (efficiency * 100).toFixed(2);
  }
  return (efficiency * 100);
};
