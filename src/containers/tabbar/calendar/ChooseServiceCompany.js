import CText from '../../../components/common/CText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import viva from '../../../assets/images/viva.jpg';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import {moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import CDivider from '../../../components/common/CDivider';
import {FlashList} from '@shopify/flash-list';

export default function ChooseServiceCompany({route}) {
  const name = route?.params?.title;
  const color = useSelector(state => state.theme.theme);
  const colors = useSelector(state => state.theme.theme);
  const BlurredStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };
  const [AccountNumberText, setAccountNumberText] = useState(0);
  const [PayPartiallyInputStyles, setPayPartiallyInputStyles] =
    useState(BlurredStyle);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);

  const onChangesetAccountNumberText = text => setAccountNumberText(text);
  const onFocusPaymentInputStyle = () =>
    onFocusInput(setPayPartiallyInputStyles);
  const onBlurPaymentInputStyle = () => onBlurInput(setPayPartiallyInputStyles);
  const DATA = [
    {
      id: 1,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/BeeLine_logo.png',
      name: 'ՀէՑ',
    },
    {
      id: 11,
      icon: 'https://nt.am/files/data/news/2020/01/17/pics/large/d60f87ffd.jpg',
      name: 'Ջուր',
    },
    {
      id: 2,
      icon: 'https://nt.am/files/data/news/2020/01/17/pics/large/d60f87ffd.jpg',
      name: 'Յուքոմ',
    },
    {
      id: 3,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/BeeLine_logo.png',
      name: 'ԱՊՊԱ',
    },
    {
      id: 4,
      icon: 'https://nt.am/files/data/news/2020/01/17/pics/large/d60f87ffd.jpg',
      name: 'Լիֆտ',
    },
    {
      id: 5,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/BeeLine_logo.png',
      name: 'Ավտոտնակ',
    },
    // {
    //   id: 33,
    //   icon: 'airline-seat-flat-angled',
    //   name: 'ԱՊՊԱ',
    // },
    // {
    //   id: 44,
    //   icon: 'airline-seat-legroom-normal',
    //   name: 'Լիֆտ',
    // },
    // {
    //   id: 55,
    //   icon: 'airline-seat-legroom-reduced',
    //   name: 'Ավտոտնակ',
    // },
  ];

  const RenderData = ({item}) => {
    return (
      <View key={item.id} style={localStyles.IconsContainerStyle}>
        {/* <MaterialIcons name={item.icon} size={50} color={'black'} />
         */}
        <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/7/7a/BeeLine_logo.png"}} style={localStyles.userImageStyle} />
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {item.name}
        </CText>
      </View>
    );
  };

  return (
    <View
      style={[
        localStyles.root,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
      <CHeader
        title={name}
        //   rightIcon={<RightIcon/>}
      />
      <CDivider style={styles.mv5} />

      <View style={localStyles.RootContainer}>
        <View style={localStyles.dataContainer}>
          <FlashList
            // style={{height:400}}
            data={DATA}
            renderItem={RenderData}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={100}
          />
        </View>
        <View
          style={[
            localStyles.PartiallyPaymentContainerRoot,
            {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
          ]}>
          <View style={localStyles.PartiallyPaymentContainer}>
            <CInput
              label={strings.accountNumber}
              placeHolder={strings.accountNumber}
              _value={AccountNumberText}
              autoCapitalize={'none'}
              toGetTextFieldValue={onChangesetAccountNumberText}
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

            <View style={styles.ph20}>
              <CButton
                title={strings.apply}
                type={'S16'}
                containerStyle={styles.mv10}
                // onPress={onPressAdd}
              />
            </View>
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
  },
  dataContainer:{
    display:"flex",
    height: 200
  },
  IconsContainerStyle: {
    width: 150,
    ...styles.shadowStyle,
    display: 'flex',
    ...styles.center,
    height: "100%"
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
  userImageStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode: "contain"
    // borderRadius: moderateScale(25),
  },
});
