const mapping: Record<string, string> = {
  clients: 'client',
  invoices: 'invoice',
  'payment-histories': 'payment_history',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
