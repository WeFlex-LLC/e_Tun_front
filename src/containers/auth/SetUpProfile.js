// Libraries import
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import React, {createRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CountryPicker, {
  FlagButton,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';

// Local import
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {StackNav} from '../../navigation/NavigationKeys';
import ProfilePicture from '../../components/models/ProfilePicture';
import CButton from '../../components/common/CButton';
import {GenderData} from '../../api/constant';
import {EditDark, EditLight} from '../../assets/svgs';
import CText from '../../components/common/CText';

const SetUpProfile = props => {
  const {navigation} = props;
  const headerTitle = props.route?.params?.title;

  const colors = useSelector(state => state.theme.theme);
  const ProfilePictureSheetRef = createRef();
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

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [emailInputStyle, setEmailInputStyle] = useState(BlurredStyle);
  const [fullNameInputStyle, setFullNameInputStyle] = useState(BlurredStyle);
  const [phoneNoInputStyle, setPhoneNoInputStyle] = useState(BlurredStyle);
  const [nicknameInputStyle, setNicknameInputStyle] = useState(BlurredStyle);
  const [addressInputStyle, setAddressInputStyle] = useState(BlurredStyle);
  const [emailIcon, setEmailIcon] = useState(BlurredIconStyle);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectImage, setSelectImage] = useState('');
  const [chevronDown, setChevronDown] = useState(BlurredIconStyle);

  const [callingCodeLib, setCallingCodeLib] = useState(+374);
  const [countryCodeLib, setCountryCodeLib] = useState('AM');
  const [visiblePiker, setVisiblePiker] = useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const onFocusFullName = () => onFocusInput(setFullNameInputStyle);
  const onFocusNickName = () => onFocusInput(setNicknameInputStyle);
  const onFocusAddress = () => onFocusInput(setAddressInputStyle);
  const onFocusPhoneNo = () => {
    onFocusInput(setPhoneNoInputStyle);
    onFocusIcon(setChevronDown);
  };

  const onBlurFullName = () => onBlurInput(setFullNameInputStyle);
  const onBlurNickName = () => onBlurInput(setNicknameInputStyle);
  const onBlurAddress = () => onBlurInput(setAddressInputStyle);
  const onBlurPhoneNo = () => {
    onBlurInput(setPhoneNoInputStyle);
    onBlurIcon(setChevronDown);
  };

  const onChangedFullName = text => setFullName(text);
  const onChangedNickName = text => setNickname(text);
  const onChangedPhoneNo = text => setPhoneNo(text);
  const onChangedEmail = text => setEmail(text);
  const onAddress = text => setAddress(text);

  useEffect(() => {
    ProfilePictureSheetRef?.current?.hide();
  }, [selectImage]);

  const onSelectCountry = country => {
    setCountryCodeLib(country.cca2);
    setCallingCodeLib('+' + country.callingCode[0]);
    closeCountryPicker();
  };

  const openCountryPicker = () => setVisiblePiker(true);
  const closeCountryPicker = () => setVisiblePiker(false);

  const handleDateConfirm = date => {
    var expiryDate = date.toISOString().split('T')[0];
    const day = expiryDate.split('-')[2];
    const month = expiryDate.split('-')[1];
    const year = expiryDate.split('-')[0];
    setDateOfBirth(day + '/' + month + '/' + year);
    setDatePickerVisible(false);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const onPressCamera = () => {
    ImagePicker.openCamera({
      // cropping: true,
      mediaType: 'photo',
      includeBase64: true,
    }).then(image => {
      setSelectImage(image);
    });
  };

  const onPressGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
    }).then(images => {
      setSelectImage(images);
    });
  };

  const onPressUpdate = () => {};

  const onPressContinue = () => navigation.navigate(StackNav.SetPin);

  const onPressProfilePic = () => ProfilePictureSheetRef?.current.show();

  const onPressCalender = () => setDatePickerVisible(true);

  const EmailIcon = () => (
    <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />
  );

  const countryIcon = () => {
    return (
      <View style={styles.rowSpaceBetween}>
        <FlagButton
          value={callingCodeLib}
          onOpen={openCountryPicker}
          withEmoji={true}
          countryCode={countryCodeLib}
          // withCallingCodeButton={true}
          withCountryNameButton
          containerButtonStyle={localStyles.countryPickerButton}
        />
        <Ionicons
          name="chevron-down-outline"
          size={moderateScale(20)}
          color={chevronDown}
        />
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        title={headerTitle}
        isHideBack={headerTitle === strings.editProfile ? false : true}
      />
      <KeyBoardAvoidWrapper containerStyle={[styles.p20]}>
        <TouchableOpacity
          onPress={onPressProfilePic}
          style={[styles.selfCenter, styles.mb20]}>
          {!!selectImage?.path ? (
            <Image
              source={{uri: selectImage?.path}}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
          )}
          <View style={localStyles.editIcon}>
            {colors.dark ? (
              <EditDark height={moderateScale(26)} width={moderateScale(26)} />
            ) : (
              <EditLight height={moderateScale(26)} width={moderateScale(26)} />
            )}
          </View>
        </TouchableOpacity>
        <CInput
          placeHolder={strings.fullName}
          _value={fullName}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedFullName}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            fullNameInputStyle,
          ]}
          _onFocus={onFocusFullName}
          onBlur={onBlurFullName}
        />
        {/* <CInput
          placeHolder={strings.nickname}
          _value={nickname}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedNickName}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            nicknameInputStyle,
          ]}
          _onFocus={onFocusNickName}
          onBlur={onBlurNickName}
        /> */}
        <TouchableOpacity
          onPress={onPressCalender}
          style={[
            localStyles.dobStyle,
            {
              borderColor: colors.bColor,
              backgroundColor: colors.inputBg,
            },
          ]}>
          <CText
            type={'r16'}
            color={dateOfBirth ? colors.textColor : colors.grayScale5}>
            {dateOfBirth ? dateOfBirth : strings.dob}
          </CText>
          <Ionicons
            name="calendar"
            size={moderateScale(20)}
            color={colors.grayScale5}
            style={styles.mr5}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          date={new Date()}
          minimumDate={new Date()}
        />
        <CInput
          placeHolder={strings.email}
          keyBoardType={'email-address'}
          _value={email}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangedEmail}
          rightAccessory={() => <EmailIcon />}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            emailInputStyle,
          ]}
          _onFocus={onFocusEmail}
          onBlur={onBlurEmail}
        />
        <CInput
          placeHolder={strings.phoneNumber}
          keyBoardType={'number-pad'}
          _value={phoneNo}
          _maxLength={10}
          toGetTextFieldValue={onChangedPhoneNo}
          insideLeftIcon={countryIcon}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            phoneNoInputStyle,
          ]}
          _onFocus={onFocusPhoneNo}
          onBlur={onBlurPhoneNo}
        />
        {/* <CInput
          placeHolder={strings.address}
          _value={address}
          autoCapitalize={'none'}
          toGetTextFieldValue={onAddress}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            addressInputStyle,
          ]}
          _onFocus={onFocusAddress}
          onBlur={onBlurAddress}
        /> */}
      </KeyBoardAvoidWrapper>

      <CButton
        type={'S16'}
        title={
          headerTitle === strings.editProfile
            ? strings.update
            : strings.continue
        }
        onPress={
          headerTitle === strings.editProfile ? onPressUpdate : onPressContinue
        }
        containerStyle={localStyles.continueBtnStyle}
      />

      <ProfilePicture
        onPressCamera={onPressCamera}
        onPressGallery={onPressGallery}
        SheetRef={ProfilePictureSheetRef}
      />
      <CountryPicker
        countryCode={'AM'}
        withFilter={true}
        visible={visiblePiker}
        withFlag={true}
        withFlagButton={true}
        onSelect={country => onSelectCountry(country)}
        withCallingCode={true}
        withAlphaFilter={true}
        withCountryNameButton={true}
        onClose={closeCountryPicker}
        renderFlagButton={() => {
          return null;
        }}
        theme={colors.dark ? DARK_THEME : DEFAULT_THEME}
      />
    </CSafeAreaView>
  );
};

export default SetUpProfile;

const localStyles = StyleSheet.create({
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  dropdownStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph25,
    ...styles.mt15,
  },
  btnContainer: {
    ...styles.p20,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  dobStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph25,
    ...styles.mt10,
    ...styles.mb5,
    ...styles.rowSpaceBetween,
  },
  continueBtnStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
  countryPickerButton: {
    ...styles.alignStart,
    ...styles.justifyCenter,
  },
});
