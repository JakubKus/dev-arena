import { useQuery } from '@apollo/client';
import { comboTimes } from 'components/highscores/gql-types/comboTimes';
import { wonFights } from 'components/highscores/gql-types/wonFights';
import { comboTimesQuery, wonFightsQuery } from 'components/highscores/highscores-queries';
import 'components/highscores/highscores.scss';
import { HomeButton } from 'components/home-button/HomeButton';
import { Loader } from 'components/loader/Loader';
import React from 'react';

export const Highscores: React.FC = () => {
  const comboTimes = useQuery<comboTimes>(comboTimesQuery);
  const wonFights = useQuery<wonFights>(wonFightsQuery);
  if (comboTimes.loading || wonFights.loading) return <Loader />;

  return <>
    <HomeButton />
    <div className="highscores">
      <h2 className="highscores__section-title">Best combo times</h2>
      {comboTimes?.data?.comboTimes?.map((x) => (
        <div className="highscores__section">
          <span className="highscore highscore--nick">{x?.nickname}</span>
          <span className="highscore">{x?.value ? `${(x?.value / 1000).toFixed(3)}s` : '-'}</span>
          <span className="highscore">{new Date(x?.establishedOn).toLocaleDateString()}</span>
        </div>
      ))}
      <h2 className="highscores__section-title">Most won fights</h2>
      {wonFights?.data?.wonFights?.map((x) => (
        <div className="highscores__section">
          <span className="highscore highscore--nick">{x?.nickname}</span>
          <span className="highscore">{x?.value}</span>
          <span className="highscore">{new Date(x?.establishedOn).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  </>;
};
