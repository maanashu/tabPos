import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { Images } from '@mPOS/assets';
import { NAVIGATION } from '@mPOS/constants';
import { strings } from '@mPOS/localization';
import { homePageData } from '@mPOS/constants/enums';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { getAuthData } from '@mPOS/selectors/AuthSelector';

import styles from '@mPOS/screens/HomeTab/Home/styles';

export function Home() {
  const authData = useSelector(getAuthData);
  const merchantData = authData?.merchantLoginData;
  const onPressHandler = (item) => {
    if (item?.title === 'Checkout') {
      navigate(NAVIGATION.checkout);
    } else if (item?.title === 'Products') {
      navigate(NAVIGATION.retailProducts);
    } else if (item?.title === 'Services') {
      navigate(NAVIGATION.services);
    } else if (item?.title === 'Delivery') {
      navigate(NAVIGATION.delivery);
    } else if (item?.title === 'Shipping') {
      navigate(NAVIGATION.shipping);
    } else if (item?.title === 'Return') {
      navigate(NAVIGATION.searchScreen);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.itemViewStyle}>
      <Image source={item.image} style={styles.imageStyle} />
      <Text style={styles.itemTitleStyle}>{item.title}</Text>

      {item?.title === 'Delivery' || item?.title === 'Shipping' ? (
        <View style={styles.descriptionView}>
          <Image source={Images.dot} style={styles.dotImageStyle} />
          <Text
            style={[
              styles.listedProductsStyle,
              {
                color:
                  item?.title === 'Delivery' || item?.title === 'Shipping'
                    ? COLORS.darkBlue
                    : COLORS.dark_gray,
              },
            ]}
          >
            {item.listedProducts}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.listedProductsStyle,
            {
              color:
                item?.title === 'Delivery' || item?.title === 'Shipping'
                  ? COLORS.darkBlue
                  : COLORS.dark_gray,
              paddingHorizontal: 15,
            },
          ]}
        >
          {item.listedProducts}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ borderWidth: 0, flexGrow: 1, paddingHorizontal: ms(10) }}>
        <View style={styles.storeNameHeader}>
          <Text style={styles.storeName} numberOfLines={1}>
            {merchantData?.user?.user_profiles?.organization_name}
          </Text>
          <Image source={Images.bell} style={styles.bell} />
        </View>
        <View style={styles.homePageSearchCon}>
          <Image source={Images.search} style={styles.searchIconStyle} />
          <TextInput
            placeholder={strings.homeTab.placeholder}
            style={styles.searchTextInputStyle}
          />
        </View>

        <FlatList
          numColumns={2}
          data={homePageData}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: ms(110),
          }}
        />
      </View>
    </SafeAreaView>
  );
}
