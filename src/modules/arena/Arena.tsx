import React, { FC, useContext } from 'react';
import { RouteContext } from '../../shared/reducers/route-reducer/route-reducer';
import { QueryRenderer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { environment } from '../../shared/environment/Environment';
import { ArenaQuery, ArenaQueryVariables } from './__generated__/ArenaQuery.graphql';
import { DeveloperAvatar } from '../../shared/developer/Developer';
import { EnemyAvatar } from './enemy/Enemy';
import { ClothingImage } from '../../shared/clothing/Clothing';

export const Arena: FC = () => {
  const { state, dispatch } = useContext(RouteContext);
  return (
    <QueryRenderer<ArenaQuery>
      environment={environment}
      query={arenaQuery}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>{error.message}</div>;
        if (props && props.developer && props.clothing && props.enemy) {
          const { developer, enemy, clothing } = props;
          return (
            <div className='arenaDev'>
              <DeveloperAvatar
                avatarUrl={developer?.avatarUrl} fullName={developer?.fullName}
              />
              <EnemyAvatar avatarUrl={enemy?.avatarUrl} name={enemy?.name} />
              {clothing?.map(x => (
                x && <ClothingImage imageUrl={x?.imageUrl} name={x?.name} />
              ))}
            </div>
          )
        }
        return <div>Loading...</div>;
      }}
    />
  );
};

const arenaQuery = graphql`
  query ArenaQuery($devId: ID!, $enemyId: ID!, $clothingIds: [ID]!) {
    developer(id: $devId) {
      weaponUrl
      ...Developer_shared @relay(mask: false)
    }
    enemy(id: $enemyId) {
      ...Enemy_enemy @relay(mask: false)
    }
    clothing(ids: $clothingIds) {
      bodyPart
      ...Clothing_image @relay(mask: false)
    }
  }
`;

const variables: ArenaQueryVariables = {
  devId: '7cdd1f3e-2e98-4ce0-9434-bbf005df9323',
  enemyId: '344e501e-bdfa-41db-923f-c6bba2361b5c',
  clothingIds: ['ce276ec1-3725-4b5e-b00f-4afefe99d757']
};
