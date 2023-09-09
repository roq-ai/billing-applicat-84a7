import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPaymentHistory } from 'apiSdk/payment-histories';
import { paymentHistoryValidationSchema } from 'validationSchema/payment-histories';
import { ClientInterface } from 'interfaces/client';
import { getClients } from 'apiSdk/clients';
import { PaymentHistoryInterface } from 'interfaces/payment-history';

function PaymentHistoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PaymentHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPaymentHistory(values);
      resetForm();
      router.push('/payment-histories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PaymentHistoryInterface>({
    initialValues: {
      payment_date: new Date(new Date().toDateString()),
      amount_paid: 0,
      payment_method: '',
      client_id: (router.query.client_id as string) ?? null,
    },
    validationSchema: paymentHistoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Payment Histories',
              link: '/payment-histories',
            },
            {
              label: 'Create Payment History',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Payment History
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="payment_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Payment Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.payment_date ? new Date(formik.values?.payment_date) : null}
              onChange={(value: Date) => formik.setFieldValue('payment_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Amount Paid"
            formControlProps={{
              id: 'amount_paid',
              isInvalid: !!formik.errors?.amount_paid,
            }}
            name="amount_paid"
            error={formik.errors?.amount_paid}
            value={formik.values?.amount_paid}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('amount_paid', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.payment_method}
            label={'Payment Method'}
            props={{
              name: 'payment_method',
              placeholder: 'Payment Method',
              value: formik.values?.payment_method,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/payment-histories')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'payment_history',
    operation: AccessOperationEnum.CREATE,
  }),
)(PaymentHistoryCreatePage);
