import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { IMatches } from '../interfaces/matchesInterface';

export const getAllMatches = async () => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  return matches;
};

export const getAllMatchesInProgress = async (value: boolean) => {
  const allInProgressMatches = await Matches.findAll({
    where: { inProgress: value },
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  return allInProgressMatches;
};

export const createMatch = async (obj: IMatches) => {
  const inProgress = true;
  const newMatch = await Matches
    .create(obj);
  const { id,
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals } = newMatch;
  return {
    id,
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress,
  };
};

export const finishMatches = async (id: number) => {
  const result = await Matches.update({
    inProgress: false,
  }, {
    where: {
      id,
    },
  });
  return result;
};

export const updateMatches = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  const result = await Matches.update({
    homeTeamGoals,
    awayTeamGoals,
  }, {
    where: {
      id,
    },
  });

  return result;
};
