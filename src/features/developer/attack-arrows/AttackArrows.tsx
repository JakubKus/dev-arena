import { Loader } from 'components/loader/Loader';
import {
  ARROW_DIRECTIONS,
  ARROW_SYMBOLS,
  ARROWS_NUMBER,
  COMBO_PENALTY_MS,
} from 'features/developer/attack-arrows/arrow-consts';
import 'features/developer/attack-arrows/attack-arrows.scss';
import { selectDeveloperHp } from 'features/developer/developerSlice';
import { selectEnemyHp } from 'features/enemy/enemySlice';
import { updatePlayer } from 'features/player/playerSlice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toSecWithMs } from 'shared';

export const AttackArrows: React.FC<{ hitEnemy: () => void }> = ({ hitEnemy }) => {
  const dispatch = useDispatch();
  const developerHp = useSelector(selectDeveloperHp);
  const enemyHp = useSelector(selectEnemyHp);
  const comboRef = useRef<HTMLElement>(null);
  const [arrows, setArrows] = useState<{ key: string, visible: boolean }[]>([]);
  const [arrowIndex, setArrowIndex] = useState(0);
  const [comboStartTimestamp, setComboStartTimestamp] = useState(0);
  const [fastestCombo, setFastestCombo] = useState(Number.MAX_SAFE_INTEGER);

  const prepareNonRepetitiveArrows = () => {
    const nonRepetitiveArrows = Math.random().toString().split('').slice(2, ARROWS_NUMBER + 2).map(Number);
    nonRepetitiveArrows.length = ARROWS_NUMBER;
    for (let i = 0, previous = 0; i < ARROWS_NUMBER; i++) {
      const shift = nonRepetitiveArrows[i] % 3 + 1 || 1;
      nonRepetitiveArrows[i] = previous = (previous + shift) % 4;
    }
    return nonRepetitiveArrows.map((x) => ({ key: ARROW_DIRECTIONS[x], visible: true }));
  };

  const addComboPenalty = () => setComboStartTimestamp((prev) => prev - COMBO_PENALTY_MS);

  const hideNextArrow = useCallback(() => {
    const oneArrowHidden = arrows;
    oneArrowHidden[arrowIndex].visible = false;
    setArrows(oneArrowHidden);
  }, [arrowIndex, arrows]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
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
  }, [arrowIndex, arrows, comboStartTimestamp, dispatch, fastestCombo, hideNextArrow, hitEnemy]);

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
  const comboTime = toSecWithMs(fastestCombo);

  return <>
    <div className='arrows' title="use a keyboard!">
      <span className="combo" ref={comboRef}>{comboTime}</span>
      {arrows.map(({ key, visible }, index) => (
        <span className="arrows__arrow"
              key={index}
              style={{ visibility: visible ? 'visible' : 'hidden' }}>{ARROW_SYMBOLS[key]}</span>
      ))}
    </div>
  </>;
};
