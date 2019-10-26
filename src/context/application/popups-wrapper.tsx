import React from 'react';
import { Popups, Popup as ContextPopupHelper } from './helpers';
import { CreateCategoryPopup } from '~/components/common/popups/create-category';
import { Popup } from '~/components/ui/popup';

interface PopupsWrapperProps extends Record<keyof Popups, ContextPopupHelper> {}

function PopupsWrapper(props: PopupsWrapperProps) {
  return (
    <>
      <Popup onClose={props.createCategory.hide} isShown={props.createCategory.isShown}>
        <CreateCategoryPopup />
      </Popup>
    </>
  );
}

export { PopupsWrapper };
