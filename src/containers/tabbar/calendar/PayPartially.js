import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import {moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import CDivider from '../../../components/common/CDivider';
import {
  EditDark,
  EditLight,
  LocationDark,
  LocationLight,
} from '../../../assets/svgs';
import CText from '../../../components/common/CText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import CInput from '../../../components/common/CInput';
import strings from '../../../i18n/strings';

export default function PayPartially({route, navigation}) {
  const {title, id, icon, debt, pay} = route?.params;
  const name = route?.params?.title;
  const color = useSelector(state => state.theme.theme);
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

  const [PartMoney, setPartMoney] = useState(0);
  const [PayPartiallyInputStyles, setPayPartiallyInputStyles] =
    useState(BlurredStyle);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const onChangeTotalAmount = text => setPartMoney(text);
  const onFocusPaymentInputStyle = () =>
    onFocusInput(setPayPartiallyInputStyles);
  const onBlurPaymentInputStyle = () => onBlurInput(setPayPartiallyInputStyles);


  const onPressAdd = () => {
    if (PartMoney > 0 && PartMoney <= debt) {
      navigation.navigate(StackNav.Payment, {
        title: strings.paymentMethods,
        isRefund: false,
      });
    } else {
     Alert.alert("Խնդրում ենք Վճարեք գումարի սահմաններում");
    }
  };


  return (
    <View
      style={[
        localStyles.root,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
      <CHeader title={name} />
      <CDivider style={styles.mv5} />
      <TouchableOpacity
        style={[
          localStyles.addressContainer,
          {backgroundColor: colors.dark ? colors.inputBg : colors.grayScale1},
        ]}>
        <View style={localStyles.innerContainer}>
          <Ionicons
            name={icon ? icon : ''}
            size={moderateScale(30)}
            color={color.dark ? color.white : color.blue}
          />
          <View style={localStyles.defaultTextContainer}>
            <View style={localStyles.titleContainer}>
              <CText type={'B18'}>{title}</CText>
              <View>
                <CText type={'B18'}>{'1297'}</CText>
              </View>
            </View>
            <View style={localStyles.debtContainer}>
              <CText type={'r14'} style={styles.mt2}>
                {'Պարտք'}
              </CText>
              <CText type={'r14'} style={styles.mt2}>
                {debt + ' Դ'}
              </CText>
            </View>
            <View style={localStyles.payContainer}>
              <CText type={'r14'} style={styles.mt2}>
                {'վճարել' }
              </CText>
              <CText type={'r14'} style={styles.mt2}>
                {pay + ' Դ'}
              </CText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <CDivider style={styles.mv5} />
      <View
        style={[
          localStyles.PartiallyPaymentContainerRoot,
          {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
        ]}>
        <View style={localStyles.PartiallyPaymentContainer}>
          <CInput
            label={strings.payPartially}
            placeHolder={strings.payPartially}
            _value={PartMoney}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangeTotalAmount}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              PayPartiallyInputStyles,
            ]}
            keyboardType="numeric"
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusPaymentInputStyle}
            onBlur={onBlurPaymentInputStyle}
          />
          <CDivider style={styles.mv5} />

          <View style={localStyles.payContainer}>
            <CText type={'r14'} style={styles.m5}>
              {'Ընդամենը'}
            </CText>
            <CText type={'r14'} style={styles.mt5}>
              {PartMoney + ' Դ'}
            </CText>
          </View>
          <View style={styles.ph20}>
          <CButton
            title={strings.apply}
            type={'S16'}
            containerStyle={styles.mv10}
            onPress={onPressAdd}
          />
        </View>
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  RootContainer: {
    ...styles.flex,
    ...styles.mt10,
  },
  addressContainer: {
    ...styles.p15,
    ...styles.mh20,
    ...styles.mb15,
    ...styles.mt15,
    ...styles.rowSpaceBetween,
    borderRadius: moderateScale(15),
    ...styles.shadowStyle,
  },
  defaultTextContainer: {
    ...styles.mh10,
    ...styles.flex,
    // height: 100
  },
  defaultContainer: {
    ...styles.ml10,
    ...styles.selfStart,
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...styles.mb15,
  },
  innerContainer: {
    ...styles.rowCenter,
    ...styles.flex,
  },
  debtContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...styles.mb5,
  },
  payContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainerStyle: {
    // height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph10,
  },
  PartiallyPaymentContainerRoot: {
    ...styles.p15,
    ...styles.mh20,
    ...styles.mb15,
    ...styles.mt15,
    ...styles.shadowStyle,
    borderRadius: moderateScale(15),
  },
  PartiallyPaymentContainer: {},
});
