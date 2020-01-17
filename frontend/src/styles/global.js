import { createGlobalStyle } from 'styled-components';

import { darken } from 'polished';
import colors from '~/styles/colors';

import 'react-toastify/dist/ReactToastify.css';
import 'react-activity/dist/react-activity.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Dancing+Script:400,700&display=swap');

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: linear-gradient(
    45deg,
    ${colors.primary},
    ${darken(0.5, `${colors.primary}`)}
  );
  }

  body, input, textarea, button, input::placeholder, textarea::placeholder {
    font: 14px 'Roboto', sans-serif;;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
