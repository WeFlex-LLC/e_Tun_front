import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
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
  Search_Dark,
  Search_Light
} from '../../../assets/svgs';
import CText from '../../../components/common/CText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"


function PayService({route, navigation}) {
  const AsyncData = route?.params?.data;
  const color = useSelector(state => state.theme.theme);
  const colors = useSelector(state => state.theme.theme);

  console.log('====================================');
  console.log(AsyncData);
  console.log('====================================');
  const data = [
    {
      id: 1,
      title: 'ՀէՑ',
      debt: 9500,
      pay: 9500,
      icon: 'flash-outline',
    },
    {
      id: 2,
      title: 'Ջուր',
      debt: 0,
      pay: 0,
      icon: 'water-outline',
    },
    {
      id: 3,
      title: 'Յուքոմ',
      debt: 0,
      pay: 0,
      icon: 'globe-outline',
    },
    {
      id: 4,
      title: 'ԱՊՊԱ',
      debt: 0,
      pay: 0,
      icon: 'car-sport-outline',
    },
    {
      id: 5,
      title: 'Լիֆտ',
      debt: 7500,
      pay: 7500,
      icon: 'build-outline',
    },
    {
      id: 6,
      title: 'Անվտանգություն',
      debt: 0,
      pay: 0,
      icon: 'shield-checkmark-outline',
    },
    {
      id: 7,
      title: 'Ավտոտնակ',
      debt: 0,
      pay: 0,
      icon: 'home-outline',
    },
    {
      id: 8,
      title: 'Մաքրություն',
      debt: 0,
      pay: 0,
      icon: 'color-wand-outline',
    },
  ];

  const FlashListData = ({title, id,  icon, debt, pay}) => {
    //  radio switcher
    const onPressPayService = (title,id,icon,debt,pay) => {
      navigation.navigate(StackNav.PayPartially, {title: title ,id: id ,icon: icon, debt: debt, pay: pay});
    };
    const [isEnabled, setIsEnabled] = useState(debt > 0 ? true : false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
      <TouchableOpacity
        onPress={() => onPressPayService(title, id,  icon, debt, pay)}
        style={[
          localStyles.addressContainer,
          {backgroundColor: colors.dark ? colors.inputBg : colors.grayScale1},
        ]}>
        <View style={localStyles.innerContainer} key={id}>
          <Ionicons
            name={icon ? icon : ''}
            size={moderateScale(30)}
            color={color.dark ? color.white : color.blue}
          />
          <View style={localStyles.defaultTextContainer}>
            <View style={localStyles.titleContainer}>
              <CText type={'B18'}>{title}</CText>
              <View style={localStyles.radioContainer}>
                <CText type={'B18'}>{'1297'}</CText>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={
                    isEnabled
                      ? color.dark
                        ? color.white
                        : color.darkColor
                      : !color.dark
                      ? color.white
                      : color.darkColor
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
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
                {'վճարել'}
              </CText>
              <CText type={'r14'} style={styles.mt2}>
                {pay + ' Դ'}
              </CText>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={moderateScale(20)}
            color={color.dark ? color.white : color.darkColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // apply

  const onPressAdd = () => {
    if (data) {
      navigation.navigate(StackNav.Payment, {
        title: strings.paymentMethods,
        isRefund: false,
      });
    } else {
      navigation.navigate(StackNav.AddAddress);
    }
  };

  const onPressAddYourService = () => navigation.navigate(StackNav.AddYourService)

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10} >
        <MaterialIcons name='add-circle-outline' size={30} color={"black"} onPress={onPressAddYourService}/>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        localStyles.root,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
      <CHeader title={AsyncData.name} 
        rightIcon={<RightIcon/>}
        />
      <CDivider style={styles.mv5} />

      <View style={localStyles.RootContainer}>
        <ScrollView>
          {data?.map(({id, title, address, debt, pay, icon}) => {
            return (
              <FlashListData
                id={id}
                title={title}
                address={address}
                debt={debt}
                pay={pay}
                icon={icon}
              />
            );
          })}
        </ScrollView>
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
  );
}

export default PayService;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    // ...styles.mt10,
    // overflow: "scroll"
  },
  RootContainer: {
    ...styles.flex,
    ...styles.mt10,
  },
  addressContainer: {
    ...styles.p15,
    ...styles.mh20,
    ...styles.mb15,
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
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  
});
