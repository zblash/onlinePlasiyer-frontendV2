import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { UIButton } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { usePopupContext } from '~/contexts/popup/context';
import { useAlert } from '~/utils/hooks';

/* RemoveBarcodePopup Helpers */
export interface RemoveBarcodePopupParams {
  productId: string;
  barcodeList: string[];
}
interface RemoveBarcodePopupProps {
  params: RemoveBarcodePopupParams;
}

/* RemoveBarcodePopup Constants */

/* RemoveBarcodePopup Styles */
const StyledProductPopupWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 32px 16px 16px 16px;
  border-radius: 4px;
`;
const StyledHeader = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
`;

const StyledButton = styled(UIButton)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  background-color: ${colors.white};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'cursor')};
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: ${props => (props.disabled ? colors.primary : colors.white)};
    background-color: ${props => (props.disabled ? colors.white : colors.primary)};
  }
  :active {
    background-color: ${colors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
/* RemoveBarcodePopup Component  */
function RemoveBarcodePopup(props: React.PropsWithChildren<RemoveBarcodePopupProps>) {
  /* RemoveBarcodePopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const alert = useAlert();
  const [selectedBarcode, setSelectedBarcode] = React.useState({ value: '', label: 'Secim Yapin' });
  const barcodeOptions = props.params.barcodeList.map(barcode => ({ value: barcode, label: barcode }));
  const { mutation: removeBarcode } = useMutation(mutationEndPoints.removeBarcode, {
    variables: {
      id: props.params.productId,
      barcode: selectedBarcode.value,
    },
  });
  /* RemoveBarcodePopup Callbacks */
  const handleSubmit = React.useCallback(() => {
    removeBarcode()
      .then(() => {
        alert.show('Barkod Silindi', { type: 'success' });
      })
      .catch(() => {
        alert.show('Barkod Silinirken Hata Olustu', { type: 'error' });
      })
      .finally(() => {
        popups.removeBarcode.hide();
      });
  }, [removeBarcode, alert, popups.removeBarcode]);
  /* RemoveBarcodePopup Lifecycle  */

  return (
    <StyledProductPopupWrapper>
      <StyledHeader>
        <p>Urunden Barkod Cikar</p>
      </StyledHeader>
      <Select
        className={selectInput}
        isSearchable
        onChange={e => setSelectedBarcode(e)}
        value={selectedBarcode}
        options={barcodeOptions}
        placeholder="Secim Yapin"
      />
      <StyledButton disabled={!selectedBarcode || selectedBarcode.value === ''} onClick={handleSubmit}>
        <span>{t('common.next')}</span>
      </StyledButton>
    </StyledProductPopupWrapper>
  );
}
const PureRemoveBarcodePopup = React.memo(RemoveBarcodePopup);

export { PureRemoveBarcodePopup as RemoveBarcodePopup };
