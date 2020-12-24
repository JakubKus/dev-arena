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
import { selectGuest } from 'features/auth/authSlice';
import { resetDeveloper } from 'features/developer/developerSlice';
import { resetEnemy, selectEnemyHp } from 'features/enemy/enemySlice';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes';
import { toSecWithMs } from 'shared';

export const BattleSummary: React.FC<{ resetFight: () => void }> = ({ resetFight }) => {
  const dispatch = useDispatch();
  const isGuest = useSelector(selectGuest);
  const enemyHp = useSelector(selectEnemyHp);
  const player = useSelector(selectPlayer);
  const [playerWon, setPlayerWon] = useState(false);
  const [cashReward, setCashReward] = useState<number>(0);
  const [mutateComboTimes] = useMutation<wonFight, wonFightVariables>(battleComboQuery);
  const [mutateWonFights] = useMutation<comboTime, comboTimeVariables>(battleWonQuery);
  const [mutatePlayer] = useMutation<updateVictoriousPlayer, updateVictoriousPlayerVariables>(battlePlayerQuery);

  const updateData = useCallback((random30To70: number) => {
    if (player.nickname && player.fastestCombo && player.cash && player.wonFights) {
      dispatch(updatePlayer({
        cash: player.cash + random30To70,
        wonFights: player.wonFights + 1,
      }));

      mutateComboTimes({ variables: { nick: player.nickname, value: player.fastestCombo } });
      mutateWonFights({ variables: { nick: player.nickname, value: player.wonFights + 1 } });
      mutatePlayer({
        variables: {
          nick: player.nickname,
          cash: player.cash + random30To70,
          combo: player.fastestCombo,
          fights: player.wonFights + 1,
        },
      });
    }
  }, [player, dispatch, mutateComboTimes, mutatePlayer, mutateWonFights]);

  useEffect(() => {
    if (!enemyHp) return;
    if (enemyHp <= 0) {
      setPlayerWon(true);
      if (isGuest) return;
      const random30To70 = Math.floor(Math.random() * 40) + 30;
      updateData(random30To70);
      setCashReward(random30To70);
    } else setPlayerWon(false);

    dispatch(resetDeveloper());
    dispatch(resetEnemy());
  }, [dispatch, updateData, enemyHp, isGuest]);

  const cashIfPlayer = isGuest ? '!' : `, cash gained: $${cashReward}`;
  const playerFastestCombo = player.fastestCombo ? `${toSecWithMs(player.fastestCombo)}!` : '??';

  return (
    <div className="battle-summary">
      {playerWon ? (
        <>
          <p className="battle-summary__text">Congrats, you won{cashIfPlayer}</p>
          <p className="battle-summary__text">Your best combo time was: {playerFastestCombo}</p>
        </>
      ) : (
        <p className="battle-summary__text">You lost, but it was probably just an unlucky fight 😉</p>
      )}
      <div className="battle-summary__links">
        <button className="battle-summary__link" onClick={resetFight}>Fight again!</button>
        <Link className="battle-summary__link" to={ROUTE.home}>Go home</Link>
        {playerWon && !isGuest ? <Link className="battle-summary__link" to={ROUTE.shop}>Go to shop</Link> : null}
      </div>
    </div>
  );
};
