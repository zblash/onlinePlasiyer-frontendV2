import * as React from 'react';
import styled from '~/styled';
import { Container, UITable } from '~/components/ui';
import { TOrderStatus } from '~/services/helpers/backend-models';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';

/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}

/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/
const OrdersPageStrings = {
  buyer: 'Alici',
  seller: 'Satici',
  orderDate: 'Siparis T.',
  itemCount: 'Oge Sayisi',
  totalPrice: 'Toplam F.',
  status: 'Durumu',
};
const ORDER_STATUS_MAP: Record<TOrderStatus, string> = {
  CANCELLED: 'Iptal edildi',
  FINISHED: 'Bitti',
  NEW: 'Yeni',
  PAID: 'Bekliyor',
};

/*
  OrdersPage Styles
*/
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const [ordersQueryPageNumber, setOrdersQueryPageNumber] = React.useState(1);

  const {
    data: { values: orders, totalPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    variables: { pageNumber: ordersQueryPageNumber },
  });
  const __ = (
    <Container>
      <StyledPageContainer>
        <UITable
          id="orders-page-table"
          onChangePage={(pageIndex, pageCount) => {
            if (pageIndex + 2 === pageCount && ordersQueryPageNumber < totalPage) {
              setOrdersQueryPageNumber(ordersQueryPageNumber + 1);
            }
          }}
          data={orders}
          rowCount={14}
          columns={[
            {
              title: OrdersPageStrings.seller,
              itemRenderer: item => item.sellerName,
            },
            {
              title: OrdersPageStrings.buyer,
              itemRenderer: item => item.buyerName,
            },
            {
              title: OrdersPageStrings.orderDate,
              itemRenderer: item => item.orderDate,
            },
            {
              title: OrdersPageStrings.itemCount,
              itemRenderer: item => item.orderItems.length,
            },
            {
              title: OrdersPageStrings.status,
              itemRenderer: item => ORDER_STATUS_MAP[item.status],
            },
            {
              title: OrdersPageStrings.totalPrice,
              itemRenderer: item => item.totalPrice,
            },
          ]}
        />
      </StyledPageContainer>
    </Container>
  );

  /*
  OrdersPage Lifecycle
  */

  /*
  OrdersPage Functions
  */

  return __;
};

const _OrdersPage = OrdersPage;

export { _OrdersPage as OrdersPage };
