import { useQuery } from '@apollo/client';
import { DeveloperClothing } from 'components/developer-clothing/DeveloperClothing';
import { Loader } from 'components/loader/Loader';
import { AttackArrows } from 'features/developer/attack-arrows/AttackArrows';
import { developerClothingQuery, developerQuery } from 'features/developer/developer-queries';
import 'features/developer/developer.scss';
import { initializeDeveloper, selectDeveloperHit, selectDeveloperHp } from 'features/developer/developerSlice';
import { developer, developerVariables } from 'features/developer/gql-types/developer';
import { developerClothing, developerClothingVariables } from 'features/developer/gql-types/developerClothing';
import { hitEnemy } from 'features/enemy/enemySlice';
import { selectPlayer } from 'features/player/playerSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEV_ATTACK_DURATION, ENEMY_ATTACK_DURATION, HP_LOSS_DURATION } from 'shared';

export const Developer: React.FC<{ arenaWidth: number }> = ({ arenaWidth }) => {
  const dispatch = useDispatch();
  const currentDevHp = useSelector(selectDeveloperHp);
  const developerHit = useSelector(selectDeveloperHit);
  const player = useSelector(selectPlayer);
  const [developerHp, setDeveloperHp] = useState<number | null>(null);
  const [attackDistance, setAttackDistance] = useState(0);
  const weaponRef = useRef<HTMLImageElement>(null);
  const developerRef = useRef<HTMLImageElement>(null);
  const hpLossRef = useRef<HTMLElement>(null);

  const { data: devData, loading: devLoading } = useQuery<developer, developerVariables>(
    developerQuery,
    { variables: { name: player.chosenDevName }, fetchPolicy: 'network-only' },
  );
  const { data: clothingData, loading: clothingLoading } = useQuery<developerClothing, developerClothingVariables>(
    developerClothingQuery,
    { variables: { clothingIds: player.equippedIds }, fetchPolicy: 'network-only' },
  );

  const calculateAttackDistance = () => setAttackDistance(arenaWidth - (developerRef.current?.clientWidth ?? 0));

  useEffect(() => {
    if (devData?.developer?.hp) {
      setDeveloperHp(devData.developer.hp);
      dispatch(initializeDeveloper({
        hp: devData.developer.hp,
        damage: devData.developer.damage,
      }));
    }
  }, [devData, dispatch]);

  useEffect(() => {
    if (developerHit) {
      hpLossRef.current?.animate([
        { opacity: 1 },
        { opacity: 1, transform: 'translateY(-100%)' },
      ], { duration: HP_LOSS_DURATION, delay: .75 * ENEMY_ATTACK_DURATION });
      const timeout = setTimeout(() => currentDevHp && setDeveloperHp(currentDevHp), .75 * ENEMY_ATTACK_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [developerHit, currentDevHp]);

  const hitEnemyRandomDmg = () => {
    const { min, max } = devData?.developer?.damage ?? { min: 0, max: 0 };
    const randomDmg = Math.ceil(Math.random() * max + min);
    dispatch(hitEnemy(randomDmg));
    weaponRef.current?.animate([
      { opacity: 1 },
      { opacity: 1, transform: `translate(${attackDistance}px, -50%) rotate(1turn)` },
    ], { duration: DEV_ATTACK_DURATION });
  };
  if (devLoading || clothingLoading) return <Loader />;

  return <>
    <div className="developer">
      <img src={devData?.developer?.avatarUrl} alt="developer" ref={developerRef} onLoad={calculateAttackDistance} />
      <DeveloperClothing clothing={clothingData?.clothing} />
      <img className="developer__weapon" src={devData?.developer?.weaponUrl} alt="weapon" ref={weaponRef} />
      <span className="developer__hp">{`${developerHp} ❤`}</span>
      <span className="developer__hp developer__hp-loss" ref={hpLossRef}>{`- ${developerHit}`}</span>
    </div>
    <AttackArrows hitEnemy={hitEnemyRandomDmg} />
  </>;
};
