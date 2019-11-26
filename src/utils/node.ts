import * as React from 'react';

function scrollToRef(ref: React.RefObject<any>) {
  if (ref.current) {
    window.scrollTo({
      top: ref.current.offsetTop - 150,
      behavior: 'smooth',
    });
  }
}

export { scrollToRef };
