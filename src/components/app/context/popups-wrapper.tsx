import React from 'react';
import { Popups, Popup as ContextPopupHelper } from './helpers';
import { CategoryPopup } from '~/components/common/popups/category';
import { Popup } from '~/components/ui/popup';

interface PopupsWrapperProps extends Record<keyof Popups, ContextPopupHelper> {}

function PopupsWrapper(props: PopupsWrapperProps) {
  return (
    <>
      <Popup onClose={props.createCategory.hide} isShown={props.createCategory.isShown}>
        <CategoryPopup type="create" />
      </Popup>
      <Popup onClose={props.updateCategory.hide} isShown={props.updateCategory.isShown}>
        <CategoryPopup type="update" initialState={props.updateCategory.options} />
      </Popup>
    </>
  );
}

export { PopupsWrapper };
