// Library Imports
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
// import {FlashList} from '@shopify/flash-list';
// import {Calendar} from 'react-native-calendars';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {styles} from '../../../themes';
import {
  AppLogoDark,
  AppLogoLight,
  // CalendarNullDark,
  // CalendarNullLight,
  // Search_Dark,
  // Search_Light,
} from '../../../assets/svgs';
// import RenderNullComponent from '../../../components/RenderNullComponent';
import {deviceWidth, getHeight, moderateScale} from '../../../common/constants';
// import {StackNav} from '../../../navigation/NavigationKeys';
// import SubHeader from '../../../components/SubHeader';
// import {upcomingData} from '../../../api/constant';
// import CalendarComponent from '../../../components/CalendarComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Custom Imports
// import CText from '../../../common/CText';

import CText from '../../../components/common/CText';
import {
  EditDark,
  EditLight,
  LocationDark,
  LocationLight,
} from '../../../assets/svgs';
import CButton from '../../../components/common/CButton';
export default function CalendarTab({}) {
  const color = useSelector(state => state.theme.theme);

  const AddressData = [
    {
      id: 1,
      title: 'Home',
      address: '123, Main Street, New York, USA',
      isDefault: true,
    },
    {
      id: 2,
      title: 'Office',
      address: '345, Second Street, New York, USA',
      isDefault: false,
    },
    {
      id: 3,
      title: 'Appartment',
      address: '567, Third Street, New York, USA',
      isDefault: false,
    },
    {
      id: 4,
      title: "Parent's House",
      address: '789, Fourth Street, New York, USA',
      isDefault: false,
    },
    {
      id: 5,
      title: 'Farm House',
      address: '101, Fifth Street, New York, USA',
      isDefault: false,
    },
    {
      id: 6,
      title: 'Town Square',
      address: '123, Main Street, New York, USA',
      isDefault: false,
    },
  ];

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

  // const onPressSearch = () => navigation.navigate(StackNav.Search);

  // const RightIcon = () => {
  //   return (
  //     <TouchableOpacity style={styles.ph10} onPress={onPressSearch}>
  //       {colors.dark ? <Search_Dark /> : <Search_Light />}
  //     </TouchableOpacity>
  //   );
  // };

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
      </View>
    );
  };


  // const onPressAddAddress = () => navigation.navigate(StackNav.AddAddress);

  const FlashListFooter = () => {
    return (
      <View style={styles.ph20}>
        {(
          <CButton
            title={strings.addNewAddress}
            type={'S16'}
            color={!!colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            containerStyle={styles.mb20}
            // onPress={onPressAddAddress}
          />
        )}
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
      <View style={localStyles.root}>
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

       
          {AddressData?.map(({id, title, address, isDefault}) => {

            return(
              <TouchableOpacity
              // onPress={onPressAddress}
              style={[
                localStyles.addressContainer,
               
                {backgroundColor: colors.dark ? colors.inputBg : colors.grayScale1},
              ]}>
              <View style={localStyles.innerContainer} key={id}>
                {colors.dark ? <LocationDark /> : <LocationLight />}
                <View style={localStyles.defaultTextContainer}>
                  <View style={localStyles.titleStyle}>
                    <CText type={'B18'}>{title}</CText>
                    {isDefault && (
                      <View
                        style={[
                          localStyles.defaultContainer,
                          {backgroundColor: colors.dark3},
                        ]}>
                        <CText type={'s12'}>{strings.default}</CText>
                      </View>
                    )}
                  </View>
                  <CText type={'r14'} style={styles.mt2}>
                    {address}
                  </CText>
                </View>
                <Ionicons
                    name="chevron-forward-outline"
                    size={moderateScale(20)}
                    color={color.dark ? color.white : color.darkColor}
                  />
              </View>
          </TouchableOpacity>

            )
          })}
          <FlashListFooter/>
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
    // ...styles.flexColumn,
    // flex: 1
    
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
