// Library Imports
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import { getHeight, moderateScale} from '../../common/constants';
import CHeader from '../../components/common/CHeader';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {
  Google_Icon,
  Facebook_Icon,
  Apple_Light,
  Apple_Dark,
} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';
import CInput from '../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {validateEmail, validatePassword} from '../../utils/validators';
import CButton from '../../components/common/CButton';
import {getAsyncStorageData, setAsyncStorageData} from '../../utils/helpers';
import {changeUserInfoNameAction} from '../../redux/action/UserInfoName';

const Register = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
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

  const socialIcon = [
    {
      icon: <Facebook_Icon />,
      onPress: () => onPressSignWithPassword(),
    },
    {
      icon: <Google_Icon />,
      onPress: () => onPressSignWithPassword(),
    },
    {
      icon: colors.dark === 'dark' ? <Apple_Light /> : <Apple_Dark />,
      onPress: () => onPressSignWithPassword(),
    },
  ];
  const [Token, setToken] = useState('');
  const [Name, setName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailIcon, setEmailIcon] = useState(BlurredIconStyle);
  const [passwordIcon, setPasswordIcon] = useState(BlurredIconStyle);
  const [UserIcon, setUserIcon] = useState(BlurredIconStyle);
  const [PhoneIcon, setPhoneIcon] = useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] = useState(BlurredStyle);
  const [PhoneNumberInputStyle, setPhoneNumberInputStyle] =
    useState(BlurredStyle);
  const [NameInputStyle, setNameInputStyle] = useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [EmailExistError, setEmailExistError] = useState();
  const [VerifyTokenScreen, setVerifyTokenScreen] = useState(false);
  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password, emailError, passwordError]);

  const onChangedEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };
  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const RenderSocialBtn = memo(({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={item.onPress}
        style={[
          localStyles.socialBtn,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.bColor,
          },
        ]}>
        {item.icon}
      </TouchableOpacity>
    );
  });
  const onPressSignWithPassword = async () => {
    // register
    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/users/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            fullName: Name,
            phoneNumber: PhoneNumber,
          }),
        },
      );
      const res = await response.json();
      if (res.error) {
        setEmailExistError(res.message);
      } else {
        setVerifyTokenScreen(true);
        await setAsyncStorageData(
          'BIRTHDAY',
          JSON.stringify(res.user?.birthday),
        );
        await setAsyncStorageData('COUNTRY', JSON.stringify(res.user?.country));
        await setAsyncStorageData('EMAIL', JSON.stringify(res.user?.email));
        await setAsyncStorageData(
          'FULLNAME',
          JSON.stringify(res.user?.fullName),
        );
        await setAsyncStorageData('IMG', JSON.stringify(res.user?.img));
        dispatch(changeUserInfoNameAction(res.user?.fullName));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onPressPasteToken = async () => {
    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/users/email',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: Token,
          }),
        },
      );
      const res = await response.json();
      if (res.success) {
        navigation.navigate(StackNav.Login);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPressPasswordEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
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

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed"
      size={moderateScale(20)}
      color={passwordIcon}
    />
  );

  const NameIcon = () => {
    return (
      <Ionicons
        name="person-outline"
        size={moderateScale(20)}
        color={UserIcon}
      />
    );
  };

  const PhoneNumberIcon = () => {
    return (
      <Ionicons
        name="call-outline"
        size={moderateScale(20)}
        color={PhoneIcon}
      />
    );
  };

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };

  const onFocusName = () => {
    onFocusInput(setNameInputStyle);
    onFocusIcon(setUserIcon);
  };
  const onBlurName = () => {
    onBlurInput(setNameInputStyle);
    onBlurIcon(setUserIcon);
  };

  const onFocusPhone = () => {
    onFocusInput(setPhoneNumberInputStyle);
    onFocusIcon(setPhoneIcon);
  };
  const onBlurPhone = () => {
    onBlurInput(setPhoneNumberInputStyle);
    onBlurIcon(setPhoneIcon);
  };

  const RightPasswordEyeIcon = () => (
    <TouchableOpacity
      onPress={onPressPasswordEyeIcon}
      style={localStyles.eyeIconContainer}>
      <Ionicons
        name={isPasswordVisible ? 'eye-off' : 'eye'}
        size={moderateScale(20)}
        color={passwordIcon}
      />
    </TouchableOpacity>
  );

  const onPressSignIn = () => {
    navigation.navigate(StackNav.Login);
  };

  const ShowEmailIsAlreadyExist = () => {
    return (
      <View>
        {EmailExistError && (
          <CText type={'b14'} style={{color: 'red'}}>
            {EmailExistError}
          </CText>
        )}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader />
      <KeyBoardAvoidWrapper>
        {!VerifyTokenScreen && (
          <View style={localStyles.mainContainer}>
            <CText type={'b46'} align={'left'} style={styles.mv40}>
              {strings.createYourAccount}
            </CText>
            <ShowEmailIsAlreadyExist />
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
              inputBoxStyle={[localStyles.inputBoxStyle]}
              _onFocus={onFocusEmail}
              onBlur={onBlurEmail}
            />

            <CInput
              placeHolder={strings.password}
              keyBoardType={'default'}
              _value={password}
              _errorText={passwordError}
              autoCapitalize={'none'}
              insideLeftIcon={() => <PasswordIcon />}
              toGetTextFieldValue={onChangedPassword}
              inputContainerStyle={[
                {backgroundColor: colors.inputBg},
                localStyles.inputContainerStyle,
                passwordInputStyle,
              ]}
              _isSecure={isPasswordVisible}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              _onFocus={onFocusPassword}
              onBlur={onBlurPassword}
              rightAccessory={() => <RightPasswordEyeIcon />}
            />

            <CInput
              placeHolder={strings.fullName}
              keyBoardType={'default'}
              _value={Name}
              autoCapitalize={'none'}
              insideLeftIcon={() => <NameIcon />}
              toGetTextFieldValue={e => {
                setName(e);
              }}
              inputContainerStyle={[
                {backgroundColor: colors.inputBg},
                localStyles.inputContainerStyle,
                NameInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              _onFocus={onFocusName}
              onBlur={onBlurName}
            />

            <CInput
              placeHolder={strings.phoneNumber}
              keyBoardType={'phone-pad'}
              _value={PhoneNumber}
              autoCapitalize={'none'}
              insideLeftIcon={() => <PhoneNumberIcon />}
              toGetTextFieldValue={e => {
                setPhoneNumber(e);
              }}
              inputContainerStyle={[
                {backgroundColor: colors.inputBg},
                localStyles.inputContainerStyle,
                PhoneNumberInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              _onFocus={onFocusPhone}
              onBlur={onBlurPhone}
            />

            <CButton
              title={strings.signUp}
              type={'S16'}
              color={isSubmitDisabled && colors.white}
              containerStyle={[localStyles.signBtnContainer]}
              onPress={onPressSignWithPassword}
              bgColor={isSubmitDisabled && colors.disabledColor}
              // disabled={isSubmitDisabled}
            />
            <View style={localStyles.divider}>
              <View
                style={[
                  localStyles.orContainer,
                  {backgroundColor: colors.bColor},
                ]}
              />
              <CText type={'s18'} style={styles.mh10}>
                {strings.or}
              </CText>
              <View
                style={[
                  localStyles.orContainer,
                  {backgroundColor: colors.bColor},
                ]}
              />
            </View>

            <TouchableOpacity
              onPress={onPressSignIn}
              style={localStyles.signUpContainer}>
              <CText
                type={'b16'}
                color={colors.dark ? colors.grayScale7 : colors.grayScale5}>
                {strings.AlreadyHaveAccount}
              </CText>
              <CText type={'b16'} color={colors.primary}>
                {' '}
                {strings.signIn}
              </CText>
            </TouchableOpacity>
          </View>
        )}
        {VerifyTokenScreen && (
          <View style={localStyles.mainContainer}>
            <CText type={'b46'} align={'left'} style={styles.mv40}>
              {'Paste Your Token'}
            </CText>
            <CInput
              placeHolder={'token'}
              keyBoardType={'default'}
              _value={Token}
              autoCapitalize={'none'}
              // insideLeftIcon={() => <NameIcon />}
              toGetTextFieldValue={e => {
                setToken(e);
              }}
              inputContainerStyle={[
                {backgroundColor: colors.inputBg},
                localStyles.inputContainerStyle,
                NameInputStyle,
              ]}
              inputBoxStyle={[localStyles.inputBoxStyle]}
              _onFocus={onFocusName}
              onBlur={onBlurName}
            />
            <CButton
              title={strings.signUp}
              type={'S16'}
              color={isSubmitDisabled && colors.white}
              containerStyle={[localStyles.signBtnContainer]}
              onPress={onPressPasteToken}
              bgColor={isSubmitDisabled && colors.disabledColor}
              // disabled={isSubmitDisabled}
            />
          </View>
        )}
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default Register;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },
  loginImage: {
    height: getHeight(160),
    width: '80%',
    ...styles.mv20,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  orContainer: {
    height: moderateScale(1),
    width: '30%',
  },
  signBtnContainer: {
    ...styles.center,
    width: '100%',
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    ...styles.rowCenter,
    ...styles.mb20,
  },
  socialBtnContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  socialBtn: {
    ...styles.center,
    height: getHeight(60),
    width: moderateScale(90),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.mh10,
  },
});
