import { createContext, Dispatch, SetStateAction } from 'react';
import { Order } from '../../models/Order.model';

interface HistoryProps {
  order: Order[];
  type: 'ship' | 'shipping' | 'not-ship';
  setOrder: Dispatch<SetStateAction<Order[]>>;
}

export const HistoryContext = createContext<HistoryProps>({
  order: [],
  type: 'not-ship',
  setOrder: (order) => console.log(order)
});
