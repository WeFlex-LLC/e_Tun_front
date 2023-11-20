import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RatingIcon, Search_Dark, Search_Light} from '../../assets/svgs';
import {colors, styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import MostPopularCategory from '../../components/homeComponent/MostPopularCategory';
import {StackNav} from '../../navigation/NavigationKeys';
import HomeServiceComponent from '../../components/HomeServiceComponent';
import {getAsyncStorageData} from '../../utils/helpers';
import CText from '../../components/common/CText';
import {deviceWidth, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import CHeader from '../common/CHeader';
import testImage from '../../assets/images/paintingImg1.png';

export default function HomeProductComponent() {
  const SelectedCategories = useSelector(state => state.FilterMostPopular.categories)

  const navigation = useNavigation();
 
  const [isCategoriesSingleLoading, setIsCategoriesSingleLoading] =
    useState(true);
  const [MostPopularData, setMostPopularData] = useState();

  const GetMostPopularData = async item => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');

    try {
      const response = await fetch(
        `https://etunbackend-production.up.railway.app/api/services?categoryId=${SelectedCategories}&popular=true&length=4`,
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
          source={testImage}
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
            {/* <TouchableOpacity onPress={onPressSave}>
              {isSaved ? <UnSaveIcon /> : <SaveIcon />}
            </TouchableOpacity> */}
          </View>

          <CText numberOfLines={1} color={colors.primary} type={'b16'}>
            {item?.price + '֏ / ' + item?.unit_am}
          </CText>

          <View style={localStyles.subItemStyle}>
            
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      
      <FlashList
        data={MostPopularData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={10}
      />

    </View>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    ...styles.p15,
    ...styles.flexRow,
    ...styles.mt10,
    ...styles.mb5,
    borderRadius: moderateScale(20),
    // ...styles.shadowStyle,
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
