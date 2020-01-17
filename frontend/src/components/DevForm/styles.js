import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  label {
    color: ${colors.label};
    font-size: 14px;
    font-weight: bold;
    display: block;

    input {
      width: 100%;
      height: 32px;
      font-size: 14px;
      color: ${colors.gray};
      border: 0;
      border-bottom: 1px solid ${colors.lightBorder};
    }
  }
  label + label {
    margin-top: 20px;
  }

  div {
    margin-top: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;

    label + label {
      margin-top: 0;
    }
  }

  button[type='submit'] {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    margin-top: 30px;
    background: ${colors.submitButton};
    border-radius: 3px;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: ${colors.white};
    transition: background 0.5s;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background: ${darken(0.06, `${colors.submitButton}`)};
    }
  }
`;
