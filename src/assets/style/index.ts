/* eslint-disable global-require */
import { createGlobalStyle } from '~/styled';
import { globalStyle } from '~/styled/css';

import '~/assets/style/app.scss';
import 'rc-tooltip/assets/bootstrap_white.css';

const GlobalStyle = createGlobalStyle`${globalStyle()}`;

export { GlobalStyle };
