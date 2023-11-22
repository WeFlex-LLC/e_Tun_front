import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import {useSelector} from 'react-redux';
import {
  Email_Icon,
  ForgotPassword_Dark,
  ForgotPassword_Light,
  Sms_Icon,
} from '../../assets/svgs';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { validateEmail } from '../../utils/validators';

const ForgotPassword = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary;

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (email.length > 0 && !emailError) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, emailError]);

  const onChangedEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };

  const EmailIcon = () => {
    return <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const onPressPinContinue = async () => {
    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/auth/user/password-recovery/request',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          
          }),
        },
      );
      const res = await response.json();
      
      if(res.success){
        navigation.navigate(StackNav.ForgotPasswordOtp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.forgotPswd} />
      <ScrollView bounces={false} contentContainerStyle={localStyles.root}>
        <View style={[styles.mv20, styles.selfCenter, styles.alignStart]}>
          {colors.dark ? (
            <ForgotPassword_Dark
              width={moderateScale(240)}
              height={getHeight(240)}
            />
          ) : (
            <ForgotPassword_Light
              width={moderateScale(240)}
              height={getHeight(240)}
            />
          )}
        </View>
        <View>
          <CText type={'m18'} style={styles.mt30}>
            {strings.forgotPasswordDesc}
          </CText>
          <CInput
            placeHolder={strings.email}
            keyBoardType={'email-address'}
            _value={email}
            _errorText={emailError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <EmailIcon />}
            toGetTextFieldValue={onChangedEmail}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              emailInputStyle,
            ]}
            inputBoxStyle={localStyles.inputBoxStyle}
            _onFocus={onFocusEmail}
            onBlur={onBlurEmail}
          />
        </View>
      </ScrollView>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={onPressPinContinue}
        containerStyle={styles.m20}
      />
    </CSafeAreaView>
  );
};

export default ForgotPassword;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.justifyCenter,
    ...styles.flex,
  },
  mainContainer: {
    ...styles.p15,
    ...styles.flexRow,
    ...styles.mt20,
    ...styles.itemsCenter,
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(30),
  },
});
