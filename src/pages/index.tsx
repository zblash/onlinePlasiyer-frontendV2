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
import { ProductSpecifiesPage } from './product-specifies';
import { MerchantHome } from './merchant-home';
import { CreateUserPage } from './create-user';
import { AllCategoriesPage } from './all-categories';
import { UserPage } from './user';
import { HeaderMenu } from '~/components/common/header-menu';
import { UserInvoicesPage } from './user-invoices';
import { UserOrdersPage } from './user-orders';
import { UserProductSpecifiesPage } from './user-product-specifies';
import { UpdateProductSpeciyPage } from './update-product-specify';
import { Footer } from '~/components/common/footer';
import { CreateAnnouncementPage } from './create-announcement';
import { AnnouncementsPage } from './announcements';
import { AllNotificationsPage } from './all-notifications';
import { CreateNotificationPage } from './create-notification';

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
    path: '/orders/:userId?',
    component: OrdersPage,
  },
  {
    path: '/user/orders/:userId',
    component: UserOrdersPage,
    authorize: ['ADMIN'],
  },
  {
    path: '/order/:orderId',
    component: OrderPage,
  },
  { path: '/invoices', component: InvoicesPage },
  {
    path: '/user/invoices/:userId',
    component: UserInvoicesPage,
    authorize: ['ADMIN'],
  },
  {
    path: '/invoice/:invoiceId',
    component: InvoicePage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  { path: '/all-categories', component: AllCategoriesPage, authorize: ['ADMIN'] },

  { path: '/all-products', component: AllProductPage, authorize: ['ADMIN', 'MERCHANT'] },
  { path: '/add-product-specify', component: CreateProductSpecifyPage, authorize: ['MERCHANT', 'ADMIN'] },
  { path: '/edit-product-specify/:specifyId', component: UpdateProductSpeciyPage, authorize: ['MERCHANT', 'ADMIN'] },
  { path: '/product-specifies', component: ProductSpecifiesPage, authorize: ['ADMIN', 'MERCHANT'] },
  { path: '/user/product-specifies/:userId', component: UserProductSpecifiesPage, authorize: ['ADMIN'] },
  { path: '/merchant/home', component: MerchantHome, authorize: ['MERCHANT'] },
  { path: '/users/create', component: CreateUserPage, authorize: ['ADMIN'] },
  { path: '/user/:userId', component: UserPage, authorize: ['ADMIN'] },
  { path: '/create-announcement', component: CreateAnnouncementPage, authorize: ['ADMIN'] },
  { path: '/announcements', component: AnnouncementsPage, authorize: ['ADMIN'] },
  { path: '/all-notifications', component: AllNotificationsPage, authorize: ['ADMIN'] },
  { path: '/create-notification', component: CreateNotificationPage, authorize: ['ADMIN'] },
];

const Routes = React.memo(() => {
  return (
    <>
      <Header />
      <HeaderMenu />
      <div style={{ marginBottom: '60px' }}>
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
      </div>
      <Footer />
    </>
  );
});

export default Routes;
