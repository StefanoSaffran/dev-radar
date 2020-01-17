import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Header from '~/components/Header';
import Main from '~/pages/Main';
import Profile from '~/pages/Profile';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          header: () => <Header />,
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Perfil no GitHub',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#4d85ee',
        },
      },
    }
  )
);

export default Routes;
