import { useQuery } from '@apollo/client';
import { DeveloperClothing } from 'components/developer-clothing/DeveloperClothing';
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
import { toSecWithMs } from 'shared';

export const Profile: React.FC = () => {
  const player = useSelector(selectPlayer);
  const { data: developerData, loading: developerLoading } = useQuery<profileDeveloper, profileDeveloperVariables>(
    profileDeveloperQuery, {
      variables: { name: player.chosenDevName },
    });

  const { data: playerData, loading: playerLoading } = useQuery<profilePlayer, profilePlayerVariables>(
    profilePlayerQuery, {
      variables: { email: player.email as string },
      fetchPolicy: 'no-cache',
    });

  const { data: clothingData, loading: clothingLoading } = useQuery<profileClothing, profileClothingVariables>(
    profileClothingQuery, {
      variables: { clothingIds: player.equippedIds },
    });

  if (developerLoading || playerLoading || clothingLoading) return <Loader />;
  const formatComboTime = (time: number) => time ? toSecWithMs(time) : '-';

  return <>
    <HomeButton />
    <div className="profile">
      <div className="profile__avatar">
        <img src={developerData?.developer?.avatarUrl} alt={player.chosenDevName ?? 'developer'} />
        <DeveloperClothing clothing={clothingData?.clothing} />
      </div>
      <p className="profile__text">{player.nickname}</p>
      <p className="profile__text">Cash: ${playerData?.player?.cash}</p>
      <p className="profile__text">Total won fights: {playerData?.player?.wonFights}</p>
      <p className="profile__text">
        Fastest combo: {playerData?.player?.comboTime && formatComboTime(playerData.player.comboTime)}
      </p>
    </div>
  </>;
};
