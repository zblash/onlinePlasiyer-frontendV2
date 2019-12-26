import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { IOrder, TOrderStatus } from '~/services/helpers/backend-models';
import { UITable, UIIcon, UILink } from '~/components/ui';
import { useApplicationContext } from '~/app/context';
import { usePopupContext } from '~/contexts/popup/context';

/* OrderListComponent Helpers */
interface OrderListComponentProps {
  orders: IOrder[];
  elementCountOfPage: number;
  setSortBy: (e: any) => void;
  setSortType: (e: any) => void;
}

/* OrderListComponent Constants */
const ORDER_STATUS_MAP: Record<TOrderStatus, string> = {
  NEW: 'Yeni',
  FINISHED: 'Teslim Edildi',
  CANCELLED: 'Iptal Edildi',
  PAID: 'Ödemesi Yapıldı',
};
/* OrderListComponent Styles */
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
/* OrderListComponent Component  */
function OrderListComponent(props: React.PropsWithChildren<OrderListComponentProps>) {
  /* OrderListComponent Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const applicationContext = useApplicationContext();
  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'totalPrice', label: 'Fiyata Gore' },
    { value: 'status', label: 'Durumuna Gore' },
  ];
  /* OrderListComponent Callbacks */
  const handleEditClick = React.useCallback(
    item => {
      popups.updateOrder.show({ order: item });
    },
    [popups.updateOrder],
  );
  /* OrderListComponent Lifecycle  */

  return (
    <UITable
      id="orders-page-table"
      data={props.orders}
      onSortChange={e => props.setSortBy(e.value)}
      onSortTypeChange={value => props.setSortType(value)}
      sortList={sortList}
      rowCount={props.elementCountOfPage > 0 ? props.elementCountOfPage : 15}
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
              {(item.status === 'NEW' || item.status === 'PAID') &&
                (applicationContext.user.isMerchant || applicationContext.user.isAdmin) && (
                  <UIIcon
                    name="edit"
                    color={colors.primaryDark}
                    className={commonIconStyle}
                    size={16}
                    onClick={x => handleEditClick(item)}
                  />
                )}
              <StyledLink to={`/order/${item.id}`}>{t('cart.show-order-detail')}</StyledLink>
            </StyledActionsWrapper>
          ),
        },
      ]}
    />
  );
}
const PureOrderListComponent = React.memo(OrderListComponent);

export { PureOrderListComponent as OrderListComponent };
