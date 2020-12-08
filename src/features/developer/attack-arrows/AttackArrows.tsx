import { Loader } from 'components/loader/Loader';
import {
  ARROW_DIRECTIONS,
  ARROW_SYMBOLS,
  ARROWS_NUMBER,
  COMBO_PENALTY_MS,
} from 'features/developer/attack-arrows/arrow-consts';
import 'features/developer/attack-arrows/attack-arrows.scss';
import { selectDeveloperDamage, selectDeveloperHp } from 'features/developer/developerSlice';
import { hitEnemy, selectEnemyHp } from 'features/enemy/enemySlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayer } from 'features/player/playerSlice';

export const AttackArrows: React.FC<{ hitEnemy: () => void }> = ({ hitEnemy }) => {
  const [arrows, setArrows] = useState<{ key: string, visible: boolean }[]>([]);
  const [arrowIndex, setArrowIndex] = useState(0);
  const [comboStartTimestamp, setComboStartTimestamp] = useState(0);
  const [fastestCombo, setFastestCombo] = useState<number>(Number.MAX_SAFE_INTEGER);
  const developerHp = useSelector(selectDeveloperHp);
  const enemyHp = useSelector(selectEnemyHp);
  const dispatch = useDispatch();
  const comboRef = useRef<HTMLElement>(null);

  const prepareNonRepetitiveArrows = () => {
    const _arrows = Math.random().toString().split('').slice(2, ARROWS_NUMBER + 2).map(Number);
    _arrows.length = ARROWS_NUMBER;
    for (let i = 0, previous = 0; i < ARROWS_NUMBER; i++) {
      const shift = _arrows[i] % 3 + 1 || 1;
      _arrows[i] = previous = (previous + shift) % 4;
    }
    return _arrows.map((x) => ({ key: ARROW_DIRECTIONS[x], visible: true }));
  };

  const addComboPenalty = () => setComboStartTimestamp((prev) => prev - COMBO_PENALTY_MS);
  const hideNextArrow = () => {
    const oneArrowHidden = arrows;
    oneArrowHidden[arrowIndex].visible = false;
    setArrows(oneArrowHidden);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key !== arrows[arrowIndex].key) {
      addComboPenalty();
      return;
    }
    if (arrowIndex === 0) setComboStartTimestamp(Date.now());

    hideNextArrow();

    if (arrowIndex < ARROWS_NUMBER - 1) {
      setArrowIndex((prev) => prev + 1);
    } else {
      const newCombo = Date.now() - comboStartTimestamp;
      setArrowIndex(0);
      setArrows(prepareNonRepetitiveArrows());
      if (newCombo < fastestCombo) {
        dispatch(updatePlayer({ fastestCombo: newCombo }));
        setFastestCombo(newCombo);
        showNewFastestCombo();
      }
      hitEnemy();
    }
  };

  const showNewFastestCombo = () => {
    comboRef.current?.animate([
      { opacity: 1 },
      { opacity: 1, transform: 'translateY(-50%)' },
    ], { duration: 500 });
  };

  useEffect(() => {
    setArrows(prepareNonRepetitiveArrows());
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => document.removeEventListener('keydown', handleKeyPress, false);
  }, [handleKeyPress]);

  if (!developerHp || !enemyHp) return <Loader />;
  return (
    <>
      <div className='arrows' title="use a keyboard!">
        <span className="combo" ref={comboRef}>{`${(fastestCombo / 1000).toFixed(3)}s`}</span>
        {arrows.map(({ key, visible }) => (
          <span className="arrows__arrow"
                style={{ visibility: visible ? 'visible' : 'hidden' }}>{ARROW_SYMBOLS[key]}</span>
        ))}
      </div>
    </>
  );
};
