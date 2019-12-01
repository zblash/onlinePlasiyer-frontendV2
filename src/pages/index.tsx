import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../pages/home';
import { ProductsPage } from '../pages/products';
import { UsersPage } from '../pages/users';
import { Page404 } from './404-component';

import { Header } from '~/components/common/header';
import { OrdersPage } from './orders';
import { CartPage } from '../pages/cart';
import { InvoicesPage } from './invoices';
import { UserRoleResponse } from '~/services/helpers/backend-models';
import { withRequiredRole } from '~/components/hoc/with-required-role';
import { AllProductPage } from './all-products';
import { OrderPage } from './order';
import { CartCheckoutPage } from './cart-checkout';
import { InvoicePage } from './invoice';
import { ProfilePage } from './profile';
import { CreateProductSpecifyPage } from './create-product-specify';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/users',
    component: UsersPage,
    authorize: ['ADMIN'],
  },
  {
    path: '/cart',
    component: CartPage,
    authorize: ['CUSTOMER'],
  },
  {
    path: '/cart/checkout',
    component: CartCheckoutPage,
    authorize: ['CUSTOMER'],
  },
  {
    path: '/products/:categoryId?',
    component: ProductsPage,
  },
  {
    path: '/orders',
    component: OrdersPage,
  },
  {
    path: '/order/:orderId',
    component: OrderPage,
  },
  {
    path: '/invoice/:invoiceId',
    component: InvoicePage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  { path: '/invoices', component: InvoicesPage },
  { path: '/all-products', component: AllProductPage, authorize: ['ADMIN'] },
  { path: '/add-product-specify', component: CreateProductSpecifyPage, authorize: ['MERCHANT', 'ADMIN'] },
];

const Routes = React.memo(() => {
  return (
    <>
      <Header />
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={withRequiredRole(route.component, {
              authorize: route.authorize,
            })}
            exact
          />
        ))}
        <Route component={Page404} />
      </Switch>
    </>
  );
});

export default Routes;
