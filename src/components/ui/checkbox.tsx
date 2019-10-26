import * as React from 'react';
import styled, { css, StylableProps } from '~/styled';

interface CheckboxProps extends StylableProps {
  id: string;
  label: React.ReactElement | string;
  hasError?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const StyledLabel = styled.label`
  margin-left: 8px;
  cursor: pointer;
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

function UICheckbox(props: CheckboxProps) {
  const { id, label, hasError } = props;
  const inputClassname = `
      m-checkbox__input m-checkbox--switch__input
      ${hasError && 'm-checkbox--has-error__input'}
    `;

  return (
    <StyledCheckboxWrapper className={props.className}>
      <input
        type="checkbox"
        className={inputClassname}
        id={id}
        onChange={e => {
          if (props.onChange) {
            props.onChange(e.target.checked);
          }
        }}
      />
      <StyledLabel>{label}</StyledLabel>
    </StyledCheckboxWrapper>
  );
}

export { UICheckbox };

// TODO: refactor css
const primaryColor = '#0075ff';

css.global`
  .m-checkbox__input {
    position: relative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    cursor: pointer;
    border: 2px solid ${primaryColor};
  }
  .m-checkbox__input::before {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    transition: all 0.1s;
    background: ${primaryColor};
  }
  .m-checkbox__input:checked::before,
  .m-checkbox__input:disabled {
    border-color: #5a5358;
    cursor: default;
  }
  .m-checkbox__input:disabled::before {
    background-color: #5a5358;
  }
  .m-checkbox--has-error__input {
    border-color: red;
    background-color: rgba(255, 0, 0, 0.2);
  }
  .m-checkbox--has-error__input::before {
    background-color: red;
  }
  .m-checkbox--switch__input {
    width: 32px;
    height: 16px;
    border: 2px solid #5a5358;
    border-radius: 16px;
  }
  .m-checkbox--switch__input::before {
    top: 2px;
    right: 18px;
    bottom: 2px;
    left: 2px;
    border-radius: 50%;
    background: #5a5358;
  }
  .m-checkbox--switch__input:checked {
    border-color: ${primaryColor};
  }

  .m-checkbox--switch__input:checked::before {
    right: 2px;
    left: 18px;
    background: ${primaryColor};
  }
`;
