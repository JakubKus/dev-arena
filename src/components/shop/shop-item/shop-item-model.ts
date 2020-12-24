export interface ShopItemData {
  imageUrl?: string;
  name?: string;
  price?: number;
  id?: string;
}

export interface ShopItemModel {
  type: 'Buy' | 'Equip' | 'Unequip' | 'Pick' | 'Picked';
  data: ShopItemData;
}
