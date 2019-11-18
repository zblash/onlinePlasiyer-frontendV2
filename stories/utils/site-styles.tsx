import React from 'react';
import { globalStyleCreator } from '~/styled';

const GlobalStyle = globalStyleCreator();

export default (props: any) => (
  <>
    <GlobalStyle />
    {props.children}
  </>
);
