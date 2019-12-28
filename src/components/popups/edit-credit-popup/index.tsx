import * as React from 'react';
import styled, { colors } from '~/styled';
import { ICreditResponse } from '~/services/helpers/backend-models';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useAlert } from '~/utils/hooks';
import { usePopupContext } from '~/contexts/popup/context';
import { UIInput, UIButton } from '~/components/ui';

/* EditCreditPopup Helpers */
export interface EditCreditPopupParams {
  credit: ICreditResponse;
  refetchQuery?: any;
}
interface EditCreditPopupProps {
  params: EditCreditPopupParams;
}

/* EditCreditPopup Constants */

/* EditCreditPopup Styles */
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
/* EditCreditPopup Component  */
function EditCreditPopup(props: React.PropsWithChildren<EditCreditPopupProps>) {
  /* EditCreditPopup Variables */
  const popups = usePopupContext();
  const alert = useAlert();
  const [creditLimit, setCreditLimit] = React.useState(props.params.credit.creditLimit);
  const [totalDebt, setTotalDebt] = React.useState(props.params.credit.totalDebt);
  const { mutation: editCredit } = useMutation(mutationEndPoints.editCredit, {
    variables: {
      creditId: props.params.credit.id,
      totalDebt,
      creditLimit,
    },
    refetchQueries: [props.params.refetchQuery],
  });
  /* EditCreditPopup Callbacks */

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      editCredit();
      alert.show('Kredi Guncellendi', { type: 'success' });
      popups.editCredit.hide();
    },
    [editCredit, popups, alert],
  );
  /* EditCreditPopup Lifecycle  */

  return (
    <StyledWrapper>
      <StyledHeader>
        <p>Krediyi Guncelle</p>
      </StyledHeader>
      <form onSubmit={e => handleSubmit(e)}>
        <StyledFormWrapper>
          <label>Toplam Borc</label>
          <StyledInput
            id="edit-credit-total-debt"
            type="number"
            value={totalDebt}
            required
            onChange={e => setTotalDebt(parseInt(e, 10))}
            placeholder="Toplam Borc"
          />
          <label>Kredi Limiti</label>
          <StyledInput
            id="edit-credit-credit-limit"
            type="number"
            value={creditLimit}
            required
            onChange={e => setCreditLimit(parseInt(e, 10))}
            placeholder="Kredi Limiti"
          />
          <StyledButton type="submit" disabled={!totalDebt || !creditLimit}>
            Kaydet
          </StyledButton>
        </StyledFormWrapper>
      </form>
    </StyledWrapper>
  );
}
const PureEditCreditPopup = React.memo(EditCreditPopup);

export { PureEditCreditPopup as EditCreditPopup };
