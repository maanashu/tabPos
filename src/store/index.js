import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer as tabPosRootReducer } from '@/reducers';
import { rootReducer as mPOSRootReducer } from '@mPOS/reducers';
import { isTablet } from 'react-native-device-info';
import Reactotron from './../../ReactotronConfig';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['error', 'status'],
};

// const rootReducer = isTablet() ? tabPosRootReducer : mPOSRootReducer;
const rootReducer = tabPosRootReducer;

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  // compose(applyMiddleware(thunk), Reactotron.createEnhancer())
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
