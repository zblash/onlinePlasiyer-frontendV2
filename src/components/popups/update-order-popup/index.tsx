import * as React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import styled, { colors, css } from '~/styled';
import { UIInput, UIButton } from '~/components/ui';
import { IOrder, CreditPaymentType } from '~/services/helpers/backend-models';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { usePopupContext } from '~/contexts/popup/context';

/* UpdateOrderPopup Helpers */

export interface UpdateOrderPopupParams {
  order: IOrder;
  refetchQuery?: any;
}
interface UpdateOrderPopupProps {
  params: UpdateOrderPopupParams;
}
/* UpdateOrderPopup Constants */

/* UpdateOrderPopup Styles */
const StyledWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;
const StyledHeader = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledFormWrapper = styled.div`
  margin-top: 10px;
`;
const StyledInput = styled(UIInput)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
`;
const StyledButton = styled(UIButton)`
display: flex;
float: right;
align-items: center;
transition: background-color 0.3s;
background-color: ${colors.primary};
color: ${colors.white};
padding: 4px 8px;
margin 3%;
border-radius: 8px;
:active {
  background-color: ${colors.primaryDark} !important;
}
:hover {
  background-color: ${colors.lightGray};
}
:disabled {
  background-color: ${colors.lightGray};
}
`;
const DatePickerBtn = css`
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  width: 100%;
  padding: 4px;
`;

/* UpdateOrderPopup Component  */
function UpdateOrderPopup(props: React.PropsWithChildren<UpdateOrderPopupProps>) {
  /* UpdateOrderPopup Variables */
  const popups = usePopupContext();
  const [date, setDate] = React.useState(new Date());
  const [paymentType, setPaymentType] = React.useState<{ value: CreditPaymentType; label: string }>();
  const [paidPrice, setPaidPrice] = React.useState<number>();

  const paymentTypes = React.useMemo(() => {
    const array: Array<{ value: CreditPaymentType; label: string }> = [
      { value: 'CASH', label: 'Nakit' },
      { value: 'CREDIT_CARD', label: 'Kredi Kartı' },
    ];

    return array;
  }, []);

  /* UpdateOrderPopup Callbacks */
  const { mutation: updateOrder } = useMutation(mutationEndPoints.updateOrder, {
    variables: {
      id: props.params.order.id,
      paidPrice,
      status: 'FINISHED',
      paymentType: paymentType ? paymentType.value : undefined,
      // eslint-disable-next-line
      waybillDate: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
    },
  });
  const handleSubmit = React.useCallback(() => {
    updateOrder();
    popups.updateOrder.hide();
    // eslint-disable-next-line
  }, [updateOrder, popups]);
  /* UpdateOrderPopup Lifecycle  */

  return (
    <StyledWrapper>
      <StyledHeader>
        <p>Siparisi Guncelle</p>
      </StyledHeader>
      <StyledFormWrapper>
        <StyledInput
          id="order-paid-price"
          type="number"
          step="0.01"
          value={paidPrice}
          onChange={e => setPaidPrice(parseInt(e, 10))}
          placeholder="Odenen Tutar"
        />
        <label>Teslim Tarihi: </label>
        <DatePicker
          selected={date}
          onChange={selectedDate => setDate(selectedDate)}
          locale="tr"
          dateFormat="dd-MM-yyyy"
          className={DatePickerBtn}
        />
        {props.params.order.paymentType === 'SYSTEM_CREDIT' && paidPrice && (
          <>
            <label>Aldiginiz Odeme Tipi</label>
            <Select
              isClearable
              onChange={e => setPaymentType(e)}
              value={paymentType}
              options={paymentTypes}
              placeholder="Secim Yapin"
            />
          </>
        )}
        <StyledButton disabled={!date} type="button" onClick={handleSubmit}>
          Kaydet
        </StyledButton>
      </StyledFormWrapper>
    </StyledWrapper>
  );
}
const PureUpdateOrderPopup = React.memo(UpdateOrderPopup);

export { PureUpdateOrderPopup as UpdateOrderPopup };
