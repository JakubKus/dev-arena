import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader/Loader';
import { hitDeveloper } from 'features/developer/developerSlice';
import { enemy } from 'features/enemy/gql-types/enemy';
import { enemyQuery } from 'features/enemy/enemy-queries';
import 'features/enemy/enemy.scss';
import { initializeEnemy, selectEnemyHit, selectEnemyHp } from 'features/enemy/enemySlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    setAttackDistance(arenaWidth - (enemyRef.current?.clientWidth ?? 50) - (quoteRef.current?.clientWidth ?? 100));
  };

  const hitDeveloperRandomDmg = () => {
    const { min, max } = enemyData?.randomEnemy?.damage ?? { min: 0, max: 0 };
    const randomDmg = Math.floor(Math.random() * max + min);
    dispatch(hitDeveloper(randomDmg));
    quoteRef.current?.animate([
      { opacity: 1 },
      { opacity: 1, transform: `translate(-${attackDistance}px, -50%)` },
    ], {
      duration: 1200,
    });
  };

  const setNewRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * (enemyData?.randomEnemy?.quotes?.length ?? 0));
    setRandomQuote(enemyData?.randomEnemy?.quotes[randomIndex] as string);
  };

  useEffect(() => {
    if (enemyData?.randomEnemy?.hp) {
      dispatch(initializeEnemy({ hp: enemyData.randomEnemy.hp }));
      setEnemyHp(enemyData.randomEnemy.hp);
    }
  }, [enemyData]);

  useEffect(() => {
    if (enemyHit) {
      hpLossRef.current?.animate([
        { opacity: 1 },
        { opacity: 1, transform: 'translateY(-100%)' },
      ], { duration: 500, delay: 600 });
      const timeout = setTimeout(() => currentEnemyHp && setEnemyHp(currentEnemyHp), 600);
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
  }, [enemyData, attackDistance]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="enemy">
        <img src={enemyData?.randomEnemy?.avatarUrl} alt="enemy" ref={enemyRef} onLoad={calculateAttackDistance} />
        <span className="enemy__hp">{`${enemyHp} ❤`}</span>
        <span className="enemy__hp enemy__hp-loss" ref={hpLossRef}>{`- ${enemyHit}`}</span>
      </div>
      <p className="quote" ref={quoteRef}>{randomQuote}</p>
    </>
  );
};
