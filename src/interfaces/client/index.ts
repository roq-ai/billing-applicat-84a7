import { InvoiceInterface } from 'interfaces/invoice';
import { PaymentHistoryInterface } from 'interfaces/payment-history';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  invoice?: InvoiceInterface[];
  payment_history?: PaymentHistoryInterface[];
  user?: UserInterface;
  _count?: {
    invoice?: number;
    payment_history?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
