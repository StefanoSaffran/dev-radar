import React, { useState, useEffect } from 'react';
import { Callout } from 'react-native-maps';
import { Alert } from 'react-native';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

import api from '~/services/api';
import { connect, disconnect, subscriveToNewDevs } from '~/services/socket';

import {
  Map,
  Mark,
  Avatar,
  DevContainer,
  Name,
  Bio,
  Techs,
  Search,
  Input,
  Button,
} from './styles';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    const loadInitialPosition = async () => {
      try {
        const { granted } = await requestPermissionsAsync();

        if (granted) {
          const { coords } = await getCurrentPositionAsync({
            enableHighAccuracy: true,
          });

          const { latitude, longitude } = coords;

          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          });
        }
      } catch (err) {
        Alert.alert('Atenção', err);
      }
    };

    loadInitialPosition();
  }, []);

  useEffect(() => {
    subscriveToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  const setupWebsocket = () => {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  };

  const loadDevs = async () => {
    const { latitude, longitude } = currentRegion;

    if (!techs) {
      return Alert.alert('Atenção', 'Adicione uma tecnologia');
    }

    const { data } = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setupWebsocket();
    return setDevs(data);
  };

  const handleRegionChanged = region => {
    setCurrentRegion(region);
  };

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <Map
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Mark
            key={dev.id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Avatar
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}
            >
              <DevContainer>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
                <Techs>{dev.techs.join(', ')}</Techs>
              </DevContainer>
            </Callout>
          </Mark>
        ))}
      </Map>
      <Search>
        <Input
          style={{
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
          }}
          placeholder="*Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={loadDevs}
          value={techs}
          onChangeText={setTechs}
        />
        <Button onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </Button>
      </Search>
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
