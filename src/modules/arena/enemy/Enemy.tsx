import React, { FC } from 'react';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Enemy_avatar } from './__generated__/Enemy_avatar.graphql';

export const EnemyAvatar: FC<Enemy_avatar> = props => (
  <img src={props.avatarUrl} alt={`${props.name} avatar`} />
);

EnemyAvatar.defaultProps = {
  avatarUrl: 'https://placeimg.com/50/50/animals',
  name: 'jQuery'
};

createFragmentContainer(() => null, {
  enemy: graphql`
    fragment Enemy_enemy on Enemy @relay(mask: false) {
      attackSpeed
      damage {
        max
        min
      }
      hp
      quotes
      ...Enemy_avatar @relay(mask: false)
    }
  `
});

createFragmentContainer(EnemyAvatar, {
  avatar: graphql`
    fragment Enemy_avatar on Enemy @relay(mask: false) {
      avatarUrl
      name
    }
  `
});
