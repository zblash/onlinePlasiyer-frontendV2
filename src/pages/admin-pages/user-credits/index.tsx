import * as React from 'react';
import styled, { colors } from '~/styled';

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
  /* UserCredits Callbacks */

  /* UserCredits Lifecycle  */

  return <StyledUserCreditsWrapper>d</StyledUserCreditsWrapper>;
}
const PureUserCredits = React.memo(UserCredits);

export { PureUserCredits as UserCredits };
