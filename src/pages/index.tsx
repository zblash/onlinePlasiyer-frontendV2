import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HeaderMenu } from '~/components/common/header-menu/index';
import { Footer } from '~/components/common/footer/index';
import { UserRoleResponse } from '../services/helpers/backend-models';
import { withRequiredRole } from '../components/hoc/with-required-role';
import { Header } from '~/components/common/header/index';

const CreateProductPage = React.lazy(() =>
  import('./create-product').then(module => ({ default: module.CreateProductPage })),
);
const UpdateProductPage = React.lazy(() =>
  import('./update-product').then(module => ({ default: module.UpdateProductPage })),
);
const Home = React.lazy(() => import('../pages/home/index').then(module => ({ default: module.Home })));

const ProductsPage = React.lazy(() =>
  import('../pages/products/index').then(module => ({ default: module.ProductsPage })),
);
const UsersPage = React.lazy(() => import('../pages/users/index').then(module => ({ default: module.UsersPage })));
const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));
const OrdersPage = React.lazy(() => import('./orders/index').then(module => ({ default: module.OrdersPage })));
const CartPage = React.lazy(() => import('../pages/cart/index').then(module => ({ default: module.CartPage })));
const InvoicesPage = React.lazy(() => import('./invoices/index').then(module => ({ default: module.InvoicesPage })));

const AllProductPage = React.lazy(() =>
  import('./all-products/index').then(module => ({ default: module.AllProductPage })),
);
const OrderPage = React.lazy(() => import('./order/index').then(module => ({ default: module.OrderPage })));
const CartCheckoutPage = React.lazy(() =>
  import('./cart-checkout/index').then(module => ({ default: module.CartCheckoutPage })),
);
const InvoicePage = React.lazy(() => import('./invoice/index').then(module => ({ default: module.InvoicePage })));
const ProfilePage = React.lazy(() => import('./profile/index').then(module => ({ default: module.ProfilePage })));
const CreateProductSpecifyPage = React.lazy(() =>
  import('./create-product-specify/index').then(module => ({ default: module.CreateProductSpecifyPage })),
);
const ProductSpecifiesPage = React.lazy(() =>
  import('./product-specifies/index').then(module => ({ default: module.ProductSpecifiesPage })),
);
const MerchantHome = React.lazy(() =>
  import('./merchant-home/index').then(module => ({ default: module.MerchantHome })),
);
const CreateUserPage = React.lazy(() =>
  import('./create-user/index').then(module => ({ default: module.CreateUserPage })),
);
const AllCategoriesPage = React.lazy(() =>
  import('./all-categories/index').then(module => ({ default: module.AllCategoriesPage })),
);
const UserPage = React.lazy(() => import('./user/index').then(module => ({ default: module.UserPage })));
const UserInvoicesPage = React.lazy(() =>
  import('./user-invoices/index').then(module => ({ default: module.UserInvoicesPage })),
);
const UserOrdersPage = React.lazy(() =>
  import('./user-orders/index').then(module => ({ default: module.UserOrdersPage })),
);
const UserProductSpecifiesPage = React.lazy(() =>
  import('./user-product-specifies/index').then(module => ({ default: module.UserProductSpecifiesPage })),
);
const UpdateProductSpeciyPage = React.lazy(() =>
  import('./update-product-specify/index').then(module => ({ default: module.UpdateProductSpeciyPage })),
);

const CreateAnnouncementPage = React.lazy(() =>
  import('./create-announcement/index').then(module => ({ default: module.CreateAnnouncementPage })),
);
const AnnouncementsPage = React.lazy(() =>
  import('./announcements/index').then(module => ({ default: module.AnnouncementsPage })),
);
const AllNotificationsPage = React.lazy(() =>
  import('./all-notifications/index').then(module => ({ default: module.AllNotificationsPage })),
);
const CreateNotificationPage = React.lazy(() =>
  import('./create-notification/index').then(module => ({ default: module.CreateNotificationPage })),
);
const AllCreditsPage = React.lazy(() =>
  import('./all-credits/index').then(module => ({ default: module.AllCreditsPage })),
);
const SearchProductsPage = React.lazy(() =>
  import('./search-products/index').then(module => ({ default: module.SearchProductsPage })),
);
const CreateTicketPage = React.lazy(() =>
  import('./create-ticket/index').then(module => ({ default: module.CreateTicketPage })),
);
const UserTicketsPage = React.lazy(() =>
  import('./user-tickets/index').then(module => ({ default: module.UserTicketsPage })),
);
const TicketRepliesPage = React.lazy(() =>
  import('./ticket-replies/index').then(module => ({ default: module.TicketRepliesPage })),
);
const LoginPage = React.lazy(() =>
  import('~/components/common/login-register/login-page').then(module => ({ default: module.LoginPage })),
);
const CreditActivities = React.lazy(() =>
  import('./credit-activities/index').then(module => ({ default: module.CreditActivities })),
);
const ObligationsPage = React.lazy(() =>
  import('./obligation-activities/index').then(module => ({ default: module.ObligationsPage })),
);
const AllObligationsPage = React.lazy(() =>
  import('./all-obligations/index').then(module => ({ default: module.AllObligationsPage })),
);

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/login',
    component: LoginPage,
  },
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
  { path: '/all-credits', component: AllCreditsPage, authorize: ['ADMIN'] },
  { path: '/search/:productId', component: SearchProductsPage },
  { path: '/create-ticket', component: CreateTicketPage },
  { path: '/my-tickets', component: UserTicketsPage },
  { path: '/ticket-replies/:ticketId', component: TicketRepliesPage },
  { path: '/credit-activities', component: CreditActivities },
  { path: '/obligation-activities/:userId?', component: ObligationsPage, authorize: ['MERCHANT', 'ADMIN'] },
  { path: '/all-obligations', component: AllObligationsPage, authorize: ['ADMIN'] },
  { path: '/create-product', component: CreateProductPage, authorize: ['ADMIN'] },
  { path: '/update-product/:productId', component: UpdateProductPage, authorize: ['ADMIN'] },
];

const Routes = React.memo(() => {
  return (
    <>
      <Header />
      <HeaderMenu />
      <div style={{ minHeight: '100%' }}>
        <React.Suspense fallback={<div>Loading</div>}>
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
        </React.Suspense>
      </div>
      <Footer />
    </>
  );
});

export default Routes;
