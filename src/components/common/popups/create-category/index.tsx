import * as React from 'react';
import styled, { css } from '~/styled';
import { UIInput, UIIcon, UICheckbox, UIButton, Loading } from '~/components/ui';
import { useCreateCategoryReducer } from './reducer';
import { useApplicationContext } from '~/utils/hooks';
import { ParentCategoryInput } from './parent-category-input';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { useMutation } from '~/cache-management/hooks';

/*
  CreateCategoryPopup Helpers
*/
interface CreateCategoryPopupProps {}

/*
  CreateCategoryPopup Colors
*/
export const CreateCategoryPopupColors = {
  primary: '#0075ff',
  white: '#fff',
  primaryDark: '#0062d4',
  wrapperBackground: '#fff',
  iconBackground: '#fafafa',
  textColor: '#737373',
  inputBorder: '#e6e6e6',
};

/*
  CreateCategoryPopup Styles
*/

const StyledCreateCategoryPopupWrapper = styled.div`
  background-color: ${CreateCategoryPopupColors.wrapperBackground};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;

export const inputIconStyle = css`
  padding: 4px 12px;
  background-color: ${CreateCategoryPopupColors.iconBackground};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 1px solid ${CreateCategoryPopupColors.inputBorder};
`;

export const commonInputStyle = css`
  margin: 0 8px;
  color: ${CreateCategoryPopupColors.textColor};
`;

export const StyledInput = styled(UIInput)<{}>`
  margin-bottom: 16px;
  border: 1px solid ${CreateCategoryPopupColors.inputBorder};
  :focus-within {
    border: 1px solid ${CreateCategoryPopupColors.primary};
    .${inputIconStyle} {
      border-right: 1px solid ${CreateCategoryPopupColors.primary};
      color: ${CreateCategoryPopupColors.primary};
    }
    .${commonInputStyle} {
      color: ${CreateCategoryPopupColors.primary};
    }
  }
`;

const StyledCheckboxText = styled.span`
  font-size: 14.5px;
`;
const StyledCategoryImgWrapper = styled.label`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${CreateCategoryPopupColors.primary};
  cursor: pointer;
`;
const StyledCategoryImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
const StyledHiddenFilePicker = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -999;
  pointer-events: none;
`;

const StyledLoading = styled(Loading)``;

const StyledCreateCategoryButton = styled(UIButton)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: 1px solid ${CreateCategoryPopupColors.primary};
  color: ${CreateCategoryPopupColors.primary};
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: #fff;
    background-color: ${CreateCategoryPopupColors.primary};
  }
  :active {
    background-color: ${CreateCategoryPopupColors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;
const checkboxStyle = css`
  margin-bottom: 16px;
`;

const imageIconStyle = css`
  padding: 8px;
`;

const filePickerInputId = 'image-picker-create-category-popup';

const _CreateCategoryPopup: React.SFC<CreateCategoryPopupProps> = props => {
  const { popups } = useApplicationContext();
  const [state, dispatch] = useCreateCategoryReducer();
  const [imgSrc, setImgSrc] = React.useState(null);
  const [createCategory, _, createCategoryLoading] = useMutation(mutationEndPoints.createCategory, {
    variables: { ...state, parentId: state.parentCategory ? state.parentCategory.id : null },
    refetchQueries: [
      {
        query: queryEndpoints.getCategories,
        variables: { type: 'all' },
      },
    ],
  });
  const __ = (
    <StyledCreateCategoryPopupWrapper>
      <StyledHiddenFilePicker
        hidden
        id={filePickerInputId}
        type="file"
        onChange={event => {
          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => {
              // @ts-ignore
              setImgSrc(e.target.result as string);
              dispatch({ payload: file, type: 'uploadFile' });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <StyledCategoryImgWrapper htmlFor={filePickerInputId}>
        {imgSrc && <StyledCategoryImg src={imgSrc} />}
        {!imgSrc && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
      </StyledCategoryImgWrapper>
      <StyledInput
        inputClassName={commonInputStyle}
        placeholder="Kategori Ismini Girin"
        onChange={e => dispatch({ type: 'name', payload: e })}
        id="category-name"
        leftIcon={
          <UIIcon
  className={inputIconStyle}
  name="nameTag"
  size={20}
  color={state.name ? CreateCategoryPopupColors.primary : CreateCategoryPopupColors.textColor}
/>
        }
      />
      <UICheckbox
        id="is-sub"
        className={checkboxStyle}
        label={<StyledCheckboxText>Bu bir alt kategorimi ?</StyledCheckboxText>}
        onChange={isChecked => {
          dispatch({ type: 'isSub', payload: isChecked });
        }}
      />
      <ParentCategoryInput
        disabled={!state.isSub}
        isHighlighted={!!state.parentCategory}
        onSelect={item => {
          dispatch({
            payload: item,
            type: 'parentCategory',
          });
        }}
      />

      <StyledCreateCategoryButton
        disabled={!(imgSrc && state.name && ((state.isSub && state.parentCategory) || !state.isSub))}
        onClick={() => {
          if (!createCategoryLoading) {
            createCategory().then(popups.createCategory.hide);
          }
        }}
      >
        {createCategoryLoading ? (
          <StyledLoading color={CreateCategoryPopupColors.white} size={22} />
        ) : (
          <span>Olustur</span>
        )}
      </StyledCreateCategoryButton>
    </StyledCreateCategoryPopupWrapper>
  );

  /*
  CreateCategoryPopup Lifecycle
  */

  /*
  CreateCategoryPopup Functions
  */

  return __;
};

const CreateCategoryPopup = _CreateCategoryPopup;

export { CreateCategoryPopup };
