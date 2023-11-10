import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import Search from '@mPOS/screens/HomeTab/RetailServices/Components/Search';
import { Images } from '@mPOS/assets';
import AddProductCart from './Components/AddServiceCart';
import { getProduct } from '@mPOS/actions/RetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { strings } from '@mPOS/localization';
import ProductDetails from './Components/ProductDetails';
import { FullScreenLoader, Header, ImageView, ScreenWrapper } from '@mPOS/components';
import { debounce } from 'lodash';
import {
  getBrand,
  getCategory,
  getMainProduct,
  getMainServices,
  getOneProduct,
  getOneService,
  getSubCategory,
} from '@/actions/RetailAction';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';
import Modal from 'react-native-modal';
import ProductFilter from './Components/ProductFilter';
import AddServiceCart from './Components/AddServiceCart';

export function RetailServices(props) {
  const onEndReachedCalledDuringMomentum = useRef(false);
  const getAuth = useSelector(getAuthData);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const serviceData = retailData?.getMainServices;
  const addServiceCartRef = useRef(null);
  const productDetailRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const data = props?.route?.params?.item;
  const [isSelected, setSelected] = useState(false);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [productFilterCount, setProductFilterCount] = useState(0);
  const serviceDetailHanlder = () => {
    productDetailRef.current.present();
  };
  const bothSheetClose = () => {
    productDetailRef.current.dismiss();
    addServiceCartRef.current.dismiss();
  };
  const [productSearch, setProductSearch] = useState('');
  const [productFilter, setProductFilter] = useState(false);

  useEffect(() => {
    dispatch(getCategory(sellerID));
    dispatch(getSubCategory(sellerID));
    dispatch(getBrand(sellerID));
  }, []);
  useEffect(() => {
    dispatch(getMainServices());
  }, []);
  const serviceLoad = useSelector((state) => isLoadingSelector([TYPES.GET_MAIN_SERVICES], state));

  const productSearchFun = async (search) => {
    if (search?.length > 2) {
      const searchName = {
        search: search,
      };
      dispatch(getProduct(searchName, 1));
    } else if (search?.length === 0) {
      dispatch(getProduct({}, 1));
    }
  };

  const debounceProduct = useCallback(debounce(productSearchFun, 1000), []);

  const servicePagination = {
    total: serviceData?.total ?? '0',
    totalPages: serviceData?.total_pages ?? '0',
    perPage: serviceData?.per_page ?? '0',
    currentPage: serviceData?.current_page ?? '0',
  };
  console.log('servicePagination', servicePagination);

  const onLoadMoreProduct = useCallback(() => {
    if (!serviceLoad) {
      if (servicePagination?.currentPage < servicePagination?.totalPages) {
        dispatch(getProduct({}, servicePagination?.currentPage + 1));
      }
    }
  }, [servicePagination]);

  const renderCategoryItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSelected(!isSelected)}
      style={[
        styles.categoryMainView,
        // {
        //   backgroundColor:
        //     isSelected ? COLORS.darkBlue : COLORS.red,
        // },
      ]}
    >
      <Text
        style={[
          styles.categoryTitleText,
          { color: index === 0 ? COLORS.darkBlue : COLORS.grayShade },
        ]}
      >
        {item?.title}
      </Text>
    </TouchableOpacity>
  );

  const renderCollectionItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSelected(!isSelected)}
      style={[
        styles.categoryMainView,
        // {
        //   backgroundColor:
        //     isSelected ? COLORS.darkBlue : COLORS.red,
        // },
      ]}
    >
      <Text
        style={[
          styles.categoryTitleText,
          { color: index === 0 ? COLORS.darkBlue : COLORS.grayShade },
        ]}
      >
        {item?.title}
      </Text>
    </TouchableOpacity>
  );

  const isLoading = useSelector((state) =>
    isLoadingSelector(
      [TYPES.GET_ONE_SERVICE, TYPES.ADD_SERVICE_CART, TYPES.GET_SERVICE_CART],
      state
    )
  );
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header backRequired title={`Back`} />
        <Search
          value={productSearch}
          onChangeText={(productSearch) => {
            setProductSearch(productSearch);
            debounceProduct(productSearch);
          }}
          // filterHandler={() => setProductFilter(true)}
          selectFilterCount={productFilterCount}
        />

        {/* <Spacer space={SH(15)} /> */}

        <FlatList
          data={serviceData?.data ?? []}
          extraData={serviceData?.data ?? []}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                // onPress={async () => {
                //   const res = await dispatch(getOneProduct(sellerID, item.id));
                //   if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
                //     addServiceCartRef.current.present();
                //   }
                // }}
                onPress={async () => {
                  const res = await dispatch(getOneService(sellerID, item.id));
                  if (res?.type === 'GET_ONE_SERVICE_SUCCESS') {
                    addServiceCartRef.current.present();
                  }
                }}
                style={[styles.productDetailMainView, { marginTop: index === 0 ? ms(0) : ms(5) }]}
              >
                <View style={styles.imageDetailView}>
                  {/* <Image source={{ uri: item?.image }} style={styles.productImageStyle} /> */}
                  <ImageView
                    imageUrl={item?.image}
                    style={styles.productImageStyle}
                    imageStyle={{ borderRadius: ms(5) }}
                  />
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text style={styles.productNameText} numberOfLines={1}>
                      {item?.name}
                    </Text>

                    {item.supplies?.[0]?.approx_service_time == null ? (
                      <Text style={styles.genderTextStyle} numberOfLines={1}>
                        Estimated Time Not found
                      </Text>
                    ) : (
                      <Text style={styles.genderTextStyle} numberOfLines={1}>
                        Est: {item.supplies?.[0]?.approx_service_time} min
                      </Text>
                    )}
                    <Text style={styles.priceTextStyle} numberOfLines={1}>
                      ${item?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.addView,
                    { borderColor: index === 0 ? COLORS.darkBlue : COLORS.inputBorder },
                  ]}
                >
                  <Image
                    source={Images.addTitle}
                    resizeMode="contain"
                    style={[
                      styles.addImage,
                      {
                        tintColor: index === 0 ? COLORS.darkBlue : COLORS.dark_grey,
                      },
                    ]}
                  />
                </TouchableOpacity>
                {/* {index === 0 ? (
                <TouchableOpacity style={styles.countView}>
                  <Text style={{ color: COLORS.white }}>{'1'}</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )} */}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          ListEmptyComponent={() => (
            <View style={styles.noProductCon}>
              <Text style={styles.noProduct}>{strings.retail.noService}</Text>
            </View>
          )}
          // onEndReachedThreshold={0.1}
          // onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
          // onMomentumScrollBegin={() => {}}
          // onMomentumScrollEnd={() => {
          //   if (onEndReachedCalledDuringMomentum.current) {
          //     onLoadMoreProduct();
          //     onEndReachedCalledDuringMomentum.current = false;
          //   }
          // }}
          removeClippedSubviews={true}
          ListFooterComponent={() => (
            <View>{serviceLoad && <ActivityIndicator size="large" color={COLORS.darkBlue} />}</View>
          )}
        />

        <AddServiceCart {...{ addServiceCartRef, serviceDetailHanlder }} />
        <ProductDetails {...{ productDetailRef, bothSheetClose }} />
        <Modal
          style={{ margin: 0 }}
          animationType="fade"
          transparent={true}
          isVisible={productFilter}
          onBackdropPress={() => setProductFilter(false)}
          animationIn="slideInRight"
          animationOut="slideOutRight"
        >
          <ProductFilter
            crossHandler={() => setProductFilter(false)}
            productFilterCount={setProductFilterCount}
            backfilterValue={productFilterCount}
          />
          {/* <NewCustomerAdd /> */}
        </Modal>

        {isLoading ? <FullScreenLoader /> : null}
      </View>
    </ScreenWrapper>
  );
}
