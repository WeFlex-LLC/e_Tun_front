// Library Imports
import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local Imports
import {colors, styles} from '../../themes';
import {StackNav} from '../../navigation/NavigationKeys';
import {THEME} from '../../common/constants';
import {changeThemeAction} from '../../redux/action/themeAction';
import {initialStorageValueGet} from '../../utils/asyncstorage';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import { getAsyncStorageData } from '../../utils/helpers';

const Splash = ({navigation}) => {
  const color = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  
  const asyncProcess = async () => {
    const refreshToken = await getAsyncStorageData('REFRESH_TOKEN')
    // console.log('====================================');
    // console.log(refreshToken);
    // console.log('====================================');
    try {
      let asyncData = await initialStorageValueGet();
      let {themeColor, onBoardingValue, acessTokenValue} = asyncData;
      if (!!asyncData) {
        if (!!themeColor) {
          if (themeColor === 'light') {
            dispatch(changeThemeAction(colors.light));
          } else {
            dispatch(changeThemeAction(colors.dark));
          }
        }
        if (refreshToken) {
          navigation.replace(StackNav.CheckPin);
        } else if (!!onBoardingValue) {
          navigation.replace(StackNav.Auth);
        } else {
          navigation.replace(StackNav.onBoarding);
        }
      }
    } catch (e) {
      console.log('error ',e);
    }
  };

  

  useEffect(() => {
    SplashScreen.hide();
    asyncProcess();
  }, []);

  return (
    <CSafeAreaView style={localStyles.container}>
      <ActivityIndicator size="large" color={color.darkColor} />
    </CSafeAreaView>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.itemsCenter,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
