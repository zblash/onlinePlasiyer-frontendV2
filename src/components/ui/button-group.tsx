import * as React from 'react';
import styled from '~/styled';

type Size = 'small' | 'medium' | 'large';

interface UIButton<T> {
  text: string;
  id: T;
  disabled?: boolean;
}

interface ButtonGroupProps<T> {
  options: [UIButton<T>, UIButton<T>, UIButton<T>];
  onItemClick: (id: T) => void;
  selectedId: T;
  size?: Size;
}
interface ButtonProps {
  isSelected: boolean;
  disabled?: boolean;
  size: Size;
  position: 'left' | 'right' | 'center';
}

const ButtonGroupColors = {
  white: '#fff',
  primary: '#0075ff',
};

const StyledUserTypesWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled.span<ButtonProps>`
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  border-top-left-radius: ${props => (props.position === 'left' ? 4 : 0)}px;
  border-bottom-left-radius: ${props => (props.position === 'left' ? 4 : 0)}px;
  border-top-right-radius: ${props => (props.position === 'right' ? 4 : 0)}px;
  border-bottom-right-radius: ${props => (props.position === 'right' ? 4 : 0)}px;
  border: 1px solid ${ButtonGroupColors.primary};
  border-left-width: ${props => (props.position === 'center' ? 0 : 1)}px;
  border-right-width: ${props => (props.position === 'center' ? 0 : 1)}px;
  padding: ${props => (props.size === 'small' ? 2 : props.size === 'medium' ? 6 : 8)}px 6px;
  color: ${props => (props.isSelected ? ButtonGroupColors.white : 'currentColor')};
  background-color: ${props => (props.isSelected ? ButtonGroupColors.primary : ButtonGroupColors.white)};
`;

function UIButtonGroup<T = string>(props: ButtonGroupProps<T>) {
  const options = props.options.map((item, index) => ({
    ...item,
    position: index === 0 ? 'left' : index === 1 ? 'center' : ('right' as ButtonProps['position']),
  }));
  return (
    <StyledUserTypesWrapper>
      {options.map(item => (
        <StyledButton
          size={props.size || 'medium'}
          key={item.text}
          position={item.position}
          isSelected={props.selectedId === item.id}
          onClick={() => !item.disabled && props.onItemClick(item.id)}
          disabled={item.disabled}
        >
          {item.text}
        </StyledButton>
      ))}
    </StyledUserTypesWrapper>
  );
}

export { UIButtonGroup };
