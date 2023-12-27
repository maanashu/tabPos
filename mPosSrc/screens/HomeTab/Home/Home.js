import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { Images } from '@mPOS/assets';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { strings } from '@mPOS/localization';
// import { homePageData } from '@mPOS/constants/enums';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { getAuthData } from '@/selectors/AuthSelector';

import styles from '@mPOS/screens/HomeTab/Home/styles';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { homeStatus } from '@/actions/DashboardAction';
import { getDashboard } from '@/selectors/DashboardSelector';

export function Home() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const authData = useSelector(getAuthData);
  const homeStatusSelector = useSelector(getDashboard);
  const homeStatusData = homeStatusSelector?.homeData;
  const merchantServiceProvide = authData?.merchantLoginData?.product_existance_status;
  const merchantData = authData?.merchantLoginData;
  const onPressHandler = (item) => {
    if (item?.title === 'Checkout') {
      navigate(MPOS_NAVIGATION.checkout);
    } else if (item?.title === 'Products') {
      navigate(MPOS_NAVIGATION.retailProducts);
    } else if (item?.title === 'Services') {
      navigate(MPOS_NAVIGATION.retailServices);
    } else if (item?.title === 'Delivery') {
      navigate(MPOS_NAVIGATION.delivery);
    } else if (item?.title === 'Shipping') {
      navigate(MPOS_NAVIGATION.shipping);
    } else if (item?.title === 'Return') {
      navigate(MPOS_NAVIGATION.searchScreen);
    } else if (item?.title === 'Booking') {
      navigate(MPOS_NAVIGATION.booking);
    }
  };
  // useEffect(() => {
  //   dispatch(getProductRoot())
  // }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      dispatch(homeStatus());
    }
  }, [isFocused]);

  const homePageData = [
    merchantServiceProvide?.is_product_exist
      ? {
          key: '1',
          title: 'Products',
          image: Images.products,
          listedProducts: `${homeStatusData?.products_count ?? 0} Products listed`,
        }
      : null,
    merchantServiceProvide?.is_service_exist
      ? {
          key: '2',
          title: 'Services',
          image: Images.services,
          listedProducts: `${homeStatusData?.services_count ?? 0} Services listed`,
        }
      : null,
    // merchantServiceProvide?.is_product_exist || merchantServiceProvide?.is_service_exist
    //   ? {
    //       key: '3',
    //       title: 'On-Hold',
    //       image: Images.hold,
    //     }
    //   : null,
    {
      key: '4',
      title: 'Return',
      image: Images.returnIcon,
      listedProducts: `Incomplete: ${homeStatusData?.return_count ?? 0}`, //'Incomplete: 3',
    },
    {
      key: '5',
      title: 'Delivery',
      image: Images.delivery,
      listedProducts: `Processing: ${homeStatusData?.delivery_orders_count ?? 0}`,
    },
    {
      key: '6',
      title: 'Shipping',
      image: Images.shippingImage,
      listedProducts: `On-going: ${homeStatusData?.shipping_orders_count ?? 0}`,
    },
    {
      key: '7',
      title: 'Booking',
      image: Images.calendar,
      listedProducts: `On-going: ${homeStatusData?.booking_count ?? 0}`,
    },
    {
      key: '8',
      title: 'Add Title',
      image: Images.addTitle,
    },
  ].filter(Boolean); // Remove falsy values (null in this case)

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
                  : COLORS.solid_grey,
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

          <TouchableOpacity onPress={() => navigate(MPOS_NAVIGATION.notificationList)}>
            <Image source={Images.bell} style={styles.bell} />
          </TouchableOpacity>
        </View>
        <View style={styles.homePageSearchCon}>
          <Image source={Images.search} style={styles.searchIconStyle} />
          <TextInput
            placeholder={strings.homeTab.placeholder}
            style={styles.searchTextInputStyle}
            placeholderTextColor={COLORS.solid_grey}
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
