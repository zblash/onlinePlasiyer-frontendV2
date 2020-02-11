import * as React from 'react';
import styled, { colors } from '~/styled';
import { useTranslation } from '~/i18n';

/* UserCredits Helpers */
interface UserCreditsProps {}

/* UserCredits Constants */

/* UserCredits Styles */
const StyledUserCreditsWrapper = styled.div`
  background-color: ${colors.primary};
`;

/* UserCredits Component  */
function UserCredits(props: React.PropsWithChildren<UserCreditsProps>) {
  /* UserCredits Variables */
  const { t } = useTranslation();
  /* UserCredits Callbacks */

  /* UserCredits Lifecycle  */

  return <StyledUserCreditsWrapper>d</StyledUserCreditsWrapper>;
}
const PureUserCredits = React.memo(UserCredits);

export { PureUserCredits as UserCredits };
