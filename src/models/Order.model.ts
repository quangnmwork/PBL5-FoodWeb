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
}
