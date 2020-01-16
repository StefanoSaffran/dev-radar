import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  padding: 20px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  background: ${colors.white};

  h1 {
    text-align: center;
    color: ${colors.darkGray};
  }
  form {
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

    div.coordinates {
      margin-top: 20px;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;

      label + label {
        margin-top: 0;
      }
    }
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
    width: 112px;
    height: 36px;
    border: 0;
    border-radius: 4px;
    color: ${colors.white};
    background: ${colors.backButton};
    font-weight: bold;
    transition: background 0.5s;

    &:hover {
      background: ${darken(0.06, `${colors.backButton}`)};
    }
  }

  button + button {
    background: ${colors.submitButton};

    &:hover {
      background: ${darken(0.06, `${colors.submitButton}`)};
    }
  }
`;
