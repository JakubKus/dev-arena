import 'components/arena/arena.scss';
import { BattleSummary } from 'components/arena/battle-summary/BattleSummary';
import { HomeButton } from 'components/home-button/HomeButton';
import { Developer } from 'features/developer/Developer';
import { selectDeveloperHp } from 'features/developer/developerSlice';
import { Enemy } from 'features/enemy/Enemy';
import { selectEnemyHp } from 'features/enemy/enemySlice';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const Arena: React.FC = () => {
  const [hasBattleEnded, setHasBattleEnded] = useState(false);
  const developerHp = useSelector(selectDeveloperHp);
  const enemyHp = useSelector(selectEnemyHp);
  const arenaRef = useRef<HTMLDivElement>(null);
  const arenaWidth = arenaRef.current?.clientWidth ?? 300;

  useEffect(() => {
    if (developerHp !== null && enemyHp !== null && (developerHp <= 0 || enemyHp <= 0)) {
      const timeout = setTimeout(() => setHasBattleEnded(true), developerHp > enemyHp ? 700 : 1000);
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
