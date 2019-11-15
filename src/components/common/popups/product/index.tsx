import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { UIIcon, UIInput, UIButton, Loading } from '~/components/ui';

/*  ProductPopup Helpers */
interface ProductPopupProps {}

/* ProductPopup Style Constants */

/* ProductPopup Styles */
const StyledProductPopupWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 32px 16px 16px 16px;
  border-radius: 4px;
`;

export const commonInputStyle = css`
  margin: 0 8px;
  color: ${colors.textColor};
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
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: #fff;
    background-color: ${colors.primary};
    .${loadingStyle}:after {
      border-color: ${colors.white} transparent;
    }
  }
  :active {
    background-color: ${colors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;

function ProductPopup(props: React.PropsWithChildren<ProductPopupProps>) {
  const { t } = useTranslation();
  const [barcode, setBarcode] = React.useState('');
  const [isBarcodeCorrect, setIsBarcodeCorrect] = React.useState(false);
  const { mutation } = useMutation(mutationEndPoints.createProduct);
  const { mutation: checkProduct, loading: checkProductLoading, error: checkProductError } = useMutation(
    mutationEndPoints.checkProduct,
    {
      variables: { barcode },
    },
  );

  const __ = <StyledProductPopupWrapper>{t('common.hello')}</StyledProductPopupWrapper>;
  const barcodeInput = (
    <StyledProductPopupWrapper>
      <StyledInput
        inputClassName={commonInputStyle}
        // TODO:move to translation
        placeholder="Kategori Ismini Girin"
        value={barcode}
        onChange={e => setBarcode(e)}
        id="category-name"
        leftIcon={
          <UIIcon
            className={inputIconStyle}
            name={checkProductLoading ? 'loading' : 'qrCode'}
            size={20}
            color={barcode ? colors.primary : colors.gray}
          />
        }
      />
      <StyledButton disabled={!barcode} onClick={() => checkProduct().catch(e => setIsBarcodeCorrect(true))}>
        {checkProductLoading ? (
          <Loading color={colors.primary} size={22} className={loadingStyle} />
        ) : (
          <span>Ileri</span>
        )}
      </StyledButton>
    </StyledProductPopupWrapper>
  );

  /* ProductPopup Lifecycle  */

  /* ProductPopup Functions  */

  if (!isBarcodeCorrect) {
    return barcodeInput;
  }

  return __;
}

const _ProductPopup = ProductPopup;

export { _ProductPopup as ProductPopup };
