import { createGlobalStyle } from '~/styled';
import { globalStyle } from '~/styled/css';

import 'rc-tooltip/assets/bootstrap_white.css';
import '~/assets/style/app.scss';

const GlobalStyle = createGlobalStyle`${globalStyle()}`;

export { GlobalStyle };
