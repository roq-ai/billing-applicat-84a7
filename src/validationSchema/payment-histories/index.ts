import * as yup from 'yup';

export const paymentHistoryValidationSchema = yup.object().shape({
  payment_date: yup.date().required(),
  amount_paid: yup.number().integer().required(),
  payment_method: yup.string().required(),
  client_id: yup.string().nullable().required(),
});
