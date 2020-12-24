import { Clothing, ClothingInput } from 'components/developer-clothing/developer-clothing-model';
import 'components/developer-clothing/developer-clothing.scss';
import React, { useEffect, useState } from 'react';

export const DeveloperClothing: React.FC<ClothingInput> = props => {
  const [clothing, setClothing] = useState<Clothing>();
  useEffect(() => {
    props.clothing?.forEach(x => x && setClothing(prev => ({ ...prev, [x.bodyPart]: x.imageUrl })));
  }, [props.clothing]);

  return <>
    {clothing?.top && <img className="clothing clothing--top" src={clothing.top} alt="top clothing" />}
    {clothing?.middle && <img className="clothing clothing--middle" src={clothing.middle} alt="middle clothing" />}
    {clothing?.bottom && <img className="clothing clothing--bottom" src={clothing.bottom} alt="bottom clothing" />}
  </>;
};
