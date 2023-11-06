// Library Imports
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {styles} from '../../../themes';
import {inboxChatData} from '../../../api/constant';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function Chats() {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressChat = item =>
    navigation.navigate(StackNav.CustomerService, {title: item});

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressChat(item.store)}
        style={localStyles.renderItemContainer}>
        <View style={[styles.rowCenter, styles.flex]}>
          <Image
            source={{uri: item.image}}
            resizeMode="contain"
            style={[
              localStyles.productImage,
              {backgroundColor: colors.dark ? colors.white : colors.grayScale1},
            ]}
          />
          <View style={[styles.mh10, styles.flex]}>
            <CText numberOfLines={1} type={'b16'}>
              {item.store}
            </CText>
            <CText
              numberOfLines={1}
              color={!colors.dark ? colors.grayScale5 : colors.grayScale7}
              style={styles.mt5}
              type={'s14'}>
              {item.message}
            </CText>
          </View>
        </View>
        <View style={[styles.itemsEnd, styles.justifyEnd]}>
          {!!item.notification && (
            <View
              style={[
                localStyles.messageContainer,
                {backgroundColor: colors.primary},
              ]}>
              <CText type={'b12'} color={colors.white}>
                {item.notification}
              </CText>
            </View>
          )}
          <View style={[styles.rowCenter, styles.mt5]}>
            <CText
              type={'s14'}
              color={!colors.dark ? colors.grayScale5 : colors.grayScale7}
              style={styles.mr5}>
              {item?.time}
            </CText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={localStyles.root}>
      <FlashList
        data={inboxChatData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={localStyles.contentContainerStyle}
        estimatedItemSize={20}
      />
      <TouchableOpacity
        style={[
          localStyles.addIcon,
          {
            backgroundColor: colors.primary,
          },
        ]}>
        <Ionicons
          name="add-outline"
          size={moderateScale(32)}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  contentContainerStyle: {
    ...styles.pb20,
  },
  productImage: {
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(28),
    resizeMode: 'contain',
  },
  renderItemContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mt15,
  },
  messageContainer: {
    height: moderateScale(22),
    width: moderateScale(22),
    borderRadius: moderateScale(11),
    ...styles.center,
  },
  addIcon: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
    borderRadius: moderateScale(28),
    height: moderateScale(56),
    width: moderateScale(56),
    ...styles.center,
  },
});
