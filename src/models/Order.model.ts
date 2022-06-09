export interface Order {
  idOrderDetail: number;
  timeOrderDetail: Date;
  isShip: boolean;
  timeShipDone: any;
  choiceShip: boolean;
  codeOrderDetail: string;
  idRoom: number;
  idPayment: number;
  idCustomer: number;
  idShipper: number;
  nameCustomer?: string;
  nameShipper?: string;
  addressCustomer?: string;
}
export interface OrderShipper {
  idOrderDetail: number;
  timeOrderDetail: string;
  isShip: boolean;
  choiceShip: boolean;
  codeOrderDetail: string;
  idRoom: number;
  idPayment: number;
  idCustomer: number;
  idShipper: number;
  timeShipDone?: boolean;
  nameCustomer?: string;
  nameShipper?: string;
  addressCustomer?: string;
}
export interface ReiceiveOrderDetailItem {
  idFood: number;
  nameFood: string;
  numberFood: number;
  imageFood?: string;
  priceFood: number;
  sellerId: number;
  nameSeller: string;
  avatar: string;
}
