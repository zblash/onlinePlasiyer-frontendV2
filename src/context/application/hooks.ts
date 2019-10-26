import * as React from 'react';
import { Popup } from './helpers';

function usePopup(): Popup {
  const [isShown, setIsShown] = React.useState(false);

  return {
    isShown,
    show: () => {
      setIsShown(true);
    },
    hide: () => {
      setIsShown(false);
    },
  };
}

export { usePopup };
