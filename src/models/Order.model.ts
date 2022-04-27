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
