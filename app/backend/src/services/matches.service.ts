import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

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
