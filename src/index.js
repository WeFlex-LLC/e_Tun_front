import {StatusBar} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigator from './navigation';
import {styles} from './themes';
import CSafeAreaView from './components/common/CSafeAreaView';
import '../ignoreWarnings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from './i18n/strings';
import {changeLanguageAction} from './redux/action/profileAction';
import {getAsyncStorageData, setAsyncStorageData} from './utils/helpers';

const App = () => {
  const colors = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  (async function getLang() {
    try {
      const LanguageData = JSON.parse(await AsyncStorage.getItem('lang'));
      let lng = await LanguageData;
      strings.setLanguage(lng.language);
      dispatch(changeLanguageAction(lng.language));
    } catch (error) {
      console.log(error);
    }
  })();

  const getNewToken = async () => {
    const refreshToken = await getAsyncStorageData('REFRESH_TOKEN');
    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/auth/user/token',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );
      const res = await response.json();
      if (res.access_token) {
        await setAsyncStorageData('ACCESS_TOKEN', res.access_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  setInterval(() => {
    getNewToken();
  }, 880000);

  return (
    <CSafeAreaView style={styles.flex}>
      <StatusBar
        barStyle={colors.dark == 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />
    </CSafeAreaView>
  );
};

export default App;
