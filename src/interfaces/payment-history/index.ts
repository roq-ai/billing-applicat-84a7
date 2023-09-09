import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface PaymentHistoryInterface {
  id?: string;
  payment_date: any;
  amount_paid: number;
  payment_method: string;
  client_id: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface PaymentHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  payment_method?: string;
  client_id?: string;
}
