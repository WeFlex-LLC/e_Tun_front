// Library Imports
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {styles} from '../../../themes';
import {AppLogoDark, AppLogoLight} from '../../../assets/svgs';
import {deviceWidth, getHeight, moderateScale} from '../../../common/constants';
import {StackNav} from '../../../navigation/NavigationKeys';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CText from '../../../components/common/CText';
import {
  EditDark,
  EditLight,
  LocationDark,
  LocationLight,
} from '../../../assets/svgs';
import CButton from '../../../components/common/CButton';
import {getAsyncStorageData} from '../../../utils/helpers';

export default function CalendarTab({route}) {
  const color = useSelector(state => state.theme.theme);

  const [AsyncAddressData, setAsyncAddressData] = useState();

  const getApartments = async () => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');

    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/users/apartments',
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
      if (res) {
        setAsyncAddressData(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApartments();
  },[]);

  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setExtraData(!extraData);
      selectedDate === '' &&
        setSelectedDate(new Date().toISOString().slice(0, 10));
    }
  }, [isFocused]);

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
      </View>
    );
  };

  const onPressAddAddress = () => {
    navigation.navigate(StackNav.AddAddressForOwner);
  };

  const onPressPayService = async id => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');
    
    try {
      const response = await fetch(
        `https://etunbackend-production.up.railway.app/api/users/apartments/${id}`,
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
      if (res) {
        navigation.navigate(StackNav.PayService, {data: res});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const FlashListFooter = () => {
    return (
      <View style={styles.ph20}>
        {
          <CButton
            title={strings.addNewAddress}
            type={'S16'}
            color={!!colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            containerStyle={styles.mb20}
            onPress={onPressAddAddress}
          />
        }
      </View>
    );
  };
  // const renderItem = ({item}) => {
  //   return (
  //     <CalendarComponent
  //       item={item}
  //       isCompleted={false}
  //       btnText={strings.cancelBooking}
  //       textColor={colors.primary}
  //       title={strings.upComing}
  //     />
  //   );
  // };

  // const RenderHeaderComponent = () => {
  //   return (
  //     <View style={localStyles.calendarContainer}>
  //       <Calendar
  //         onDayPress={day => {
  //           setSelectedDate(day.dateString);
  //         }}
  //         markedDates={{
  //           [selectedDate]: {
  //             selected: true,
  //             disableTouchEvent: true,
  //           },
  //         }}
  //         theme={{
  //           backgroundColor: colors.primaryTransparent,
  //           calendarBackground: colors.dark
  //             ? colors.dark3
  //             : colors.primaryTransparent,
  //           textSectionTitleColor: colors.textColor,
  //           selectedDayBackgroundColor: colors.primary,
  //           selectedDayTextColor: colors.white,
  //           todayTextColor: colors.primary,
  //           dayTextColor: colors.dark ? colors.white : colors.grayScale8,
  //           textDisabledColor: colors.textColor,
  //           dotColor: colors.primary,
  //           selectedDotColor: colors.primary,
  //           arrowColor: colors.primary,
  //           disabledArrowColor: colors.textColor,
  //           monthTextColor: colors.textColor,
  //           indicatorColor: colors.primary,
  //           textDayFontFamily: 'Urbanist-Regular',
  //           textMonthFontFamily: 'Urbanist-Bold',
  //           textDayHeaderFontFamily: 'Urbanist-Semibold',
  //           textMonthFontSize: 18,
  //         }}
  //         style={localStyles.calendarStyle}
  //         hideExtraDays={true}
  //       />
  //       <SubHeader
  //         title1={
  //           strings.serviceBooking + ' (' + upcomingData.length.toString() + ')'
  //         }
  //         title2={strings.seeAll}
  //         style={styles.mt20}
  //       />
  //     </View>
  //   );
  // };

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.address}
        isLeftIcon={<LeftIcon />}
        // rightIcon={<RightIcon />}
      />
      {/* hin calendar-i koder@ */}
      {/* <FlashList
          data={upcomingData}
          extraData={extraData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={<RenderHeaderComponent />}
          ListEmptyComponent={
            <RenderNullComponent
              title1={strings.calendarNullHeader}
              title2={strings.calenderNullSubHeader}
              imageNull={
                colors.dark ? <CalendarNullDark /> : <CalendarNullLight />
              }
            />
          }
          estimatedItemSize={20}
        /> */}
      <View style={localStyles.root}>
        <ScrollView>
          {AsyncAddressData?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => onPressPayService(item.apartment.id)}
                style={[
                  localStyles.addressContainer,
                  {
                    backgroundColor: colors.dark
                      ? colors.inputBg
                      : colors.grayScale1,
                  },
                ]}>
                <View
                  style={localStyles.innerContainer}
                  key={item.apartment.id}>
                  {colors.dark ? <LocationDark /> : <LocationLight />}
                  <View style={localStyles.defaultTextContainer}>
                    <View style={localStyles.titleStyle}>
                      <CText type={'B18'}>{item.name}</CText>
                      {/* {isDefault && (
                        <View
                          style={[
                            localStyles.defaultContainer,
                            {backgroundColor: colors.dark3},
                          ]}>
                          <CText type={'s12'}>{strings.default}</CText>
                        </View>
                      )} */}
                    </View>
                    <CText type={'r14'} style={styles.mt2}>
                      {`${item.apartment.apartment} , ${item.apartment.building.city_am} , ${item.apartment.building.address_am} , ${item.apartment.building.name_am}`}
                    </CText>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={moderateScale(20)}
                    color={color.dark ? color.white : color.darkColor}
                  />
                </View>
              </TouchableOpacity>
            );
          })}

          <FlashListFooter />
        </ScrollView>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
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
  },
  defaultContainer: {
    ...styles.ml10,
    ...styles.selfStart,
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  titleStyle: {
    ...styles.flexRow,
    ...styles.flex,
  },
  innerContainer: {
    ...styles.rowCenter,
    ...styles.flex,
  },
});
