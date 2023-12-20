import Reactotron from 'reactotron-react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: scriptHostname }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

export default reactotron;
