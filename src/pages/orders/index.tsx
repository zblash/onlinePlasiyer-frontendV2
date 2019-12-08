import * as React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled, { css, colors } from '~/styled';
import { Container, UITable, UIIcon, UILink } from '~/components/ui';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { useApplicationContext } from '~/app/context';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { TOrderStatus } from '~/services/helpers/backend-models';

/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}
interface RouteParams {
  userId?: string;
}

/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/
const ORDER_STATUS_MAP: Record<TOrderStatus, string> = {
  NEW: 'Yeni',
  FINISHED: 'Teslim Edildi',
  CANCELLED: 'Iptal Edildi',
  PAID: 'Ödemesi Yapıldı',
};
/*
  OrdersPage Styles
*/
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const [ordersQueryPageNumber, setOrdersQueryPageNumber] = React.useState(1);
  const { t } = useTranslation();
  const { userId } = useParams<RouteParams>();
  const applicationContext = useApplicationContext();
  const {
    data: { values: orders, totalPage, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    variables: {
      userId,
    },
    pageNumber: ordersQueryPageNumber,
  });
  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledPageContainer>
        <UITable
          id="orders-page-table"
          onChangePage={(pageIndex, pageCount) => {
            if (pageIndex + 2 === pageCount && ordersQueryPageNumber < totalPage) {
              setOrdersQueryPageNumber(ordersQueryPageNumber + 1);
            }
          }}
          data={orders}
          rowCount={elementCountOfPage > 0 ? elementCountOfPage : 15}
          columns={[
            {
              title: t('common.merchant'),
              itemRenderer: item => item.sellerName,
            },
            {
              title: t('common.customer'),
              itemRenderer: item => item.buyerName,
            },
            {
              title: t('order.order-date'),
              itemRenderer: item => item.orderDate,
            },
            {
              title: t('order.quantity'),
              itemRenderer: item => item.orderItems.length,
            },
            {
              title: t('order.status-text'),
              itemRenderer: item => ORDER_STATUS_MAP[item.status],
            },
            {
              title: t('common.total-price'),
              itemRenderer: item => `${item.totalPrice} TL`,
            },
            {
              title: null,
              itemRenderer: item => (
                <StyledActionsWrapper>
                  {(applicationContext.user.isMerchant || applicationContext.user.isAdmin) && (
                    <UIIcon name="edit" color={colors.primaryDark} className={commonIconStyle} size={16} />
                  )}
                  <StyledLink to={`/order/${item.id}`}>{t('cart.show-order-detail')}</StyledLink>
                </StyledActionsWrapper>
              ),
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
