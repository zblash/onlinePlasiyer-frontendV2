import * as React from 'react';
import styled, { colors } from '~/styled';
import { UIButton } from '~/components/ui';

/* OrderListFilterComponent Helpers */
interface OrderListFilterComponentProps {
  setCustomer: (e: string) => void;
}
/* OrderListFilterComponent Constants */

/* OrderListFilterComponent Styles */
const StyledFilterWrapper = styled.div`
  width: 100%;
  overflow: auto;
  margin-bottom: 10px;
`;
const StyledNameInput = styled.input`
  float: left;  
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  padding 7px 9px;
  margin-right: 5px;
`;
const StyledNameInputBtn = styled(UIButton)`
  float: left;
`;
const StyledNameLabel = styled.label`
  margin-right: 5px;
  float: left;
`;

/* OrderListFilterComponent Component  */
function OrderListFilterComponent(props: React.PropsWithChildren<OrderListFilterComponentProps>) {
  /* OrderListFilterComponent Variables */
  const [customer, setCustomer] = React.useState<string>('');
  /* OrderListFilterComponent Callbacks */
  const handleFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer(e.target.value);
  };
  /* OrderListFilterComponent Lifecycle  */

  return (
    <StyledFilterWrapper>
      <StyledNameLabel>Kullanici Ismiyle Ara: </StyledNameLabel>
      <StyledNameInput placeholder="Musteri ismi" id="name-filter" value={customer} onChange={handleFilterNameChange} />
      <StyledNameInputBtn onClick={e => props.setCustomer(customer)}>Ara</StyledNameInputBtn>
    </StyledFilterWrapper>
  );
}
const PureOrderListFilterComponent = React.memo(OrderListFilterComponent);

export { PureOrderListFilterComponent as OrderListFilterComponent };
