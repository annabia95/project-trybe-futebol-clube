import { IAwayMatches } from '../interfaces/matchesInterface';

export const calculateVictoriesAway = (matches: IAwayMatches[]) => {
  let vic = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      vic += 1;
    }
  });
  return vic;
};

export const calculatePointsAway = (matches: IAwayMatches[]) => {
  let count = 0;
  matches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) count += 3;

    if (match.homeTeamGoals === match.awayTeamGoals) count += 1;
  });
  return count;
};

export const calculateLossesAway = (matches: IAwayMatches[]) => {
  let losses = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals < match.homeTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

export const cDrawsAway = (matches: IAwayMatches[]) => {
  let draws = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

export const totalFavorGoals = (matches: IAwayMatches[]) => {
  let gols = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals) gols += match.awayTeamGoals;
  });
  return gols;
};

export const totalOwnGoals = (matches: IAwayMatches[]) => {
  let gols = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals) gols += match.homeTeamGoals;
  });
  return gols;
};

export const calculateTotalScore = (matches: IAwayMatches[]) => {
  const homeTeamGoals = totalOwnGoals(matches);
  const awayTeamGoals = totalFavorGoals(matches);

  const goals = awayTeamGoals - homeTeamGoals;
  return goals;
};

export const calculateEfficiency = (matches: IAwayMatches[]) => {
  const points = calculatePointsAway(matches);
  const match = matches.length * 3;
  const efficiency = points / match;

  if (!Number.isInteger(efficiency * 100)) {
    return (efficiency * 100).toFixed(2);
  }
  return (efficiency * 100);
};
