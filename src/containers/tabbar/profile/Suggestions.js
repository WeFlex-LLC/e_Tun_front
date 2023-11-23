// Libraries import
import {Button, StyleSheet, TouchableOpacity, View,Platform, Image} from 'react-native';
import React, {createRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {styles} from '../../../themes';
import {deviceWidth, getHeight, moderateScale} from '../../../common/constants';
import CInput from '../../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import {StackNav} from '../../../navigation/NavigationKeys';
import CButton from '../../../components/common/CButton';
import CText from '../../../components/common/CText';
import {EditDark, EditLight} from '../../../assets/svgs';
import {getAsyncStorageData, setAsyncStorageData} from '../../../utils/helpers';
import { launchImageLibrary } from 'react-native-image-picker'
const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const Suggestions = props => {
  
  useEffect(() => {
    ProfilePictureSheetRef?.current?.hide();
  }, [selectImage]);
  const [selectImage, setSelectImage] = useState('');
  const ProfilePictureSheetRef = createRef();
  const onPressProfilePic = () => ProfilePictureSheetRef?.current.show();



  const {navigation} = props;

  const dispatch = useDispatch();

  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };

  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  
  const [chatStyle, setChatStyle] = useState(BlurredStyle);
  const [uri, setUri] = React.useState(props.source?.uri || undefined);


  return (
    <CSafeAreaView>
      <CHeader title={"Suggestions"} />
      <KeyBoardAvoidWrapper containerStyle={[styles.ph20]}>
        <CText type={'b18'} style={styles.mt10}>{"Upload Image"}</CText>
        <TouchableOpacity
          onPress={onPressProfilePic}
          style={[styles.selfCenter, styles.mb20]}>
          {/* {!!selectImage?.path ? (
            <Image
              source={{uri: selectImage?.path}}
              style={localStyles.userImage}
            />
          ) : (
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
          )} */}
          <View style={localStyles.editIcon}>
            {colors.dark ? (
              <EditDark height={moderateScale(26)} width={moderateScale(26)} />
            ) : (
              <EditLight height={moderateScale(26)} width={moderateScale(26)} />
            )}
          </View>
        </TouchableOpacity>
        <CText type={'b18'}>{strings.Notes}</CText>
        <View style={styles.rowCenter}>
          <CInput
            placeHolder={strings.EnterNotes}
            keyBoardType={'default'}
            // _value={promoCode}
            autoCapitalize={'none'}
            // toGetTextFieldValue={onChangePromo}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              chatStyle,
            ]}
            _onFocus={onFocusInput}
            onBlur={onBlurInput}
            multiline
          />
         
        </View>
        
      </KeyBoardAvoidWrapper>

      <CButton
        type={'S16'}
        title={strings.apply}
        // onPress={onPressEditProfile}
        containerStyle={localStyles.continueBtnStyle}
      />
      
    </CSafeAreaView>
  );
};

export default Suggestions;

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
    ...styles.mt10,
    ...styles.mb5,
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
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    // ...styles.ph15,
    ...styles.flexGrow1,
    ...styles.flex,
    ...styles.alignStart,

    width: deviceWidth - moderateScale(30),
  },
});
