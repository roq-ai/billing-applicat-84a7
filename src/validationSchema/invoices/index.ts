import * as yup from 'yup';

export const invoiceValidationSchema = yup.object().shape({
  invoice_number: yup.string().required(),
  invoice_date: yup.date().required(),
  due_date: yup.date().required(),
  total_amount: yup.number().integer().required(),
  client_id: yup.string().nullable().required(),
});
