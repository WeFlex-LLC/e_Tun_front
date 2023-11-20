// Library import
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import CInput from '../../../components/common/CInput';
import CButton from '../../../components/common/CButton';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CDivider from '../../../components/common/CDivider';
import { Dropdown } from 'react-native-element-dropdown';
import { getAsyncStorageData } from '../../../utils/helpers';

export default function AddAddressForOwner({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [BuildingData, setBuildingData] = useState([]);

  const getBuildings = async () => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');

    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/buildings',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await response.json();
      if(res){
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        setBuildingData(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuildings();
  }, []);

  
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
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
            placeHolder={strings.addressName}
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

          

            <View style={styles.container}>
                {/* {renderLabel()} */}
              <CText
                type={'B18'}
                style={localStyles.DropDownLabelStyles}
                align={'left'}>
                {"Choose Build"}
              </CText>
              <Dropdown
                style={[localStyles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={localStyles.placeholderStyle}
                selectedTextStyle={localStyles.selectedTextStyle}
                inputSearchStyle={localStyles.inputSearchStyle}
                iconStyle={localStyles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              
              />
            </View>

              <CInput
            label={strings.ApartmentNumber}
            placeHolder={strings.AddApartmentNumber}
            _value={NewAddressName}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangeAddNewAddress}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              AddNewAddressStyle,
            ]}
            keyboardType='numeric'
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusAddNewAddress}
            onBlur={onBlurAddNewAddress}

          />
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // ...styles.mt20
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  DropDownLabelStyles: {
    ...styles.mt20,
    ...styles.mb10,

  },
});
