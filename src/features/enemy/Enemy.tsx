import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader/Loader';
import { hitDeveloper } from 'features/developer/developerSlice';
import { enemyQuery } from 'features/enemy/enemy-queries';
import 'features/enemy/enemy.scss';
import { initializeEnemy, selectEnemyHit, selectEnemyHp } from 'features/enemy/enemySlice';
import { enemy } from 'features/enemy/gql-types/enemy';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEV_ATTACK_DURATION, ENEMY_ATTACK_DURATION, HP_LOSS_DURATION } from 'shared';

export const Enemy: React.FC<{ arenaWidth: number }> = ({ arenaWidth }) => {
  const { data: enemyData, loading } = useQuery<enemy>(enemyQuery, { fetchPolicy: 'no-cache' });
  const enemyHit = useSelector(selectEnemyHit);
  const currentEnemyHp = useSelector(selectEnemyHp);
  const [enemyHp, setEnemyHp] = useState<number | null>(null);
  const dispatch = useDispatch();
  const enemyRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const hpLossRef = useRef<HTMLElement>(null);
  const [attackDistance, setAttackDistance] = useState(arenaWidth);
  const [randomQuote, setRandomQuote] = useState('');

  const calculateAttackDistance = () => {
    setAttackDistance(arenaWidth - (enemyRef.current?.clientWidth ?? 0) - (quoteRef.current?.clientWidth ?? 0));
  };

  const hitDeveloperRandomDmg = useCallback(() => {
    const { min, max } = enemyData?.randomEnemy?.damage ?? { min: 0, max: 0 };
    const randomDmg = Math.floor(Math.random() * max + min);
    dispatch(hitDeveloper(randomDmg));
    quoteRef.current?.animate([
      { opacity: 1, transform: 'translate(0, -50%)' },
      { opacity: 1, transform: `translate(-${attackDistance}px, -50%)` },
    ], {
      duration: ENEMY_ATTACK_DURATION,
      fill: 'forwards',
    });
  }, [attackDistance, dispatch, enemyData?.randomEnemy?.damage]);

  const setNewRandomQuote = useCallback(() => {
    if (!enemyData?.randomEnemy?.quotes || enemyData.randomEnemy.quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * (enemyData.randomEnemy.quotes.length));
    setRandomQuote(enemyData.randomEnemy.quotes[randomIndex]);
  }, [enemyData?.randomEnemy?.quotes]);

  useEffect(() => {
    if (!enemyData?.randomEnemy?.hp) return;
    dispatch(initializeEnemy({ hp: enemyData.randomEnemy.hp }));
    setEnemyHp(enemyData.randomEnemy.hp);
  }, [enemyData, dispatch]);

  useEffect(() => {
    if (enemyHit) {
      hpLossRef.current?.animate([
        { opacity: 1 },
        { opacity: 1, transform: 'translateY(-100%)' },
      ], { duration: HP_LOSS_DURATION, delay: .75 * DEV_ATTACK_DURATION });
      const timeout = setTimeout(() => currentEnemyHp && setEnemyHp(currentEnemyHp), .75 * DEV_ATTACK_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [enemyHit, currentEnemyHp]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enemyData && attackDistance) {
      interval = setInterval(() => {
        setNewRandomQuote();
        hitDeveloperRandomDmg();
      }, 1000 / (enemyData.randomEnemy?.attackSpeed ?? 0.2));
    }
    return () => clearInterval(interval);
  }, [enemyData, attackDistance, setNewRandomQuote, hitDeveloperRandomDmg]);

  if (loading) return <Loader />;

  return <>
    <div className="enemy">
      <img src={enemyData?.randomEnemy?.avatarUrl} alt="enemy" ref={enemyRef} onLoad={calculateAttackDistance} />
      <span className="enemy__hp">{`${enemyHp} ❤`}</span>
      <span className="enemy__hp enemy__hp-loss" ref={hpLossRef}>{`- ${enemyHit}`}</span>
    </div>
    <p className="quote" ref={quoteRef}>{randomQuote}</p>
  </>;
};
