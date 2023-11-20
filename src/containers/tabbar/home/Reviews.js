import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import {ratingData, reviewsData} from '../../../api/constant';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import {FlashList} from '@shopify/flash-list';
import ReviewUserComponent from '../../../components/homeComponent/ReviewUserComponent';
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function Reviews({navigation, isComponent = false,data}) {
  const colors = useSelector(state => state.theme.theme);

  

  const RenderFlashListItem = ({item, index}) => {
    return <ReviewUserComponent item={item} />;
  };


  return (
    <CSafeAreaView>
      {!isComponent && (
        <CHeader title={strings.reviews}/>
      )}
      <FlashList
        data={!isComponent ? data : data?.slice(0, 3)}
        renderItem={RenderFlashListItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={10}
        contentContainerStyle={styles.ph20}
        showsVerticalScrollIndicator={false}
      />
    </CSafeAreaView>
  );
}
