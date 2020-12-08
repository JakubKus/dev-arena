import { useMutation } from '@apollo/client';
import {
  battleComboQuery,
  battlePlayerQuery,
  battleWonQuery,
} from 'components/arena/battle-summary/battle-summary-queries';
import 'components/arena/battle-summary/battle-summary.scss';
import { comboTime, comboTimeVariables } from 'components/arena/battle-summary/gql-types/comboTime';
import {
  updateVictoriousPlayer,
  updateVictoriousPlayerVariables,
} from 'components/arena/battle-summary/gql-types/updateVictoriousPlayer';
import { wonFight, wonFightVariables } from 'components/arena/battle-summary/gql-types/wonFight';
import { resetDeveloper, selectDeveloperHp } from 'features/developer/developerSlice';
import { resetEnemy } from 'features/enemy/enemySlice';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes';

export const BattleSummary: React.FC<{ resetFight: () => void }> = ({ resetFight }) => {
  const developerHp = useSelector(selectDeveloperHp) ?? 0;
  const cashReward = Math.floor(Math.random() * 40) + 30;
  const player = useSelector(selectPlayer);
  const [playerWon, setPlayerWon] = useState(false);
  const dispatch = useDispatch();
  const [mutateComboTimes] = useMutation<wonFight, wonFightVariables>(battleComboQuery);
  const [mutateWonFights] = useMutation<comboTime, comboTimeVariables>(battleWonQuery);
  const [mutatePlayer] = useMutation<updateVictoriousPlayer, updateVictoriousPlayerVariables>(battlePlayerQuery);
  useEffect(() => {
    if (developerHp > 0) {
      setPlayerWon(true);
      const incrementedWonFights = player.wonFights + 1;
      dispatch(updatePlayer({
        cash: player.cash + cashReward,
        wonFights: incrementedWonFights,
      }));
      mutateComboTimes({ variables: { nick: player.nickname as string, value: player.fastestCombo as number } });
      mutateWonFights({ variables: { nick: player.nickname as string, value: player.fastestCombo as number } });
      mutatePlayer({
        variables: {
          nick: player.nickname as string,
          cash: player.fastestCombo as number,
          combo: player.fastestCombo as number,
          fights: incrementedWonFights,
        },
      });
    } else {
      setPlayerWon(false);
    }
    dispatch(resetDeveloper());
    dispatch(resetEnemy());
  }, [dispatch, updatePlayer, resetEnemy, resetDeveloper]);

  return (
    <div className="battle-summary">
      {playerWon ? (
        <>
          <p className="battle-summary__text">Congrats, you won, cash gained: ${cashReward}</p>
          <p className="battle-summary__text">
            Your best combo time was: {player.fastestCombo ? `${(player.fastestCombo / 1000).toFixed(3)}s!` : '??'}</p>
        </>
      ) : (
        <p className="battle-summary__text">You lost, but it was probably just an unlucky fight 😉</p>
      )}
      <div className="battle-summary__links">
        <button className="battle-summary__link" onClick={resetFight}>Fight again!</button>
        <Link className="battle-summary__link" to={ROUTE.home}>Go home</Link>
        {playerWon ? <Link className="battle-summary__link" to={ROUTE.shop}>Go to shop</Link> : null}
      </div>
    </div>
  );
};
