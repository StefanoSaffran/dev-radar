import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Dev = styled.li`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }
  }

  p {
    color: ${colors.gray};
    font-size: 14px;
    line-height: 20px;
    margin-top: 10px;
  }
`;

export const ListButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  a {
    color: ${darken(0.3, `${colors.primary}`)};
    transition: color 0.5s;

    &:hover {
      color: ${darken(0.1, `${colors.primary}`)};
    }
  }

  button {
    border: 0;
    background: none;
    color: ${darken(0.3, `${colors.primary}`)};
    transition: color 0.5s;

    &:hover {
      color: ${darken(0.1, `${colors.primary}`)};
    }
  }
`;

export const DevInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  margin-left: 10px;
  position: relative;

  button {
    background: none;
    border: 0;
    position: absolute;
    top: -13px;
    right: -5px;
  }

  strong {
    display: block;
    font-size: 16px;
    color: ${colors.darkGray};
  }

  span {
    font-size: 13px;
    color: ${colors.lightGray};
    margin-top: 2px;
  }
`;
