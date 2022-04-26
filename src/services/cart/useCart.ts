import create, { SetState, GetState } from 'zustand';
import lodash from 'lodash';
import { persist } from 'zustand/middleware';

interface FoodCart {
  id: string;
  nameFood: string;
  imageFood: string;
  numberFood: number;
  priceFood: number;
}
interface CartState {
  foods: FoodCart[];
  addFood: (food: FoodCart) => void;
  getCart: () => FoodCart[];
  getLengthCartProducs: () => number;
  updateCart: (idFood: string, quantity: number) => void;
  getTotalMoney: () => number;
  deleteFood: (idFood: string) => void;
}
export const useCart = create<CartState>()(
  persist(
    (set: SetState<CartState>, get: GetState<CartState>) => ({
      foods: [] as FoodCart[],

      addFood: (food: FoodCart) => {
        const { foods } = get();
        const newArrayFoods = foods.slice();
        const newFood = lodash.find(foods, { id: food.id });
        if (newFood) {
          newArrayFoods.map((foodItem) => {
            if (foodItem.id == newFood.id) {
              foodItem.numberFood += food.numberFood;
            }
          });
          set({ foods: newArrayFoods });
        } else {
          set({ foods: [...newArrayFoods, food] });
        }
      },
      deleteFood: (idFood: string) => {
        const { foods } = get();
        set({
          foods: lodash.remove(foods, (food) => {
            return food.id != idFood;
          })
        });
      },
      getTotalMoney: () => {
        const { foods } = get();
        return lodash.reduce(
          foods,
          (totalMoney: number, cart: FoodCart) => {
            return totalMoney + cart.numberFood * cart.priceFood;
          },
          0
        );
      },
      getCart: () => {
        const { foods } = get();
        return foods;
      },
      updateCart: (idFood: string, quantity: number) => {
        const { foods } = get();
        const newArrayFoods = foods.slice();
        const newFood = lodash.find(foods, { id: idFood });
        if (newFood) {
          newArrayFoods.map((food) => {
            if (food.id == newFood.id) {
              food.numberFood = quantity;
            }
          });
          set({ foods: newArrayFoods });
        } else {
          set({ foods: [...newArrayFoods] });
        }
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
