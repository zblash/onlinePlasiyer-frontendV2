import * as React from 'react';
import axios from 'axios';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { URL } from '../services/api';
import styled, { colors } from '~/styled';
import { UIIcon } from '~/components/ui';
import { useTranslation } from '~/i18n';

const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  text-align: center;
  padding: 16px;
`;

function CheckHealth(props: React.PropsWithChildren<any>) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(URL.concat('/health'))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (hasError) {
    return (
      <StyledPageContainer>
        <UIIcon name="danger" color={colors.danger} size={46} />
        <StyledTitle>{t('not-connect-page.message')}</StyledTitle>
      </StyledPageContainer>
    );
  }

  return props.children;
}

export { CheckHealth };
