import React, { FC } from 'react';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Developer_avatar } from './__generated__/Developer_avatar.graphql';

export const DeveloperAvatar: FC<Developer_avatar> = props => (
  <img src={props.avatarUrl} alt={`${props.fullName} avatar`} />
);

DeveloperAvatar.defaultProps = {
  avatarUrl: 'https://placeimg.com/60/150/people',
  fullName: 'Developer',
} as Partial<Developer_avatar>;

createFragmentContainer(() => null, {
  shared: graphql`
    fragment Developer_shared on Developer @relay(mask: false) {
      damage {
        min
        max
      }
      hp
      ...Developer_avatar @relay(mask: false)
    }
  `,
});

createFragmentContainer(DeveloperAvatar, {
  avatar: graphql`
    fragment Developer_avatar on Developer @relay(mask: false) {
      avatarUrl
      fullName
    }
  `,
});
