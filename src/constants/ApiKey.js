import { Platform } from 'react-native';

export const GOOGLE_MAP = {
  API_KEYS: Platform.select({
    ios: 'AIzaSyBrCmIsXxbG76U0Jz7rA75Wg-Hc0kW-8Ww',
    android: 'AIzaSyBbytCk92gm3MK3Mrs_374RDKf4bz0X1ck',
  }),
};
