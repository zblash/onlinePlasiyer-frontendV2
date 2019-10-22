import * as React from 'react';
import { withHeader } from './hoc/with-header';
import { UserRoleResponse } from '~/backend-model-helpers';
import Home from './pages/home';
import { ProductsPage } from './pages/products';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: withHeader(Home),
  },
  {
    path: '/products/:categoryId?',
    component: withHeader(ProductsPage),
    authorize: ['ADMIN', 'CUSTOMER'],
  },
];

export default routes;
