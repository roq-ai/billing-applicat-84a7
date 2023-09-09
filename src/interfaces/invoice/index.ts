import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface InvoiceInterface {
  id?: string;
  invoice_number: string;
  invoice_date: any;
  due_date: any;
  total_amount: number;
  client_id: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface InvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  invoice_number?: string;
  client_id?: string;
}
