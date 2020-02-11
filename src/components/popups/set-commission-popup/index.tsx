import * as React from 'react';
import styled, { colors } from '~/styled';
import { UIInput, UIButton } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useAlert } from '~/utils/hooks';
import { usePopupContext } from '~/contexts/popup/context';

/* SetCommissionPopup Helpers */
export interface SetCommissionPopupParams {
  userId: string;
  commission: number;
  refetchQuery?: any;
}
interface SetCommissionPopupProps {
  params: SetCommissionPopupParams;
}
/* SetCommissionPopup Constants */

/* SetCommissionPopup Styles */
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
/* SetCommissionPopup Component  */
function SetCommissionPopup(props: React.PropsWithChildren<SetCommissionPopupProps>) {
  /* SetCommissionPopup Variables */
  const alert = useAlert();
  const popups = usePopupContext();
  const [commission, setCommission] = React.useState(props.params.commission);
  const { mutation: updateCommission } = useMutation(mutationEndPoints.updateCommission, {
    variables: {
      id: props.params.userId,
      commission,
    },
    refetchQueries: [props.params.refetchQuery],
  });
  /* SetCommissionPopup Callbacks */
  const handleSubmit = React.useCallback(() => {
    updateCommission().finally(() => {
      alert.show('Komisyon Guncellendi', { type: 'success' });
      popups.setCommission.hide();
    });
  }, [updateCommission, alert, popups]);
  /* SetCommissionPopup Lifecycle  */

  return (
    <StyledWrapper>
      <StyledHeader>
        <p>Komisyonu Guncelle</p>
      </StyledHeader>
      <StyledFormWrapper>
        <StyledInput
          id="commission"
          type="number"
          step="0.1"
          value={commission}
          onChange={e => {
            if (parseFloat(e) < 100) {
              setCommission(parseFloat(e));
            }
          }}
          placeholder="Komisyon"
        />
        <StyledButton disabled={!commission} type="button" onClick={handleSubmit}>
          Kaydet
        </StyledButton>
      </StyledFormWrapper>
    </StyledWrapper>
  );
}
const PureSetCommissionPopup = React.memo(SetCommissionPopup);

export { PureSetCommissionPopup as SetCommissionPopup };
