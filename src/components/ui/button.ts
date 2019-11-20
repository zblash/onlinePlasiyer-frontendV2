import styled, { colors } from '~/styled';

export const UIButton = styled.button`
  // reset button style
  background: none;
  color: inherit;
  padding: 0;
  border:none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  user-select: none;

  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color:${colors.white}
  padding: 4px 8px;
  border-radius: 4px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primary};
  }
`;
