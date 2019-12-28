import * as React from 'react';
import styled, { colors } from '~/styled';

type Size = 'small' | 'medium' | 'large';
type Position = 'left' | 'right' | 'center';

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
  position: Position;
}
const SIZE_TO_PADDING_MAP: Record<Size, number> = {
  large: 8,
  medium: 6,
  small: 2,
};
const INDEX_TO_POSITION_MAP: Record<number, Position> = {
  0: 'left',
  1: 'center',
  2: 'right',
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
  border: 1px solid ${colors.primary};
  border-left-width: ${props => (props.position === 'center' ? 0 : 1)}px;
  border-right-width: ${props => (props.position === 'center' ? 0 : 1)}px;
  padding: ${props => SIZE_TO_PADDING_MAP[props.size]}px 6px;
  color: ${props => (props.isSelected ? colors.white : 'currentColor')};
  background-color: ${props => (props.isSelected ? colors.primary : colors.white)};
`;

function UIButtonGroup<T = string>(props: ButtonGroupProps<T>) {
  const options = props.options.map((item, index) => ({
    ...item,
    position: INDEX_TO_POSITION_MAP[index],
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
