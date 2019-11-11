import * as React from 'react';
import lodashGet from 'lodash.get';
import styled, { css } from '~/styled';
import { UIInput, UIIcon, UICheckbox, UIButton, Loading } from '~/components/ui';
import { useCategoryPopupReducer } from './reducer';
import { ParentCategoryInput } from './parent-category-input';
import { useApplicationContext } from '~/app/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/*
  CategoryPopup Helpers
*/
export interface CategoryPopupUpdateCategoryValues {
  name: string;
  parentCategoryId?: string;
  isSub: boolean;
  imgSrc: string;
  id: string;
}

type CategoryPopupProps<T> = {
  type: T;
  initialState?: CategoryPopupUpdateCategoryValues;
};

/*
  CategoryPopup Colors
*/
export const CategoryPopupColors = {
  primary: '#0075ff',
  white: '#fff',
  primaryDark: '#0062d4',
  wrapperBackground: '#fff',
  iconBackground: '#fafafa',
  textColor: '#737373',
  inputBorder: '#e6e6e6',
};

/*
  CategoryPopup Strings 
*/
export const CategoryPopupString = {
  isSubCategoryQuestrion: 'Bu Bir Alt Kategorimi ?',
  create: 'Olustur',
  update: 'Guncelle',
};

/*
  CategoryPopup Styles
*/

const StyledCategoryPopupWrapper = styled.div`
  background-color: ${CategoryPopupColors.wrapperBackground};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;

export const inputIconStyle = css`
  padding: 4px 12px;
  background-color: ${CategoryPopupColors.iconBackground};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 1px solid ${CategoryPopupColors.inputBorder};
`;

export const commonInputStyle = css`
  margin: 0 8px;
  color: ${CategoryPopupColors.textColor};
`;

export const StyledInput = styled(UIInput)<{}>`
  margin-bottom: 16px;
  border: 1px solid ${CategoryPopupColors.inputBorder};
  :focus-within {
    border: 1px solid ${CategoryPopupColors.primary};
    .${inputIconStyle} {
      border-right: 1px solid ${CategoryPopupColors.primary};
      color: ${CategoryPopupColors.primary};
    }
    .${commonInputStyle} {
      color: ${CategoryPopupColors.primary};
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
  border: 2px solid ${CategoryPopupColors.primary};
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

const loadingStyle = css``;

const StyledCategoryButton = styled(UIButton)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: 1px solid ${CategoryPopupColors.primary};
  color: ${CategoryPopupColors.primary};
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: #fff;
    background-color: ${CategoryPopupColors.primary};
    .${loadingStyle}:after {
      border-color: ${CategoryPopupColors.white} transparent;
    }
  }
  :active {
    background-color: ${CategoryPopupColors.primaryDark};
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

function _CategoryPopup<T extends 'update' | 'create'>(props: CategoryPopupProps<T>) {
  const { popups } = useApplicationContext();
  const [state, dispatch] = useCategoryPopupReducer({
    name: lodashGet(props.initialState, 'name', ''),
    isSub: lodashGet(props.initialState, 'isSub', false),
    parentId: lodashGet(props.initialState, 'parentCategoryId', null),
  });
  const [imgSrc, setImgSrc] = React.useState(lodashGet(props.initialState, 'imgSrc'));
  const { mutation: categoryAction, loading } = useMutation(
    props.type === 'update' ? mutationEndPoints.updateCategory : mutationEndPoints.createCategory,
    {
      variables: {
        id: lodashGet(props.initialState, 'id'),
        ...state,
      },
      refetchQueries: props.type === 'create' ? [refetchFactory(queryEndpoints.getCategories, { type: 'all' })] : [],
    },
  );
  const __ = (
    <StyledCategoryPopupWrapper>
      <StyledHiddenFilePicker
        hidden
        id={filePickerInputId}
        type="file"
        onChange={event => {
          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
        value={state.name}
        onChange={e => dispatch({ type: 'name', payload: e })}
        id="category-name"
        leftIcon={
          <UIIcon
            className={inputIconStyle}
            name="nameTag"
            size={20}
            color={state.name ? CategoryPopupColors.primary : CategoryPopupColors.textColor}
          />
        }
      />
      <UICheckbox
        value={state.isSub}
        id="is-sub"
        className={checkboxStyle}
        label={<StyledCheckboxText>{CategoryPopupString.isSubCategoryQuestrion}</StyledCheckboxText>}
        onChange={isChecked => {
          dispatch({ type: 'isSub', payload: isChecked });
        }}
      />
      <ParentCategoryInput
        disabled={!state.isSub}
        isHighlighted={!!state.parentId}
        selectedCategoryId={state.parentId}
        onSelect={item => {
          dispatch({
            payload: item.id,
            type: 'parentCategory',
          });
        }}
      />

      <StyledCategoryButton
        disabled={!(imgSrc && state.name && ((state.isSub && state.parentId) || !state.isSub))}
        onClick={() => {
          if (!loading) {
            categoryAction().then(props.type === 'create' ? popups.createCategory.hide : popups.updateCategory.hide);
          }
        }}
      >
        {loading ? (
          <Loading color={CategoryPopupColors.primary} size={22} className={loadingStyle} />
        ) : (
          <span>{props.type === 'create' ? CategoryPopupString.create : CategoryPopupString.update}</span>
        )}
      </StyledCategoryButton>
    </StyledCategoryPopupWrapper>
  );

  /*
  CategoryPopup Lifecycle
  */

  /*
  CategoryPopup Functions
  */

  return __;
}

const CategoryPopup = _CategoryPopup;

export { CategoryPopup };
