import React from 'react';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');
  return (
    <WebView
      source={{ uri: `https://github.com/${githubUsername}` }}
      style={{ flex: 1 }}
    />
  );
}
