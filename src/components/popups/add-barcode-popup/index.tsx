import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { UIButton, UIInput, UIIcon, Loading } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { usePopupContext } from '~/contexts/popup/context';
import { useAlert } from '~/utils/hooks';

/* AddBarcodePopup Helpers */
export interface AddBarcodePopupParams {
  productId: string;
}

interface AddBarcodePopupProps {
  params: AddBarcodePopupParams;
}

/* AddBarcodePopup Constants */

/* AddBarcodePopup Styles */
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

export const commonInputStyle = css`
  margin: 0 8px;
  color: ${colors.gray};
`;

export const inputIconStyle = css`
  padding: 4px 12px;
  background-color: ${colors.whiteSolid};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 1px solid ${colors.lightGray};
`;

export const StyledInput = styled(UIInput)<{}>`
  margin-bottom: 16px;
  border: 1px solid ${colors.lightGray};
  :focus-within {
    border: 1px solid ${colors.primary};
    .${inputIconStyle} {
      border-right: 1px solid ${colors.primary};
      color: ${colors.primary};
    }
    .${commonInputStyle} {
      color: ${colors.primary};
    }
  }
`;

const loadingStyle = css``;

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
    ${props =>
      props.disabled
        ? ''
        : `
    .${loadingStyle}:after {
      border-color: ${colors.white} transparent;
    }
  `}
  }
  :active {
    background-color: ${colors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;

/* AddBarcodePopup Component  */
function AddBarcodePopup(props: React.PropsWithChildren<AddBarcodePopupProps>) {
  /* AddBarcodePopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const alert = useAlert();
  const [barcode, setBarcode] = React.useState();
  const [isBarcodeSaved, setIsBarcodeSaved] = React.useState(false);
  const { mutation: checkProduct, loading: checkProductLoading } = useMutation(mutationEndPoints.hasProduct, {
    variables: { barcode },
  });
  const { mutation: addBarcode } = useMutation(mutationEndPoints.addBarcode, {
    variables: {
      id: props.params.productId,
      barcode,
    },
  });
  /* AddBarcodePopup Callbacks */
  const handleSubmit = React.useCallback(() => {
    checkProduct().then(({ hasBarcode }) => {
      setIsBarcodeSaved(hasBarcode);
      if (!hasBarcode) {
        addBarcode()
          .then(() => {
            alert.show('Barkod Eklendi', { type: 'success' });
          })
          .catch(() => {
            alert.show('Barkod Eklenemedi.', { type: 'error' });
          })
          .finally(() => {
            popups.addBarcode.hide();
          });
      }
    });
  }, [checkProduct, popups.addBarcode, addBarcode, alert]);
  /* AddBarcodePopup Lifecycle  */

  return (
    <StyledProductPopupWrapper>
      <StyledHeader>
        <p>Urune Yeni Barkod Ekle</p>
      </StyledHeader>
      <StyledInput
        inputClassName={commonInputStyle}
        // TODO:move to translation
        placeholder="Barkodu Girin"
        value={barcode}
        onChange={e => setBarcode(e)}
        id="barcode"
        leftIcon={
          <UIIcon
            className={inputIconStyle}
            name={checkProductLoading ? 'loading' : 'qrCode'}
            size={20}
            color={barcode ? colors.primary : colors.gray}
          />
        }
      />
      {/* TODO: move translation */}
      {isBarcodeSaved && <strong style={{ marginBottom: 4 }}>daha once kayit edilmis</strong>}
      <StyledButton disabled={!barcode} onClick={handleSubmit}>
        {checkProductLoading ? (
          <Loading color={colors.primary} size={22} className={loadingStyle} />
        ) : (
          <span>{t('common.add')}</span>
        )}
      </StyledButton>
    </StyledProductPopupWrapper>
  );
}
const PureAddBarcodePopup = React.memo(AddBarcodePopup);

export { PureAddBarcodePopup as AddBarcodePopup };
