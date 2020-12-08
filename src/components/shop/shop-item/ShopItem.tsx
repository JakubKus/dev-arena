import { useMutation } from '@apollo/client';
import { equipItem, equipItemVariables } from 'components/shop/gql-types/equipItem';
import { shopChangeDeveloper, shopChangeDeveloperVariables } from 'components/shop/gql-types/shopChangeDeveloper';
import { shopUnequipClothing, shopUnequipClothingVariables } from 'components/shop/gql-types/shopUnequipClothing';
import { shopUpdatePlayer, shopUpdatePlayerVariables } from 'components/shop/gql-types/shopUpdatePlayer';
import { ShopItemData, ShopItemModel } from 'components/shop/shop-item/shop-item-model';
import 'components/shop/shop-item/shop-item.scss';
import {
  equipItemQuery,
  shopChangeDeveloperQuery,
  shopPlayerQuery,
  shopUnequipClothingQuery,
} from 'components/shop/shop-queries';
import { selectPlayer, updatePlayer } from 'features/player/playerSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ShopItem: React.FC<ShopItemModel> = ({ type, ...props }) => {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const [equipItem] = useMutation<equipItem, equipItemVariables>(equipItemQuery);
  const [buy] = useMutation<shopUpdatePlayer, shopUpdatePlayerVariables>(shopPlayerQuery);
  const [unequipClothing] = useMutation<shopUnequipClothing, shopUnequipClothingVariables>(shopUnequipClothingQuery);
  const [changeDeveloper] = useMutation<shopChangeDeveloper, shopChangeDeveloperVariables>(shopChangeDeveloperQuery);

  const handleCta = (data: ShopItemData) => {
    switch (type) {
      case 'Buy':
        handlePurchase(data.id as string, data.price as number);
        break;
      case 'Pick':
        handlePickDeveloper(data.name as string);
        break;
      case 'Unequip':
        handleUnequipItem(data.id as string);
        break;
      default:
        handleEquipItem(data.id as string);
        break;
    }
  };
  const handleEquipItem = async (toEquip: string) => {
    if (player.nickname) {
      const { data } = await equipItem({ variables: { nick: player.nickname, toEquip, equipped: player.equippedIds } });
      dispatch(updatePlayer({ equippedIds: data?.equipItem?.equippedIds }));
    }
  };

  const handleUnequipItem = async (toUnequip: string) => {
    if (player.nickname) {
      const updatedIds = player.equippedIds.filter(x => x !== toUnequip);
      await unequipClothing({ variables: { nick: player.nickname, equippedIds: updatedIds } });
      dispatch(updatePlayer({ equippedIds: updatedIds }));
    }
  };

  const handlePurchase = async (boughtId: string, price: number) => {
    if (player.cash >= price && player.nickname) {
      await buy({
        variables: {
          cash: player.cash - price,
          nick: player.nickname,
          boughtIds: player.boughtIds.concat(boughtId),
        },
      });
      dispatch(updatePlayer({ cash: player.cash - price, boughtIds: player.boughtIds.concat(boughtId) }));
    }
  };

  const handlePickDeveloper = async (devName: string) => {
    if (player.nickname) {
      await changeDeveloper({ variables: { nick: player.nickname, chosenDevName: devName } });
      dispatch(updatePlayer({ chosenDevName: devName }));
    }
  };

  return (
    <div className="shop-item">
      <img className="shop-item__image" src={props.data.imageUrl} alt={props.data.name} />
      <div className="shop-item__details">
        <span className="shop-item__name">{props.data.name}</span>
        {type === 'Buy' && <span className="shop-item__price">${props.data.price}</span>}
      </div>
      {type !== 'Picked' && <button className="shop-item__cta" onClick={() => handleCta(props.data)}>{type}</button>}
    </div>
  );
};
