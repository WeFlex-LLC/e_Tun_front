// Library import
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

// Local import
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';
import typography from '../../themes/typography';
import SuccessModal from '../../components/models/SuccessModal';
import {RefundSuccessfullIcon} from '../../assets/svgs';
import {getAsyncStorageData, setAsyncStorageData} from '../../utils/helpers';
import { changeUserInfoNameAction } from '../../redux/action/UserInfoName';

const CheckPin = ({navigation, route}) => {
  const colors = useSelector(state => state.theme.theme);
  const title = route.params?.title;
  const [pin, setPin] = useState('');
  const [Status, setStatus] = useState(route.params?.status);
  const [IncorrectPin, setIncorrectPin] = useState('');
  const [RefreshToken, setRefreshToken] = useState();
  const dispatch = useDispatch();

  _retrieveInfoUser = async () => {
    const refreshToken = await getAsyncStorageData('REFRESH_TOKEN');
    if (refreshToken !== null) {
      setRefreshToken(refreshToken);
    }
  };
  useEffect(() => {
    _retrieveInfoUser();
  }, []);
  11;

  const AsyncCheckPin = async () => {
    if (!Status) {
      try {
        const response = await fetch(
          'https://etunbackend-production.up.railway.app/auth/user/pin',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RefreshToken}`,
            },
            body: JSON.stringify({
              pin: pin,
            }),
          },
        );
        const res = await response.json();
        
        if (res.access_token) {
          await setAsyncStorageData('ACCESS_TOKEN', res.access_token);
          await setAsyncStorageData('FULLNAME', res.user.fullName);
          await setAsyncStorageData('SUB', res.user.sub);
          await setAsyncStorageData('EMAIL', res.user.email);
          dispatch(changeUserInfoNameAction(res.user.fullName));
          // await setAsyncStorageData('IMG', res.user.img);
          setStatus(true);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: StackNav.TabBar,
              },
            ],
          });
        }else if(res.message){
          setIncorrectPin(res.message)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onPinChange = code => setPin(code);

  const ErrorMessage = () => {

    return (
      <View>
          <CText type="b20" align={"center"} style={{color:"red"}}>{IncorrectPin}</CText>
      </View>
    )
  }

  return (
    <CSafeAreaView>
      {/* <CHeader title={"Check Pin"} /> */}
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.root}>
          <CText type={'r18'} align={'center'}>
            {'Check Pin'}
          </CText>
          <OTPInputView
            pinCount={6}
            code={pin}
            onCodeChanged={onPinChange}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[
              localStyles.pinInputStyle,
              {
                color: colors.textColor,
                backgroundColor: colors.inputBg,
                borderColor: colors.borderColor,
              },
            ]}
            codeInputHighlightStyle={{
              borderColor: colors.textColor,
            }}
            style={localStyles.inputStyle}
            secureTextEntry={true}
          />
          <ErrorMessage/>
        </View>
        <CButton
          type={'S16'}
          title={strings.continue}
          onPress={AsyncCheckPin}
          containerStyle={localStyles.btnContainerStyle}
        />
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default CheckPin;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph30,
    ...styles.justifyCenter,
    ...styles.flex,
  },
  pinInputStyle: {
    height: getHeight(60),
    width: moderateScale(45),
    borderRadius: moderateScale(15),
    ...typography.fontSizes.f36,
    ...typography.fontWeights.SemiBold,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
  inputStyle: {
    height: getHeight(60),
    ...styles.mv30,
  },
});
