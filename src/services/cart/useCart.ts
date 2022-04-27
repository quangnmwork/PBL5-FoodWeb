import create, { SetState, GetState } from 'zustand';
import lodash from 'lodash';
import { persist } from 'zustand/middleware';

interface FoodCart {
  idFood: string;
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
  getCartForOrder: () => Pick<FoodCart, 'idFood' | 'numberFood'>[];
}
export const useCart = create<CartState>()(
  persist(
    (set: SetState<CartState>, get: GetState<CartState>) => ({
      foods: [] as FoodCart[],

      addFood: (food: FoodCart) => {
        const { foods } = get();
        const newArrayFoods = foods.slice();
        const newFood = lodash.find(foods, { idFood: food.idFood });
        if (newFood) {
          newArrayFoods.map((foodItem) => {
            if (foodItem.idFood == newFood.idFood) {
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
            return food.idFood != idFood;
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
        const newFood = lodash.find(foods, { idFood: idFood });
        if (newFood) {
          newArrayFoods.map((food) => {
            if (food.idFood == newFood.idFood) {
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
      },
      getCartForOrder: () => {
        const { foods } = get();
        const cartOrder: Pick<FoodCart, 'idFood' | 'numberFood'>[] = [];
        foods.forEach((food) => {
          cartOrder.push({ idFood: food.idFood, numberFood: food.numberFood });
        });

        return cartOrder;
      }
    }),
    {
      name: 'cart',
      getStorage: () => sessionStorage
    }
  )
);
