import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { appReducer } from '@/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['error', 'status'],
};

export const store = createStore(persistReducer(persistConfig, appReducer), applyMiddleware(thunk));

export const persistor = persistStore(store);
