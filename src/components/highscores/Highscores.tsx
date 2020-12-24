import { useQuery } from '@apollo/client';
import { comboTimes } from 'components/highscores/gql-types/comboTimes';
import { wonFights } from 'components/highscores/gql-types/wonFights';
import { comboTimesQuery, wonFightsQuery } from 'components/highscores/highscores-queries';
import 'components/highscores/highscores.scss';
import { HomeButton } from 'components/home-button/HomeButton';
import { Loader } from 'components/loader/Loader';
import React from 'react';
import { toSecWithMs } from 'shared';

export const Highscores: React.FC = () => {
  const comboTimes = useQuery<comboTimes>(comboTimesQuery, { fetchPolicy: 'network-only' });
  const wonFights = useQuery<wonFights>(wonFightsQuery, { fetchPolicy: 'network-only' });
  if (comboTimes.loading || wonFights.loading) return <Loader />;
  const comboTime = (time: number) => time ? toSecWithMs(time) : '-';

  return <>
    <HomeButton />
    <div className="highscores">
      <h2 className="highscores__section-title">Best combo times</h2>
      {comboTimes?.data?.comboTimes?.map((x, index) => x && (
        <div className="highscores__section" key={index}>
          <span className="highscore highscore--nick">{x.nickname}</span>
          <span className="highscore">{comboTime(x.value)}</span>
          <span className="highscore">{new Date(x.establishedOn).toLocaleDateString()}</span>
        </div>
      ))}
      <h2 className="highscores__section-title">Most won fights</h2>
      {wonFights?.data?.wonFights?.map((x, index) => x && (
        <div className="highscores__section" key={index}>
          <span className="highscore highscore--nick">{x.nickname}</span>
          <span className="highscore">{x.value}</span>
          <span className="highscore">{new Date(x.establishedOn).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  </>;
};
