import { gql } from '@apollo/client';

export const defaultDevQuery = gql`
  query defaultDeveloper {
    defaultDeveloper {
      id
      name
    }
  }
`;

export const initPlayerQuery = gql`
  query authPlayer($email: String!) {
    player(email: $email) {
      boughtIds
      cash
      chosenDevName
      comboTime
      equippedIds
      nickname
      wonFights
    }
  }
`;

export const addPlayerQuery = gql`
  mutation addPlayer($chosenDevName: String!, $cash: Float!, $nickname: String!, $email: String!) {
    addPlayer(
      chosenDevName: $chosenDevName,
      cash: $cash,
      wonFights: 0,
      nickname: $nickname,
      equippedIds: [],
      email: $email,
      boughtIds: []
    ) { id }
  }
`;
