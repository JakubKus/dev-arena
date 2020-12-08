import { gql } from '@apollo/client';

export const battleWonQuery = gql`
  mutation wonFight($nick: String!, $value: Int!) {
    addWonFight(nickname: $nick, value: $value) { id }
  }
`;

export const battleComboQuery = gql`
  mutation comboTime($nick: String!, $value: Int!) {
    addComboTime(nickname: $nick, value: $value) { id }
  }
`;

export const battlePlayerQuery = gql`
  mutation updateVictoriousPlayer($nick: String!, $cash: Float!, $fights: Int!, $combo: Int!) {
    updatePlayer(nickname: $nick, cash: $cash, wonFights: $fights, comboTime: $combo) { id }
  }
`;
