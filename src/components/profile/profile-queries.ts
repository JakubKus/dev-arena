import { gql } from '@apollo/client';

export const profileDeveloperQuery = gql`
  query profileDeveloper($name: String) {
    developer(name: $name) {
      avatarUrl
    }
  }
`;

export const profilePlayerQuery = gql`
  query profilePlayer($email: String!) {
    player(email: $email) {
      cash
      comboTime
      wonFights
    }
  }
`

export const profileClothingQuery = gql`
  query profileClothing($clothingIds: [ID!]!) {
    clothing(ids: $clothingIds) {
      bodyPart
      imageUrl
    }
  }
`
