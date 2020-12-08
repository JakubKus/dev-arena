import { useQuery } from '@apollo/client';
import { HomeButton } from 'components/home-button/HomeButton';
import { Loader } from 'components/loader/Loader';
import { profileClothing, profileClothingVariables } from 'components/profile/gql-types/profileClothing';
import { profileDeveloper, profileDeveloperVariables } from 'components/profile/gql-types/profileDeveloper';
import { profilePlayer, profilePlayerVariables } from 'components/profile/gql-types/profilePlayer';
import { profileClothingQuery, profileDeveloperQuery, profilePlayerQuery } from 'components/profile/profile-queries';
import 'components/profile/profile.scss';
import { selectPlayer } from 'features/player/playerSlice';
import React from 'react';
import { useSelector } from 'react-redux';

export const Profile: React.FC = () => {
  const player = useSelector(selectPlayer);
  const { data: developerData, loading: developerLoading } = useQuery<profileDeveloper, profileDeveloperVariables>(
    profileDeveloperQuery, {
      variables: { name: player.chosenDevName },
    });

  const { data: playerData, loading: playerLoading } = useQuery<profilePlayer, profilePlayerVariables>(
    profilePlayerQuery, {
      variables: { email: player.email as string },
    });

  const { data: clothingData, loading: clothingLoading } = useQuery<profileClothing, profileClothingVariables>(
    profileClothingQuery, {
      variables: { clothingIds: player.equippedIds },
    });

  const clothing: { top?: string, middle?: string, bottom?: string } = {};
  clothingData?.clothing?.forEach((x) => {
    if (x?.bodyPart) clothing[x.bodyPart] = x.imageUrl;
  });


  if (developerLoading || playerLoading) return <Loader />;
  return <>
    <HomeButton />
    <div className="profile">
      <div className="profile__avatar">
        <img src={developerData?.developer?.avatarUrl}
             alt={player.chosenDevName ?? 'developer'} />
        {clothing.top && <img
          className="profile__clothing profile__clothing--top"
          src={clothing.top}
          alt="top clothing" />
        }
        {clothing.bottom && <img
          className="profile__clothing profile__clothing--bottom"
          src={clothing.bottom}
          alt="bottom clothing" />
        }
        {clothing.middle && <img
          className="profile__clothing profile__clothing--middle"
          src={clothing.middle}
          alt="middle clothing" />
        }
      </div>
      <p className="profile__text">{player.nickname}</p>
      <p className="profile__text">Cash: ${playerData?.player?.cash}</p>
      <p className="profile__text">Total won fights: {playerData?.player?.wonFights}</p>
      <p className="profile__text">
        Fastest combo: {playerData?.player?.comboTime ? `${playerData?.player?.comboTime / 1000}s` : '-'}</p>
    </div>
  </>;
};
