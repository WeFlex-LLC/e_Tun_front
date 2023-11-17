// Library Imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {commonColor, styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {homeCategoryData} from '../../../api/constant';
// import SearchComponent from '../../../components/homeComponent/SearchComponent';
import HomeHeader from '../../../components/homeComponent/HomeHeader';
import HomeBanner from '../../../components/homeComponent/HomeBanner';
import SubHeader from '../../../components/SubHeader';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import HomeProductComponent from '../../../components/homeComponent/HomeProductComponent';
import {StackNav} from '../../../navigation/NavigationKeys';
import images from '../../../assets/images';
import strings from '../../../i18n/strings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getAsyncStorageData } from '../../../utils/helpers';

const RenderHeaderItem = React.memo(() => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const onPressSpecialOffer = useCallback(
    () => navigation.navigate(StackNav.SpecialOffers),
    [],
  );

  const onPressService = useCallback(
    () => navigation.navigate(StackNav.AllService),
    [],
  );

  const onSearchInput = useCallback(text => setSearch(text), []);

  return (
    <View>
      <HomeHeader />
      {/* <SearchComponent search={search} onSearchInput={onSearchInput} /> */}
      <SubHeader
        title1={strings.specialOffers}
        title2={strings.seeAll}
        onPressSeeAll={onPressSpecialOffer}
        style={styles.mt20}
      />
      <HomeBanner image={images.swiperImage1} />
      <SubHeader
        title1={strings.service}
        title2={strings.seeAll}
        onPressSeeAll={onPressService}
        style={styles.mt5}
      />
    </View>
  );
});

const RenderFooterItem = React.memo(() => {
  const navigation = useNavigation();

  const onPressMostPopular = () => navigation.navigate(StackNav.MostPopular);

  return (
    <View style={styles.flex}>
      <SubHeader
        title1={strings.mostPopular}
        title2={strings.seeAll}
        onPressSeeAll={onPressMostPopular}
      />
      <MostPopularCategory />
      <HomeProductComponent />
    </View>
  );
});

export default function HomeTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [extraData, setExtraData] = useState(true);

  useEffect(() => {
    setExtraData(!extraData);
  }, [colors]);


  const [isCategoriesSingleLoading, setIsCategoriesSingleLoading] = useState(true);

  
  const onPressItem = async item => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');
    
    try {
      const response = await fetch(
        `https://etunbackend-production.up.railway.app/api/services?categoryId=${item.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const CategoriesSingle = await response.json();
        // console.log('====================================');
        // console.log(CategoriesSingle);
        // console.log('====================================');
      if (CategoriesSingle) {
        return navigation.navigate(StackNav.ProductCategory, {item: CategoriesSingle , title: item});
      } else {
        return navigation.navigate(StackNav.AllService);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsCategoriesSingleLoading(false);
    }

    
  };

  const [isLoading, setLoading] = useState(true);
  const [Categoriesdata, setCategoriesdata] = useState([]);

  const getCategories = async () => {
    const token = await getAsyncStorageData('ACCESS_TOKEN');
    
    try {
      const response = await fetch(
        'https://etunbackend-production.up.railway.app/api/services/categories', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      setCategoriesdata(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  
  // console.log(language);
  const language = useSelector(state => state?.profile?.language);

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressItem(item)}
        style={localStyles.categoryRoot}>
          <View style={localStyles.iconContainer} >
            <MaterialIcons name={item.icon}  size={30} color={'#7210FF'} />
          </View>
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {language  == "Armenian" ? item.name_am : language  == "Russian" ? item.name_ru : item.name_en}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[localStyles.root, {backgroundColor: colors.backgroundColor}]}>
      <FlashList
        data={Categoriesdata}
        extraData={language}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        estimatedItemSize={10}
        ListHeaderComponent={<RenderHeaderItem />}
        ListFooterComponent={<RenderFooterItem />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  iconStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  iconContainer: {
    display: "flex",
    ...styles.center,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    // backgroundColor: commonColor.grayScale3,
    borderColor: "#7210FF",
    borderWidth: 1,
    ...styles.center,
    // backgroundColor: "none"
  },
  categoryRoot: {
    width: '100%',
    ...styles.itemsCenter,
    ...styles.mv15,
  },
});
