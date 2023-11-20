// Library Imports
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CText from './common/CText';
import strings from '../i18n/strings';
import {deviceWidth, moderateScale} from '../common/constants';
import {styles} from '../themes';
import {RatingIcon, SaveIcon, UnSaveIcon} from '../assets/svgs';

export default function HomeServiceComponent(props) {
  const {item, onPress} = props;
  const colors = useSelector(state => state.theme.theme);
  const [isSaved, setIsSaved] = useState(true);

  const onPressSave = () => setIsSaved(!isSaved);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        localStyles.productContainer,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
      <Image
        source={' '}
        style={[
          localStyles.productImageStyle,
          {backgroundColor: colors.dark ? colors.imageBg : colors.white},
        ]}
      />
      <View style={localStyles.rightContainer}>
        <CText numberOfLines={1} type={'b16'}>
          {item?.name_am}
        </CText>

        <View style={localStyles.btnContainer}>
          <CText type={'r16'}>
            {item?.category ? item?.category.name_am : 'Full name'}
          </CText>

        </View>

        <CText numberOfLines={1} color={colors.primary} type={'b16'}>
          {item?.price + '֏ / ' + item?.unit_am}
        </CText>

        <View style={localStyles.subItemStyle}>
          <RatingIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    ...styles.p15,
    ...styles.flexRow,
    ...styles.mt10,
    ...styles.mb5,
    borderRadius: moderateScale(20),
    ...styles.shadowStyle,
    ...styles.selfCenter,
    width: deviceWidth - moderateScale(45),
    minHeight: moderateScale(130),
  },
  productImageStyle: {
    height: '100%',
    width: moderateScale(90),
    borderRadius: moderateScale(20),
    resizeMode: 'cover',
    marginRight: moderateScale(15),
  },
  rightContainer: {
    ...styles.flex,
    ...styles.justifyBetween,
  },
  subItemStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  btnContainer: {
    ...styles.rowSpaceBetween,
  },
});
