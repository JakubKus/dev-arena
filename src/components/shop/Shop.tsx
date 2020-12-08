import { useQuery } from '@apollo/client';
import { HomeButton } from 'components/home-button/HomeButton';
import { shopClothing, shopClothing_allClothing } from 'components/shop/gql-types/shopClothing';
import { shopDevelopers, shopDevelopers_allDevelopers } from 'components/shop/gql-types/shopDevelopers';
import { ShopItem } from 'components/shop/shop-item/ShopItem';
import { shopClothingQuery, shopDevelopersQuery } from 'components/shop/shop-queries';
import 'components/shop/shop.scss';
import { selectPlayer } from 'features/player/playerSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Shop: React.FC = () => {
  const player = useSelector(selectPlayer);
  const [boughtClothing, setBoughtClothing] = useState<(shopClothing_allClothing | null)[]>([]);
  const [clothingToBuy, setClothingToBuy] = useState<(shopClothing_allClothing | null)[]>([]);
  const [equippedClothing, setEquippedClothing] = useState<(shopClothing_allClothing | null)[]>([]);
  const [boughtDevelopers, setBoughtDevelopers] = useState<(shopDevelopers_allDevelopers | null)[]>([]);
  const [developersToBuy, setDevelopersToBuy] = useState<(shopDevelopers_allDevelopers | null)[]>([]);
  const [chosenDeveloper, setChosenDeveloper] = useState<shopDevelopers_allDevelopers | null>(null);
  const clothing = useQuery<shopClothing>(shopClothingQuery);
  const developers = useQuery<shopDevelopers>(shopDevelopersQuery);

  useEffect(() => {
    if (clothing?.data && developers?.data && player) {
      const filteredClothing = clothing.data.allClothing && [...clothing.data.allClothing];
      const filteredBoughtClothing: (shopClothing_allClothing | null)[] = [];
      const _equippedClothing: (shopClothing_allClothing | null)[] = [];

      const filteredDevelopers = developers.data.allDevelopers && [...developers.data.allDevelopers];
      const filteredBoughtDevelopers: (shopDevelopers_allDevelopers | null)[] = [];
      let _chosenDeveloper: shopDevelopers_allDevelopers | null;

      player.boughtIds.forEach(x => {
        const clothingIndex = filteredClothing?.findIndex(y => y?.id === x) ?? -1;
        if (clothingIndex >= 0) {
          filteredClothing && filteredBoughtClothing.push(filteredClothing[clothingIndex]);
          filteredClothing?.splice(clothingIndex, 1);
        } else {
          const developerIndex = filteredDevelopers?.findIndex(y => y?.id === x) ?? -1;
          filteredDevelopers && filteredBoughtDevelopers.push(filteredDevelopers[developerIndex]);
          developerIndex >= 0 && filteredDevelopers?.splice(developerIndex, 1);
        }
      });

      player.equippedIds.forEach(x => {
        const boughtClothingIndex = filteredBoughtClothing?.findIndex(y => y?.id == x) ?? -1;
        filteredBoughtClothing && _equippedClothing.push(filteredBoughtClothing[boughtClothingIndex]);
        boughtClothingIndex >= 0 && filteredBoughtClothing?.splice(boughtClothingIndex, 1);
      });

      const chosenDevIndex = filteredBoughtDevelopers?.findIndex(x => x?.name === player.chosenDevName) ?? -1;
      console.log(filteredBoughtDevelopers);
      _chosenDeveloper = filteredBoughtDevelopers ? filteredBoughtDevelopers[chosenDevIndex] : null;
      chosenDevIndex >= 0 && filteredBoughtDevelopers.splice(chosenDevIndex, 1);

      setClothingToBuy(filteredClothing ?? []);
      setDevelopersToBuy(filteredDevelopers ?? []);
      setBoughtClothing(filteredBoughtClothing ?? []);
      setBoughtDevelopers(filteredBoughtDevelopers ?? []);
      setEquippedClothing(_equippedClothing);
      setChosenDeveloper(_chosenDeveloper);
    }
  }, [clothing.data, developers.data, player]);

  return (
    <div className="shop">
      <HomeButton />
      <div className="shop__items">
        {(clothingToBuy.length > 0 || developersToBuy.length > 0) && <>
          <h2 className="shop__section-title">To buy</h2>
          <div className="shop__section">
            {clothingToBuy.map(x => (
              <ShopItem type="Buy"
                        key={x?.id}
                        data={{ imageUrl: x?.imageUrl, name: x?.name, price: x?.price, id: x?.id }} />
            ))}
            {developersToBuy.map(x => (
              <ShopItem type="Buy"
                        key={x?.id}
                        data={{ imageUrl: x?.avatarUrl, name: x?.name, price: x?.price, id: x?.id }} />
            ))}
          </div>
        </>}
        {(boughtClothing.length > 0 || boughtDevelopers.length > 0) && <>
          <h2 className="shop__section-title">Bought</h2>
          <div className="shop__section">
            {boughtClothing.map(x => (
              <ShopItem type="Equip" key={x?.id} data={{ imageUrl: x?.imageUrl, name: x?.name, id: x?.id }} />
            ))}
            {boughtDevelopers.map(x => (
              <ShopItem type="Pick" key={x?.id} data={{ imageUrl: x?.avatarUrl, name: x?.name, id: x?.id }} />
            ))}
          </div>
        </>}
        <h2 className="shop__section-title">Equipped or picked</h2>
        <div className="shop__section">
          {equippedClothing.map(x => (
            <ShopItem type="Unequip" key={x?.id} data={{ imageUrl: x?.imageUrl, name: x?.name, id: x?.id }} />
          ))}
          <ShopItem type="Picked" data={{ imageUrl: chosenDeveloper?.avatarUrl, name: chosenDeveloper?.name }} />
        </div>
      </div>
      <span className="shop__balance">{`cash: $${player.cash}`}</span>
    </div>
  );
};
