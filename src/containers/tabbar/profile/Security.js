// Library import
import {
  BackHandler,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
// import Biometrics, { BiometryTypes, FaceID } from 'react-native-biometrics';
import TouchID from 'react-native-touch-id';

export default Security = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
 
  const [isAuth, setIsAuth] = useState(false);
  // const optionalConfigObject = {
  //   title: 'Authentication Required', // Android
  //   imageColor: '#e00606', // Android
  //   imageErrorColor: '#ff0000', // Android
  //   sensorDescription: 'Touch sensor', // Android
  //   sensorErrorDescription: 'Failed', // Android
  //   cancelText: 'Cancel', // Android
  //   fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  //   unifiedErrors: false, // use unified error messages (default false)
  //   passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  // };

  // const [isEnabled, setIsEnabled] = React.useState({
  //   // rememberMe: false,
  //   faceId: false,
    
  // });

  // useEffect(() => {
  //     handleBiometric();
  // });

  // const handleBiometric = () => {
  //   TouchID.isSupported(optionalConfigObject).then((biometryType) => {
  //     if (biometryType === 'FaceID') {
  //       // console.log('FaceID is supported.');
  //       // if (isAuth) {
  //       //   return null
  //       // }
  //       TouchID.authenticate('', optionalConfigObject).then((success) => {
  //         console.log('Success1', success);
  //       }).catch(err => {
  //       BackHandler.exitApp();
  //   });
  //   } else {
  //       // console.log('TouchID is supported.');
  //       // if (isAuth) {
  //       //   return null
  //       // }
  //       TouchID.authenticate('', optionalConfigObject).then((success) => {
  //         console.log('Success2', success);
  //       }).catch(err => {
  //       BackHandler.exitApp();
  //   });
  //   }
  // });
  // };

  // const SecurityData = [ 
  //   {
  //     title: strings.faceId,
  //     rightIcon: true,
  //     value: isEnabled.faceId,
  //     toggleSwitch: () =>
  //       setIsEnabled({
  //         ...isEnabled,
  //         faceId: isEnabled.faceId ? false : true,
  //       }),
  //   }
  // ];
  
  const onPressChangePin = () => navigation.navigate(StackNav.UpdatePin);
  const onPressChangePassword = () =>
    navigation.navigate(StackNav.CreateNewPassword);

  // const RenderData = data => {
  //   return (
  //     <TouchableOpacity style={localStyles.settingsContainer}>
  //       <CText type="s18">{data.item.title}</CText>
  //       <View style={localStyles.rightContainer}>
  //         {!!data?.item?.rightIcon ? (
  //           <Switch
  //             trackColor={{
  //               false: colors.grayScale3,
  //               true: !colors.dark ? colors.grayScale5 : colors.primary,
  //             }}
  //             thumbColor={colors.white}
  //             onValueChange={data?.item?.toggleSwitch}
  //             value={data?.item?.value}
  //           />
  //         ) : (
  //           <Ionicons
  //             name="chevron-forward-outline"
  //             size={moderateScale(20)}
  //             color={colors.white}
  //           />
  //         )}
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <CSafeAreaView>
      <CHeader title={strings.security} />
      <View style={styles.ph20}>

        {/* <FlatList
          data={SecurityData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <RenderData item={item} />}
          bounces={false}
          showsVerticalScrollIndicator={false}
        /> */}
        
        <CButton
          title={strings.changePin}
          type={'S16'}
          containerStyle={localStyles.btnContainer}
          onPress={onPressChangePin}
        />
        <CButton
          title={strings.changePassword}
          type={'S16'}
          containerStyle={localStyles.btnContainer}
          onPress={onPressChangePassword}
        />
      </View>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  settingsContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt20,
  },
  rightContainer: {
    ...styles.flex,
    ...styles.rowEnd,
  },
  btnContainer: {
    ...styles.center,
    width: '100%',
    alignSelf: 'center',
    ...styles.mt25,
  },
});
