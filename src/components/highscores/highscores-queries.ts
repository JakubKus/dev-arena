import { gql } from '@apollo/client';

export const comboTimesQuery = gql`
  query comboTimes {
    comboTimes {
      establishedOn
      nickname
      value
    }
  }
`;

export const wonFightsQuery = gql`
  query wonFights {
    wonFights {
      establishedOn
      nickname
      value
    }
  }
`;
