import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from '~/styled';
import { objectKeys } from '~/utils';
import SiteStyles from './utils/site-styles';
import { UIIcon, icons } from '~/components/ui/icon';

const iconNames = objectKeys(icons);

const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledIconWrapper = styled.div`
  padding: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const iconStyle = css`
  margin-bottom: 4px;
`;
storiesOf('Icons', module).add('All Icons', () => (
  <SiteStyles>
    <PageContainer>
      {iconNames.map(name => (
        <StyledIconWrapper key={name}>
          <UIIcon name={name} className={iconStyle} />
          <strong>{name}</strong>
        </StyledIconWrapper>
      ))}
    </PageContainer>
  </SiteStyles>
));
