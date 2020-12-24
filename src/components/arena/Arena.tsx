import 'components/arena/arena.scss';
import { BattleSummary } from 'components/arena/battle-summary/BattleSummary';
import { HomeButton } from 'components/home-button/HomeButton';
import { Developer } from 'features/developer/Developer';
import { selectDeveloperHp } from 'features/developer/developerSlice';
import { Enemy } from 'features/enemy/Enemy';
import { selectEnemyHp } from 'features/enemy/enemySlice';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DEV_ATTACK_DURATION, ENEMY_ATTACK_DURATION } from 'shared';

export const Arena: React.FC = () => {
  const developerHp = useSelector(selectDeveloperHp);
  const enemyHp = useSelector(selectEnemyHp);
  const arenaRef = useRef<HTMLDivElement>(null);
  const arenaWidth = arenaRef.current?.clientWidth ?? 0;
  const [hasBattleEnded, setHasBattleEnded] = useState(false);

  useEffect(() => {
    if (developerHp !== null && enemyHp !== null && (developerHp <= 0 || enemyHp <= 0)) {
      const fightEndDelay = developerHp > enemyHp ? .85 * DEV_ATTACK_DURATION : .85 * ENEMY_ATTACK_DURATION;
      const timeout = setTimeout(() => setHasBattleEnded(true), fightEndDelay);
      return () => clearTimeout(timeout);
    }
  }, [developerHp, enemyHp]);

  if (hasBattleEnded) return <BattleSummary resetFight={() => setHasBattleEnded(false)} />;
  return (
    <div className="arena__container">
      <HomeButton text="Escape 😥" />
      <div className="arena" ref={arenaRef}>
        <Developer arenaWidth={arenaWidth} />
        <Enemy arenaWidth={arenaWidth} />
      </div>
    </div>
  );
};
