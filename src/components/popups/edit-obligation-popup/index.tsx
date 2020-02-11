import * as React from 'react';
import styled, { colors } from '~/styled';
import { IObligationTotals } from '~/services/helpers/backend-models';
import { UIInput, UIButton } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
import { useAlert } from '~/utils/hooks';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';

/* EditObligationPopup Helpers */
export interface EditObligationPopupParams {
  obligation: IObligationTotals;
  refetchQuery?: any;
}
interface EditObligationPopupProps {
  params: EditObligationPopupParams;
}

/* EditObligationPopup Constants */

/* EditObligationPopup Styles */
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
/* EditObligationPopup Component  */
function EditObligationPopup(props: React.PropsWithChildren<EditObligationPopupProps>) {
  /* EditObligationPopup Variables */
  const popups = usePopupContext();
  const alert = useAlert();
  const [receivable, setReceivable] = React.useState(props.params.obligation.receivable);
  const [totalDebt, setTotalDebt] = React.useState(props.params.obligation.debt);
  const { mutation: editObligation } = useMutation(mutationEndPoints.editObligation, {
    variables: {
      obligationId: props.params.obligation.id,
      debt: totalDebt,
      receivable,
    },
    refetchQueries: [props.params.refetchQuery],
  });
  /* EditObligationPopup Callbacks */
  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      editObligation();
      alert.show('Borc Guncellendi', { type: 'success' });
      popups.editObligation.hide();
    },
    [editObligation, popups, alert],
  );
  /* EditObligationPopup Lifecycle  */

  return (
    <StyledWrapper>
      <StyledHeader>
        <p>Satici Sistem Borcunu Guncelle</p>
      </StyledHeader>
      <form onSubmit={e => handleSubmit(e)}>
        <StyledFormWrapper>
          <label>Toplam Borc</label>
          <StyledInput
            id="edit-credit-total-debt"
            type="number"
            step="0.1"
            value={totalDebt}
            required
            onChange={e => setTotalDebt(parseFloat(e))}
            placeholder="Toplam Borc"
          />
          <label>Toplam Alacak</label>
          <StyledInput
            id="edit-credit-credit-limit"
            type="number"
            step="0.1"
            value={receivable}
            required
            onChange={e => setReceivable(parseFloat(e))}
            placeholder="Toplam Alacak"
          />
          <StyledButton type="submit" disabled={!totalDebt && !receivable}>
            Kaydet
          </StyledButton>
        </StyledFormWrapper>
      </form>
    </StyledWrapper>
  );
}
const PureEditObligationPopup = React.memo(EditObligationPopup);

export { PureEditObligationPopup as EditObligationPopup };
