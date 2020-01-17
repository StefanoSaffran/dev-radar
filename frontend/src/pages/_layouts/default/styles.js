import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 30px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
  }
`;
