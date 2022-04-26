import create, { SetState, GetState } from 'zustand';
import lodash from 'lodash';
import { persist } from 'zustand/middleware';
import { DynamicObject } from '../../models/DynamicObject.model';

interface FoodCart {
  id: string;
  numberFood: number;
}
interface CartState {
  foods: FoodCart[];
  addFood: (food: FoodCart) => void;
  getCart: () => DynamicObject;
  getLengthCartProducs: () => number;
}
export const useCart = create<CartState>()(
  persist(
    (set: SetState<CartState>, get: GetState<CartState>) => ({
      foods: [] as FoodCart[],
      addFood: (food: FoodCart) => {
        const { foods } = get();
        set({ foods: [...foods, food] });
      },
      getCart: () => {
        const { foods } = get();
        return lodash.groupBy(foods, 'id');
      },
      getLengthCartProducs: () => {
        const { foods } = get();
        return lodash.reduce(
          foods,
          (numberFood: number, cart: FoodCart) => {
            return numberFood + cart.numberFood;
          },
          0
        );
      }
    }),
    {
      name: 'cart',
      getStorage: () => sessionStorage
    }
  )
);
