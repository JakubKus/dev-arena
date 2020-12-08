import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader/Loader';
import { developer, developerVariables } from 'features/developer/gql-types/developer';
import { developerClothing, developerClothingVariables } from 'features/developer/gql-types/developerClothing';
import { AttackArrows } from 'features/developer/attack-arrows/AttackArrows';
import { developerClothingQuery, developerQuery } from 'features/developer/developer-queries';
import 'features/developer/developer.scss';
import { initializeDeveloper, selectDeveloperHit, selectDeveloperHp } from 'features/developer/developerSlice';
import { hitEnemy } from 'features/enemy/enemySlice';
import { selectPlayer } from 'features/player/playerSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Developer: React.FC<{ arenaWidth: number }> = ({ arenaWidth }) => {
  const [developerHp, setDeveloperHp] = useState<number | null>(null);
  const currentDevHp = useSelector(selectDeveloperHp);
  const developerHit = useSelector(selectDeveloperHit);
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const { chosenDevName } = useSelector(selectPlayer);
  const weaponRef = useRef<HTMLImageElement>(null);
  const developerRef = useRef<HTMLImageElement>(null);
  const hpLossRef = useRef<HTMLElement>(null);
  const [attackDistance, setAttackDistance] = useState(arenaWidth);

  const { data: devData, loading: devLoading } = useQuery<developer, developerVariables>(
    developerQuery,
    { variables: { name: chosenDevName }, fetchPolicy: 'network-only' },
  );
  const { data: clothingData, loading: clothingLoading } = useQuery<developerClothing, developerClothingVariables>(
    developerClothingQuery,
    { variables: { clothingIds: player.equippedIds }, fetchPolicy: 'network-only' },
  );

  const calculateAttackDistance = () => setAttackDistance(arenaWidth - (developerRef.current?.clientWidth ?? 50));

  useEffect(() => {
    if (devData?.developer?.hp) {
      setDeveloperHp(devData.developer.hp);
      dispatch(initializeDeveloper({
        hp: devData.developer.hp,
        damage: devData.developer.damage,
      }));
    }
  }, [devData]);

  useEffect(() => {
    if (developerHit) {
      hpLossRef.current?.animate([
        { opacity: 1 },
        { opacity: 1, transform: 'translateY(-100%)' },
      ], { duration: 500, delay: 900 });
      const timeout = setTimeout(() => currentDevHp && setDeveloperHp(currentDevHp), 900);
      return () => clearTimeout(timeout);
    }
  }, [developerHit, currentDevHp]);

  const clothing: { top?: string, middle?: string, bottom?: string } = {};
  clothingData?.clothing?.forEach((x) => {
    if (x?.bodyPart) clothing[x.bodyPart] = x.imageUrl;
  });

  const hitEnemyRandomDmg = () => {
    const { min, max } = devData?.developer?.damage ?? { min: 0, max: 0 };
    const randomDmg = Math.ceil(Math.random() * max + min);
    dispatch(hitEnemy(randomDmg));
    weaponRef.current?.animate([
      { opacity: 1 },
      { opacity: 1, transform: `translate(${attackDistance}px, -50%) rotate(1turn)` },
    ], { duration: 800 });
  };
  if (devLoading || clothingLoading) return <Loader />;

  return (
    <>
      <div className="developer">
        <img src={devData?.developer?.avatarUrl} alt="developer" ref={developerRef} onLoad={calculateAttackDistance} />
        {clothing.top && <img
          className="developer__clothing developer__clothing--top"
          src={clothing.top}
          alt="top clothing" />
        }
        {clothing.bottom && <img
          className="developer__clothing developer__clothing--bottom"
          src={clothing.bottom}
          alt="bottom clothing" />
        }
        {clothing.middle && <img
          className="developer__clothing developer__clothing--middle"
          src={clothing.middle}
          alt="middle clothing" />
        }
        <img className="developer__weapon" src={devData?.developer?.weaponUrl} alt="weapon" ref={weaponRef} />
        <span className="developer__hp">{`${developerHp} ❤`}</span>
        <span className="developer__hp developer__hp-loss" ref={hpLossRef}>{`- ${developerHit}`}</span>
      </div>
      <AttackArrows hitEnemy={hitEnemyRandomDmg} />
    </>
  );
};
