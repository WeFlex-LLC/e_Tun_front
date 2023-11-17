// Librairies import
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Local import
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {getHeight, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../utils/validators';
import {StackNav} from '../../navigation/NavigationKeys';
import SuccessModal from '../../components/models/SuccessModal';
import CButton from '../../components/common/CButton';
import {NewPassWordDark, NewPassWordLight} from '../../assets/svgs';
import {getAsyncStorageData} from '../../utils/helpers';

const CreateNewPassword = ({navigation}) => {
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

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [IncorrectPassword, setIncorrectPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);
  const [passwordInputStyle, setPasswordInputStyle] = useState({});
  const [confirmPasswordInputStyle, setConfirmPasswordInputStyle] = useState(
    {},
  );
  const [passwordIcon, setPasswordIcon] = useState(BlurredIconStyle);
  const [confirmPasswordIcon, setConfirmPasswordIcon] =
    useState(BlurredIconStyle);
  const [isCheck, setIsCheck] = useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  const PasswordIcon = ({iconColor}) => (
    <Ionicons name="lock-closed" size={moderateScale(20)} color={iconColor} />
  );

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };
  const RightPasswordEyeIcon = ({visible, onPress, iconColor}) => (
    <TouchableOpacity onPress={onPress} style={localStyles.eyeIconContainer}>
      <Ionicons
        name={visible ? 'eye-off' : 'eye'}
        size={moderateScale(20)}
        color={iconColor}
      />
    </TouchableOpacity>
  );

  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressConfirmPasswordEyeIcon = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const onChangedConfirmPassword = val => {
    const {msg} = validateConfirmPassword(val.trim(), password);
    setConfirmPassword(val.trim());
    setConfirmPasswordError(msg);
  };

  const onFocusConfirmPassword = () => {
    onFocusInput(setConfirmPasswordInputStyle);
    onFocusIcon(setConfirmPasswordIcon);
  };
  const onBlurConfirmPassword = () => {
    onBlurInput(setConfirmPasswordInputStyle);
    onBlurIcon(setConfirmPasswordIcon);
  };

  const AsyncChangePassword = async () => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');

    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/users/password',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: password,
            newPassword: confirmPassword,
          }),
        },
      );
      const res = await response.json();
      if (res.success) {
        navigation.navigate(StackNav.TabBar);
      } else {
        setIncorrectPassword(res.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ErrorMessage = () => {

    return (
      <View>
          <CText type="b20" align={"center"} style={{color:"red"}}>{IncorrectPassword}</CText>
      </View>
    )
  }

  return (
    <CSafeAreaView>
      <CHeader title={strings.createNewPassword} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.root}>
          <View style={[styles.mt40, styles.selfCenter]}>
            {colors.dark ? (
              <NewPassWordDark
                width={moderateScale(240)}
                height={getHeight(240)}
              />
            ) : (
              <NewPassWordLight
                width={moderateScale(240)}
                height={getHeight(240)}
              />
            )}
          </View>
          <CText type={'m20'} style={styles.mt30}>
            {strings.createYourNewPassword}
          </CText>
          <ErrorMessage/>
          <CInput
            placeHolder={strings.password}
            keyBoardType={'default'}
            _value={password}
            _errorText={passwordError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <PasswordIcon iconColor={passwordIcon} />}
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
            rightAccessory={() => (
              <RightPasswordEyeIcon
                visible={isPasswordVisible}
                onPress={onPressPasswordEyeIcon}
                iconColor={passwordIcon}
              />
            )}
          />
          <CInput
            placeHolder={strings.confirmNewPassword}
            keyBoardType={'default'}
            _value={confirmPassword}
            _errorText={confirmPasswordError}
            autoCapitalize={'none'}
            insideLeftIcon={() => (
              <PasswordIcon iconColor={confirmPasswordIcon} />
            )}
            toGetTextFieldValue={onChangedConfirmPassword}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              confirmPasswordInputStyle,
            ]}
            _isSecure={isConfirmPasswordVisible}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusConfirmPassword}
            onBlur={onBlurConfirmPassword}
            rightAccessory={() => (
              <RightPasswordEyeIcon
                visible={isConfirmPasswordVisible}
                onPress={onPressConfirmPasswordEyeIcon}
                iconColor={confirmPasswordIcon}
              />
            )}
          />
        </View>
      </KeyBoardAvoidWrapper>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={AsyncChangePassword}
        containerStyle={styles.m20}
      />
    </CSafeAreaView>
  );
};

export default CreateNewPassword;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
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
});
