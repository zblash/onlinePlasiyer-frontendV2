import * as React from 'react';
import DatePicker from 'react-datepicker';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';

/* OrderListFilterComponent Helpers */
interface OrderListFilterComponentProps {
  setCustomer: (e: string) => void;
  setLastDate: (e: Date) => void;
}
/* OrderListFilterComponent Constants */

/* OrderListFilterComponent Styles */
const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 0 65px;
`;
const StyledNameLabel = styled.label`
  margin-right: 7px;
  padding: 3px;
  float: left;
`;
const DatePickerBtn = css`
  border: 2px solid ${colors.lightGray};
  border-radius: 4px;
  width: 99%;
  padding-left: 1%;
  height: 26px;
`;
/* OrderListFilterComponent Component  */
function OrderListFilterComponent(props: React.PropsWithChildren<OrderListFilterComponentProps>) {
  /* OrderListFilterComponent Variables */
  const [customer, setCustomer] = React.useState<string>('');
  const [lastDate, setLastDate] = React.useState<Date>();
  /* OrderListFilterComponent Callbacks */
  const handleFilterNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer(e.target.value);
  }, []);
  const handleFilter = React.useCallback(() => {
    if (customer) {
      props.setCustomer(customer);
    }

    if (lastDate) {
      props.setLastDate(lastDate);
    }
  }, [customer, lastDate, props]);
  /* OrderListFilterComponent Lifecycle  */

  return (
    <StyledFilterWrapper>
      <div>
        <StyledNameLabel>Kullanici Ismi: </StyledNameLabel>
        <StyledNameInput
          placeholder="Musteri ismi"
          id="name-filter"
          value={customer}
          onChange={handleFilterNameChange}
        />
      </div>
      <div>
        <StyledNameLabel>Tarih: </StyledNameLabel>
        <DatePicker
          selected={lastDate}
          maxDate={new Date()}
          onChange={selectedDate => setLastDate(selectedDate)}
          locale="tr"
          dateFormat="yyyy-MM-dd"
          className={DatePickerBtn}
        />
      </div>
      <StyledNameInputBtn disabled={!lastDate && !customer} onClick={handleFilter}>
        Filtrele
      </StyledNameInputBtn>
    </StyledFilterWrapper>
  );
}
const PureOrderListFilterComponent = React.memo(OrderListFilterComponent);

export { PureOrderListFilterComponent as OrderListFilterComponent };
