import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HeaderMenu } from '~/components/common/header-menu/index';
import { Footer } from '~/components/common/footer/index';
import { UserRoleResponse } from '../services/helpers/backend-models';
import { withRequiredRole } from '../components/hoc/with-required-role';
import { Header } from '~/components/common/header/index';

const CreateProductPage = React.lazy(() =>
  import('./admin-pages/create-product').then(module => ({ default: module.CreateProductPage })),
);
const UpdateProductPage = React.lazy(() =>
  import('./admin-pages/update-product').then(module => ({ default: module.UpdateProductPage })),
);
const Home = React.lazy(() => import('./customer-pages/home/index').then(module => ({ default: module.Home })));

const ProductsPage = React.lazy(() =>
  import('./common-pages/products/index').then(module => ({ default: module.ProductsPage })),
);
const UsersPage = React.lazy(() => import('./admin-pages/users/index').then(module => ({ default: module.UsersPage })));
const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));
const OrdersPage = React.lazy(() =>
  import('./common-pages/orders/index').then(module => ({ default: module.OrdersPage })),
);
const CartPage = React.lazy(() => import('./customer-pages/cart/index').then(module => ({ default: module.CartPage })));

const AllProductPage = React.lazy(() =>
  import('./common-pages/all-products/index').then(module => ({ default: module.AllProductPage })),
);
const OrderPage = React.lazy(() =>
  import('./common-pages/order/index').then(module => ({ default: module.OrderPage })),
);
const CartCheckoutPage = React.lazy(() =>
  import('./customer-pages/cart-checkout/index').then(module => ({ default: module.CartCheckoutPage })),
);
const ProfilePage = React.lazy(() =>
  import('./common-pages/profile/index').then(module => ({ default: module.ProfilePage })),
);
const CreateProductSpecifyPage = React.lazy(() =>
  import('./common-pages/create-product-specify/index').then(module => ({ default: module.CreateProductSpecifyPage })),
);
const ProductSpecifiesPage = React.lazy(() =>
  import('./common-pages/product-specifies/index').then(module => ({ default: module.ProductSpecifiesPage })),
);
const MerchantHome = React.lazy(() =>
  import('./merchant-pages/merchant-home/index').then(module => ({ default: module.MerchantHome })),
);
const CreateUserPage = React.lazy(() =>
  import('./admin-pages/create-user/index').then(module => ({ default: module.CreateUserPage })),
);
const AllCategoriesPage = React.lazy(() =>
  import('./admin-pages/all-categories/index').then(module => ({ default: module.AllCategoriesPage })),
);
const UserPage = React.lazy(() => import('./admin-pages/user/index').then(module => ({ default: module.UserPage })));

const UserOrdersPage = React.lazy(() =>
  import('./admin-pages/user-orders/index').then(module => ({ default: module.UserOrdersPage })),
);
const UserProductSpecifiesPage = React.lazy(() =>
  import('./admin-pages/user-product-specifies/index').then(module => ({ default: module.UserProductSpecifiesPage })),
);
const UpdateProductSpeciyPage = React.lazy(() =>
  import('./common-pages/update-product-specify/index').then(module => ({ default: module.UpdateProductSpeciyPage })),
);

const CreateAnnouncementPage = React.lazy(() =>
  import('./admin-pages/create-announcement/index').then(module => ({ default: module.CreateAnnouncementPage })),
);
const AnnouncementsPage = React.lazy(() =>
  import('./admin-pages/announcements/index').then(module => ({ default: module.AnnouncementsPage })),
);
const AllNotificationsPage = React.lazy(() =>
  import('./admin-pages/all-notifications/index').then(module => ({ default: module.AllNotificationsPage })),
);
const CreateNotificationPage = React.lazy(() =>
  import('./admin-pages/create-notification/index').then(module => ({ default: module.CreateNotificationPage })),
);
const AllCreditsPage = React.lazy(() =>
  import('./admin-pages/all-credits/index').then(module => ({ default: module.AllCreditsPage })),
);
const SearchProductsPage = React.lazy(() =>
  import('./common-pages/search-products/index').then(module => ({ default: module.SearchProductsPage })),
);
const CreateTicketPage = React.lazy(() =>
  import('./common-pages/create-ticket/index').then(module => ({ default: module.CreateTicketPage })),
);
const UserTicketsPage = React.lazy(() =>
  import('./admin-pages/user-tickets/index').then(module => ({ default: module.UserTicketsPage })),
);
const TicketRepliesPage = React.lazy(() =>
  import('./admin-pages/ticket-replies/index').then(module => ({ default: module.TicketRepliesPage })),
);
const CreditActivities = React.lazy(() =>
  import('./common-pages/credit-activities/index').then(module => ({ default: module.CreditActivities })),
);
const ObligationsPage = React.lazy(() =>
  import('./common-pages/obligation-activities/index').then(module => ({ default: module.ObligationsPage })),
);
const AllObligationsPage = React.lazy(() =>
  import('./admin-pages/all-obligations/index').then(module => ({ default: module.AllObligationsPage })),
);
const CustomersPage = React.lazy(() =>
  import('./merchant-pages/customers/index').then(module => ({ default: module.CustomersPage })),
);

const ProfileMerchantPage = React.lazy(() =>
  import('./customer-pages/merchant-profile/index').then(module => ({ default: module.MerchantProfileForUserPage })),
);

const MerchantsPage = React.lazy(() =>
  import('./customer-pages/merchants/index').then(module => ({ default: module.MerchantsPage })),
);

const MerchantCreditsPage = React.lazy(() =>
  import('./common-pages/merchant-credits/index').then(module => ({ default: module.MerchantCredits })),
);
const CustomerProfilePage = React.lazy(() =>
  import('./merchant-pages/customer-profile/index').then(module => ({ default: module.CustomerProfilePage })),
);
interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  { path: '/', component: Home },
  { path: '/search/:productId', component: SearchProductsPage },
  { path: '/create-ticket', component: CreateTicketPage },
  { path: '/my-tickets', component: UserTicketsPage },
  { path: '/ticket-replies/:ticketId', component: TicketRepliesPage },
  { path: '/credit-activities/:creditId?', component: CreditActivities },
  { path: '/products/:categoryId?', component: ProductsPage },
  { path: '/orders/:userId?', component: OrdersPage },
  { path: '/order/:orderId', component: OrderPage },
  { path: '/profile', component: ProfilePage },

  { path: '/users', component: UsersPage, authorize: ['ADMIN'] },
  { path: '/users/create', component: CreateUserPage, authorize: ['ADMIN'] },
  { path: '/user/:userId', component: UserPage, authorize: ['ADMIN'] },
  { path: '/create-announcement', component: CreateAnnouncementPage, authorize: ['ADMIN'] },
  { path: '/announcements', component: AnnouncementsPage, authorize: ['ADMIN'] },
  { path: '/all-notifications', component: AllNotificationsPage, authorize: ['ADMIN'] },
  { path: '/create-notification', component: CreateNotificationPage, authorize: ['ADMIN'] },
  { path: '/all-credits', component: AllCreditsPage, authorize: ['ADMIN'] },
  { path: '/all-obligations', component: AllObligationsPage, authorize: ['ADMIN'] },
  { path: '/create-product', component: CreateProductPage, authorize: ['ADMIN'] },
  { path: '/update-product/:productId', component: UpdateProductPage, authorize: ['ADMIN'] },
  { path: '/all-categories', component: AllCategoriesPage, authorize: ['ADMIN'] },
  { path: '/user/product-specifies/:userId', component: UserProductSpecifiesPage, authorize: ['ADMIN'] },
  { path: '/user/orders/:userId', component: UserOrdersPage, authorize: ['ADMIN'] },

  { path: '/cart', component: CartPage, authorize: ['CUSTOMER'] },
  { path: '/cart/checkout', component: CartCheckoutPage, authorize: ['CUSTOMER'] },
  { path: '/merchant/profile/:merchantName/:merchantId', component: ProfileMerchantPage, authorize: ['CUSTOMER'] },
  { path: '/credits/:userId?', component: MerchantCreditsPage, authorize: ['CUSTOMER'] },
  { path: '/merchants', component: MerchantsPage, authorize: ['CUSTOMER'] },

  { path: '/merchant/customer/:customerName/:customerId', component: CustomerProfilePage, authorize: ['MERCHANT'] },
  { path: '/merchant/customers', component: CustomersPage, authorize: ['MERCHANT'] },
  { path: '/merchant/credits/:userId?', component: MerchantCreditsPage, authorize: ['MERCHANT'] },
  { path: '/merchant/home', component: MerchantHome, authorize: ['MERCHANT'] },

  { path: '/all-products', component: AllProductPage, authorize: ['ADMIN', 'MERCHANT'] },
  { path: '/add-product-specify', component: CreateProductSpecifyPage, authorize: ['ADMIN', 'MERCHANT'] },
  { path: '/edit-product-specify/:specifyId', component: UpdateProductSpeciyPage, authorize: ['ADMIN', 'MERCHANT'] },
  { path: '/product-specifies', component: ProductSpecifiesPage, authorize: ['ADMIN', 'MERCHANT'] },
  { path: '/obligation-activities/:userId?', component: ObligationsPage, authorize: ['ADMIN', 'MERCHANT'] },
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
