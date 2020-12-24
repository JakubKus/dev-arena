import { useQuery } from '@apollo/client';
import { HomeButton } from 'components/home-button/HomeButton';
import { Loader } from 'components/loader/Loader';
import { shopClothing, shopClothing_allClothing } from 'components/shop/gql-types/shopClothing';
import { shopDevelopers, shopDevelopers_allDevelopers } from 'components/shop/gql-types/shopDevelopers';
import { ShopItem } from 'components/shop/shop-item/ShopItem';
import { shopClothingQuery, shopDevelopersQuery } from 'components/shop/shop-queries';
import 'components/shop/shop.scss';
import { selectPlayer } from 'features/player/playerSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type ClothingType = shopClothing_allClothing | null;
type DeveloperType = shopDevelopers_allDevelopers | null;
export const Shop: React.FC = () => {
  const player = useSelector(selectPlayer);
  const [clothingToBuy, setClothingToBuy] = useState<(shopClothing_allClothing | null)[]>([]);
  const [developersToBuy, setDevelopersToBuy] = useState<(shopDevelopers_allDevelopers | null)[]>([]);
  const [boughtClothing, setBoughtClothing] = useState<(shopClothing_allClothing | null)[]>([]);
  const [boughtDevelopers, setBoughtDevelopers] = useState<(shopDevelopers_allDevelopers | null)[]>([]);
  const [equippedClothing, setEquippedClothing] = useState<(shopClothing_allClothing | null)[]>([]);
  const [chosenDeveloper, setChosenDeveloper] = useState<shopDevelopers_allDevelopers | null>(null);
  const clothing = useQuery<shopClothing>(shopClothingQuery);
  const developers = useQuery<shopDevelopers>(shopDevelopersQuery);

  const filterAndSetToBuy = useCallback((allItems: { allClothing: ClothingType[], allDevelopers: DeveloperType[] }) => {
    // need to clone, .splice() doesn't work on read-only
    const allClothingWithoutBought = [...allItems.allClothing];
    const allDevelopersWithoutBought = [...allItems.allDevelopers];
    const boughtClothingWithoutEquipped: (shopClothing_allClothing | null)[] = [];
    const boughtDevelopersWithoutPicked: (shopDevelopers_allDevelopers | null)[] = [];

    player.boughtIds.forEach(x => {
      const clothingIndex = allClothingWithoutBought.findIndex(y => y?.id === x) ?? -1;
      if (clothingIndex >= 0 && allClothingWithoutBought) {
        boughtClothingWithoutEquipped.push(allClothingWithoutBought[clothingIndex]);
        allClothingWithoutBought.splice(clothingIndex, 1);
      } else {
        const developerIndex = allDevelopersWithoutBought.findIndex(y => y?.id === x) ?? -1;
        if (developerIndex === -1 || !allDevelopersWithoutBought) return;
        boughtDevelopersWithoutPicked.push(allDevelopersWithoutBought[developerIndex]);
        allDevelopersWithoutBought.splice(developerIndex, 1);
      }
    });

    setClothingToBuy(allClothingWithoutBought ?? []);
    setDevelopersToBuy(allDevelopersWithoutBought ?? []);
    return { boughtClothingWithoutEquipped, boughtDevelopersWithoutPicked };
  }, [player.boughtIds]);

  const setBoughtAndEquipped = useCallback(({
    boughtClothingWithoutEquipped,
    boughtDevelopersWithoutPicked,
  }: { boughtClothingWithoutEquipped: ClothingType[], boughtDevelopersWithoutPicked: DeveloperType[] }) => {
    const _equippedClothing: ClothingType[] = [];
    let _chosenDeveloper: DeveloperType = null;

    player.equippedIds.forEach(x => {
      const boughtClothingIndex = boughtClothingWithoutEquipped.findIndex(y => y?.id === x);
      if (boughtClothingIndex === -1 || !boughtClothingWithoutEquipped) return;
      _equippedClothing.push(boughtClothingWithoutEquipped[boughtClothingIndex]);
      boughtClothingWithoutEquipped.splice(boughtClothingIndex, 1);
    });

    const chosenDevIndex = boughtDevelopersWithoutPicked.findIndex(x => x?.name === player.chosenDevName);
    if (chosenDevIndex >= 0 && boughtDevelopersWithoutPicked) {
      _chosenDeveloper = boughtDevelopersWithoutPicked[chosenDevIndex];
      boughtDevelopersWithoutPicked.splice(chosenDevIndex, 1);
    }

    setBoughtClothing(boughtClothingWithoutEquipped);
    setBoughtDevelopers(boughtDevelopersWithoutPicked);
    setEquippedClothing(_equippedClothing);
    setChosenDeveloper(_chosenDeveloper);
  }, [player.equippedIds, player.chosenDevName]);

  useEffect(() => {
    if (!clothing?.data?.allClothing || !developers?.data?.allDevelopers || !player) return;
    const { allClothing } = clothing.data;
    const { allDevelopers } = developers.data;
    const boughtItems = filterAndSetToBuy({ allClothing, allDevelopers });
    if (!boughtItems) return;
    setBoughtAndEquipped(boughtItems);
  }, [clothing.data, developers.data, filterAndSetToBuy, setBoughtAndEquipped, player]);

  if (clothing.loading || developers.loading) return <Loader />;

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
              <ShopItem type="Pick" key={x?.id} data={{ imageUrl: x?.avatarUrl, name: x?.name }} />
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
