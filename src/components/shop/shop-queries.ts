import { gql } from '@apollo/client';

export const shopClothingQuery = gql`
  query shopClothing {
    allClothing {
      id
      imageUrl
      name
      price
    }
  }
`;

export const shopDevelopersQuery = gql`
  query shopDevelopers {
    allDevelopers {
      id
      avatarUrl
      name
      price
    }
  }
`;

export const equipItemQuery = gql`
  mutation equipItem($nick: String!, $toEquip: ID!, $equipped: [ID!]!) {
    equipItem(nickname: $nick, toEquipId: $toEquip, equippedIds: $equipped) {
      boughtIds
      equippedIds
    }
  }
`;

export const shopPlayerQuery = gql`
  mutation shopUpdatePlayer($nick: String!, $cash: Float!, $boughtIds: [ID!]!) {
    updatePlayer(nickname: $nick, cash: $cash, boughtIds: $boughtIds) {
      cash
      boughtIds
    }
  }
`;

export const shopChangeDeveloperQuery = gql`
  mutation shopChangeDeveloper($nick: String!, $chosenDevName: String!) {
    updatePlayer(nickname: $nick, chosenDevName: $chosenDevName) { chosenDevName }
  }
`;

export const shopUnequipClothingQuery = gql`
  mutation shopUnequipClothing($nick: String!, $equippedIds: [ID!]!) {
    updatePlayer(nickname: $nick, equippedIds: $equippedIds) { equippedIds }
  }
`;
