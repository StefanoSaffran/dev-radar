import styled from 'styled-components';
import colors from '~/styles/colors';

export const Aside = styled.aside`
  width: 320px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  background: ${colors.white};
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px) {
    width: 100%;
  }

  strong {
    font-size: 20px;
    text-align: center;
    display: block;
    color: ${colors.darkGray};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  h1 {
    font-family: 'Dancing Script', cursive;
    display: flex;
    align-items: center;
    color: ${colors.white};
    justify-content: center;
    font-size: 35px;
    position: absolute;
    top: -70px;
    left: 20%;

    svg {
      margin-right: 10px;
    }
  }
  @media (max-width: 1050px) {
    h1 {
      left: 30%;
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  margin-left: 30px;

  @media (max-width: 1050px) {
    margin: 30px 0;
  }
`;

export const DevList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;

    li {
      width: 85vw;
    }
  }
`;
