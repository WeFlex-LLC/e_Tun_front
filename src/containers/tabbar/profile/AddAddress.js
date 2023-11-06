// Library import
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import images from '../../../assets/images';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import CInput from '../../../components/common/CInput';
import CButton from '../../../components/common/CButton';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CDivider from '../../../components/common/CDivider';

export default function AddAddress({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const [addressName, setAddressName] = useState('');
  const [NewAddressName, setNewAddressName] = useState('');
  const [addNameStyle, setAddNameStyle] = useState(BlurredStyle);
  const [AddNewAddressStyle, setAddNewAddressStyle] = useState(BlurredStyle);
  // const [isCheck, setIsCheck] = useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const onFocusAddName = () => onFocusInput(setAddNameStyle);
  const onBlurAddName = () => onBlurInput(setAddNameStyle);

  const onFocusAddNewAddress = () => onFocusInput(setAddNewAddressStyle);
  const onBlurAddNewAddress = () => onBlurInput(setAddNewAddressStyle);

  const onChangeAddName = text => setAddressName(text);
  const onChangeAddNewAddress = text => setNewAddressName(text);

  const onPressAdd = () => navigation.goBack();

  return (
    <CSafeAreaView>
      <CHeader title={strings.addNewAddress} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        {/* <View style={styles.flex}>
          <Image
            resizeMode="cover"
            source={images.mapImage}
            style={localStyles.mapImage}
          />
        </View> */}
        <View
          style={[
            localStyles.bottomContainer,
            {backgroundColor: colors.backgroundColor},
          ]}>
          <CText
            type={'B20'}
            style={localStyles.titleContainer}
            align={'center'}>
            {strings.locationDetails}
          </CText>
          <CDivider style={styles.mv5} />
          <CInput
            label={strings.addressName}
            placeHolder={strings.addNewAddress}
            _value={addressName}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangeAddName}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addNameStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddName}
            onBlur={onBlurAddName}
          />
           <CInput
            label={strings.address}
            placeHolder={strings.addressName}
            _value={NewAddressName}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangeAddNewAddress}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              AddNewAddressStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddNewAddress}
            onBlur={onBlurAddNewAddress}
          />
          {/* <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={localStyles.checkboxContainer}>
            <Ionicons
              name={isCheck ? 'square-outline' : 'checkbox'}
              size={moderateScale(26)}
              color={colors.textColor}
            />
            <CText type={'r18'} style={styles.mh10}>
              {strings.makeDefault}
            </CText>
          </TouchableOpacity> */}
          <CButton
            title={strings.add}
            type={'S16'}
            containerStyle={styles.mv10}
            onPress={onPressAdd}
          />
        </View>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mapImage: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    ...styles.ph20,
  },
  titleContainer: {
    ...styles.p20,
  },
  checkboxContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt20,
  },
});
