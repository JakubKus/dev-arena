import { gql } from '@apollo/client';

export const enemyQuery = gql`
  query enemy {
    randomEnemy {
      hp
      avatarUrl
      attackSpeed
      damage { max min }
      name
      quotes
    }
  }
`;
