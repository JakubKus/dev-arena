import { gql } from '@apollo/client';

export const developerQuery = gql`
  query developer($name: String) {
    developer(name: $name) {
      hp
      damage { max min }
      avatarUrl
      weaponUrl
    }
  }
`;

export const developerClothingQuery = gql`
  query developerClothing($clothingIds: [ID!]!) {
    clothing(ids: $clothingIds) {
      bodyPart
      imageUrl
    }
  }
`;
