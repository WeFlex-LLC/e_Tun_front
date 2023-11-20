import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {useSelector} from 'react-redux';
import userTest from '../../assets/images/userLight.png';
import {moderateScale} from '../../common/constants';
import CText from '../../components/common/CText';
import {styles} from '../../themes';

export default function ReviewUserComponent(props) {
  const {item} = props;
  
  const colors = useSelector(state => state.theme.theme);

  return (
    <View style={styles.mb20}>
      <View style={localStyles.userContainer}>
        <View style={[styles.flexRow, styles.flex, styles.itemsCenter]}>
          <Image
            source={userTest}
            style={localStyles.userImageStyle}
          />
          <CText numberOfLines={1} style={styles.flex} type={'S16'}>
            {item?.user.fullName}
          </CText>
        </View>
      </View>
      <CText type={'r16'} style={styles.mt10}>
        {item?.text}
      </CText>
      <View style={localStyles.bottomContainer}>
      
        <CText type={'b1'} style={styles.ml0}>
          {item?.createdAt.split('T')[0]}
        </CText>
      </View>
    </View>
  );
}
const localStyles = StyleSheet.create({
  userImageStyle: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    ...styles.mr10,
  },
  userContainer: {
    ...styles.rowSpaceBetween,
  },
  chipsContainer: {
    ...styles.ph15,
    ...styles.pv5,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    ...styles.mh10,
    ...styles.rowCenter,
  },
  starStyle: {
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
    ...styles.mr10,
  },
  bottomContainer: {
    ...styles.mt5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
});
