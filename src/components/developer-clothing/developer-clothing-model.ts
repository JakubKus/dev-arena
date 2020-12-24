export interface ClothingInput {
  clothing?: ({ bodyPart: 'top' | 'middle' | 'bottom', imageUrl: string } | null)[] | null;
}
export type Clothing = ({ top?: string, middle?: string, bottom?: string });
