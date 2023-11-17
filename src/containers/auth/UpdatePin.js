// Library import
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
import {getAsyncStorageData} from '../../utils/helpers';

const UpdatePin = ({navigation, route}) => {
  const colors = useSelector(state => state.theme.theme);
  const [OldPin, setOldPin] = useState('');
  const [NewPin, setNewPin] = useState('');
  const dispatch = useDispatch();

  const AsyncChangePin = async () => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');

      try {
        const response = await fetch(
          'https://etunbackend-production.up.railway.app/api/users/pin',
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              oldPin: OldPin,
              newPin: NewPin,
            }),
          },
        );
        const res = await response.json();
        if (res.success) {
          navigation.navigate(StackNav.TabBar);
        }
      } catch (error) {
        console.log(error);
      }
    
  };

  const onOldPinChange = code => setOldPin(code);
  const onNewPinChange = code => setNewPin(code);

  return (
    <CSafeAreaView>
      <CHeader title={'Change Pin'} />
      <KeyBoardAvoidWrapper contentContainerStyle={localStyles.Container}>
        <View style={localStyles.root}>
          <CText type={'b18'} align={'center'}>
            {'Old Pin'}
          </CText>
          <OTPInputView
            pinCount={6}
            code={OldPin}
            onCodeChanged={onOldPinChange}
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
        </View>
        <View style={localStyles.root}>
          <CText type={'b18'} align={'center'}>
            {'New Pin'}
          </CText>
          <OTPInputView
            pinCount={6}
            code={NewPin}
            onCodeChanged={onNewPinChange}
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
        </View>
        <CButton
          type={'S16'}
          title={strings.continue}
          onPress={AsyncChangePin}
          containerStyle={localStyles.btnContainerStyle}
        />
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default UpdatePin;

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
  Container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    ...styles.mt50,
  },
});
