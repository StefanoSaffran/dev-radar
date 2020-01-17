import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, HeaderText } from './styles';

const Header = () => {
  return (
    <Container>
      <MaterialCommunityIcons
        name="radar"
        color="#FFF"
        size={30}
        style={{ marginTop: 15 }}
      />
      <HeaderText>DevRadar</HeaderText>
    </Container>
  );
};

export default Header;
