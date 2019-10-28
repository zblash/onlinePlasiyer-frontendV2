import * as React from 'react';
import { Popup } from './helpers';

function usePopup<T = undefined>(): Popup<T> {
  const [isShown, setIsShown] = React.useState(false);
  const [options, setOptions] = React.useState(null);

  return {
    isShown,
    options,
    show: _options => {
      setOptions(_options);
      setIsShown(true);
    },
    hide: () => {
      setIsShown(false);
    },
  };
}

export { usePopup };
