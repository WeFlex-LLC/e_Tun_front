import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {deviceHeight, moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  LocationIcon,
  RatingIcon,
  SaveIcon,
  UnSaveIcon,
} from '../../../assets/svgs';
import strings from '../../../i18n/strings';
import CDivider from '../../../components/common/CDivider';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import Reviews from './Reviews';
import SubHeader from '../../../components/SubHeader';
import productImageTest from '../../../assets/images/cleaningImg2.png'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RenderImageSample = React.memo(() => {

  return (
    <View>
      <View style={localStyles.imageSample}>
        <Image source={productImageTest} style={localStyles.imageContainer} />
        <View style={{width: '48%'}}>
          <Image
            source={productImageTest}
            style={[localStyles.imageHorizontal, styles.mb10]}
          />
          <Image source={productImageTest} style={localStyles.imageHorizontal} />
        </View>
      </View>
      <View style={[localStyles.imageSample, styles.mt10]}>
        <View style={{width: '48%'}}>
          <Image
            source={productImageTest}
            style={[localStyles.imageHorizontal, styles.mb10]}
          />
          <Image source={productImageTest} style={localStyles.imageHorizontal} />
        </View>
        <Image source={productImageTest} style={localStyles.imageContainer} />
      </View>
    </View>
  );
});

export default function ProductDetail({navigation, route}) {
  const item = route?.params?.item;
  const colors = useSelector(state => state.theme.theme);

  const onPressReview = () => navigation.navigate(StackNav.Reviews,{data: item.message});

  const onPressBookNow = itm => {
    // const navigationKey = navigationMap[itm];
    if (false) {
      navigation.navigate(navigationKey, {
        item: item?.category,
      });
    } else {
      navigation.navigate(StackNav.BookingDetail);
    }
  };

  const onPressMessage = () => {
    navigation.navigate(StackNav.CustomerService, {
      title: item?.name_am,
    });
  };

  let stars = [];

  for(let i = 0; i < item.rate; i++){
    stars.push(<MaterialIcons name="star" size={30} color={'gold'} />);
  }

  return (
    <CSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={productImageTest}
          style={[
            localStyles.root,
            {backgroundColor: colors.dark ? colors.imageBg : colors.grayScale1},
          ]}>
          <CHeader title={item?.category.name_am} />
        </ImageBackground>
        <View style={styles.mh20}>
          <View style={localStyles.productText}>
            <CText style={styles.flex} numberOfLines={1} type={'b26'}>
              {item?.name_am}
            </CText>
          
          </View>
          <View style={localStyles.subItemStyle}>
            
          {
          item.rate == 0 ? 
          <MaterialIcons name="star-border" size={30} color={'gold'} /> 
          :
            stars
          }
            <TouchableOpacity style={styles.ml5} onPress={onPressReview}>
              <CText
                type={'s14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
                {item?.rate}
                 {' (' + item?.comments.length + ' ' + strings.reviews + ')'}
              </CText>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.mt15, styles.rowStart]}>
            <CText type={'b32'} color={colors.primary}>
              {item.price + '֏'}
            </CText>
            <CText style={styles.ml10} color={colors.grayScale5}> 
              {item.unit_am}
            </CText>
          </View>
          <CDivider style={styles.mt20} />
          <CText numberOfLines={1} style={styles.mt5} type={'b18'}>
            {strings.description}
          </CText>
          <CText style={styles.mt5} type={'r14'}>
            {item.desc_am}
          </CText>
          {item && (
            <View>
              <SubHeader
                title1={strings.photosAndVideos}
                // onPressSeeAll={onPressReview}
                title2={strings.seeAll}
              />
              <RenderImageSample  />
            </View>
          )}
          <SubHeader
            title1={
              item?.rate + ' (' + item?.comments.length + ' ' + strings.reviews + ')'
            }
            onPressSeeAll={onPressReview}
            // title2={strings.seeAll}
          />
        </View>
        <Reviews isComponent={true} navigation={navigation} data={item.comments} />
      </ScrollView>
      <View style={styles.ph20}>
        <View style={localStyles.bottomContainer}>
          {/* <CButton
            title={strings.message}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            color={colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            onPress={onPressMessage}
          /> */}
          <CButton
            title={strings.bookNow}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            onPress={() => onPressBookNow(item?.header)}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    height: deviceHeight / 2 - moderateScale(50),
    width: '100%',
    resizeMode: 'contain',
  },
  productText: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
  },
  subItemStyle: {
    ...styles.mt10,
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  paidContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  imageSample: {
    ...styles.rowSpaceBetween,
  },
  imageContainer: {
    width: '48%',
    height: moderateScale(240),
    borderRadius: moderateScale(20),
    resizeMode: 'cover',
  },
  imageHorizontal: {
    width: '100%',
    height: moderateScale(115),
    borderRadius: moderateScale(20),
    resizeMode: 'cover',
  },
});
