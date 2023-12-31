import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {RatingIcon, Search_Dark, Search_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import {homeProductData} from '../../../api/constant';
import {StackNav} from '../../../navigation/NavigationKeys';
import HomeServiceComponent from '../../../components/HomeServiceComponent';
import {getAsyncStorageData} from '../../../utils/helpers';
import CText from '../../../components/common/CText';
import {deviceWidth, moderateScale} from '../../../common/constants';

export default function MostPopular() {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const SelectedCategories = useSelector(state => state.FilterMostPopular.categories)

  const [isCategoriesSingleLoading, setIsCategoriesSingleLoading] =
    useState(true);
  const [MostPopularData, setMostPopularData] = useState();

  const GetMostPopularData = async item => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');
    try {
      const response = await fetch(
        `https://etunbackend-production.up.railway.app/api/services?categoryId=${SelectedCategories}&popular=true`,
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
        setMostPopularData(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCategoriesSingleLoading(false);
    }
  };

  useEffect(() => {
    GetMostPopularData();
  }, [SelectedCategories]);

  const onPressDetail = async (itm) =>{
    
    const token = await getAsyncStorageData('ACCESS_TOKEN');

    try {
      const response = await fetch(
        `https://etunbackend-production.up.railway.app/api/services/service/${itm}`,
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
        navigation.navigate(StackNav.ProductDetail, {item: res});
     
      }
    } catch (error) {
      console.error(error);
    }
}

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressDetail(item.id)}
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
            {/* <RatingIcon /> */}
            {/* <CText style={styles.ml5} type={'s12'}>
              {item?.rating}
              {'  |  '}
            </CText> */}
            {/* <CText type={'s12'}>{item?.sold + ' ' + strings.reviews}</CText> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.mostPopular} />
      <View style={localStyles.root}>
        <FlashList
          data={MostPopularData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<MostPopularCategory />}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.mh20,
    ...styles.flex,
  },
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
