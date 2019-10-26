import * as React from 'react';
import { UIAutoComplete, UIIcon } from '~/components/ui';
import { StyledInput, commonInputStyle, inputIconStyle, CreateCategoryPopupColors } from '.';
import { queryEndpoints } from '~/services';
import { useKeepValue } from '~/utils/hooks';
import { useQuery } from '~/cache-management/hooks';

/*
  ParentCategoryInput Helpers
*/

interface Category {
  id: string;
  name: string;
}

interface ParentCategoryInputProps {
  disabled?: boolean;
  isHighlighted?: boolean;
  onSelect: (category: Category) => void;
}

/*
  ParentCategoryInput Strings
*/
const ParentCategoryInputStrings = {
  inputPlaceholder: 'Ust Kategoriyi Secin',
};

/*
  ParentCategoryInput Styles
*/

const _ParentCategoryInput: React.SFC<ParentCategoryInputProps> = props => {
  const [autocompleteValue, setAutoCompleteValue] = React.useState('');
  const isActivate = !useKeepValue(props.disabled, false);

  const [parentCategories, getParentCategoriesLoading, getParentCategoriesError] = useQuery(
    queryEndpoints.getCategories,
    { variables: { type: 'parent' }, skip: !isActivate },
  );

  const inputIconElement = (
    <UIIcon
      className={inputIconStyle}
      name={getParentCategoriesLoading ? 'loading' : 'maintenance'}
      size={20}
      color={props.isHighlighted ? CreateCategoryPopupColors.primary : CreateCategoryPopupColors.textColor}
    />
  );
  const __ = (
    <UIAutoComplete
      items={parentCategories || []}
      value={autocompleteValue}
      shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.name}
      renderInput={
        <StyledInput
          value={autocompleteValue}
          disabled={!!(props.disabled || getParentCategoriesLoading || getParentCategoriesError)}
          inputClassName={commonInputStyle}
          placeholder={ParentCategoryInputStrings.inputPlaceholder}
          onChange={e => setAutoCompleteValue(e)}
          id="category-parentid"
          leftIcon={inputIconElement}
        />
      }
      renderItem={(item, highlighted) => (
        // TODO: update this element
        <div
          key={item.id}
          style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: 5, cursor: 'pointer' }}
        >
          {item.name}
        </div>
      )}
      onSelect={item => {
        setAutoCompleteValue(item.name);
        props.onSelect(item);
      }}
    />
  );

  /*
  ParentCategoryInput Lifecycle
  */

  /*
  ParentCategoryInput Functions
  */

  return __;
};

const ParentCategoryInput = React.memo(_ParentCategoryInput, (prevProps, newProps) => {
  if (prevProps.disabled !== newProps.disabled || prevProps.isHighlighted !== newProps.isHighlighted) {
    return false;
  }

  return true;
});

export { ParentCategoryInput };
