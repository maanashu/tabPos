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
import { ClothCollection, ProductData } from '@mPOS/constants/enums';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import Search from './Components/Search';
import { Images } from '@mPOS/assets';
import AddProductCart from './Components/AddProductCart';
import { getProduct } from '@mPOS/actions/RetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { RETAIL_TYPES } from '@mPOS/Types/RetailTypes';
import { strings } from '@mPOS/localization';
import ProductDetails from './Components/ProductDetails';
import { FullScreenLoader, Header, ScreenWrapper } from '@mPOS/components';
import { debounce } from 'lodash';
import { getMainProduct, getOneProduct } from '@/actions/RetailAction';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';

export function RetailProducts(props) {
  const onEndReachedCalledDuringMomentum = useRef(false);
  const getAuth = useSelector(getAuthData);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const productData = retailData?.getMainProduct;
  const addProductCartRef = useRef(null);
  const productDetailRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const data = props?.route?.params?.item;
  const [isSelected, setSelected] = useState(false);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const productDetailHanlder = () => {
    productDetailRef.current.present();
  };
  const bothSheetClose = () => {
    productDetailRef.current.dismiss();
    addProductCartRef.current.dismiss();
  };
  const [productSearch, setProductSearch] = useState('');
  useEffect(() => {
    // dispatch(getProduct({}, 1));
    dispatch(getMainProduct());
  }, []);
  const productLoad = useSelector((state) => isLoadingSelector([TYPES.GET_MAIN_PRODUCT], state));

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

  const productPagination = {
    total: productData?.total ?? '0',
    totalPages: productData?.total_pages ?? '0',
    perPage: productData?.per_page ?? '0',
    currentPage: productData?.current_page ?? '0',
  };

  const onLoadMoreProduct = useCallback(() => {
    if (!productLoad) {
      if (productPagination?.currentPage < productPagination?.totalPages) {
        dispatch(getProduct({}, productPagination?.currentPage + 1));
      }
    }
  }, [productPagination]);

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

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity
      // onPress={async () => {
      //   const res = await dispatch(
      //     getOneProduct(item.id, (res) => {
      //       if (res === 'success') {
      //         addProductCartRef.current.present();
      //       }
      //     })
      //   );
      // }}
      onPress={async () => {
        const res = await dispatch(getOneProduct(sellerID, item.id));
        if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
          addProductCartRef.current.present();
        }
      }}
      style={[styles.productDetailMainView, { marginTop: index === 0 ? ms(0) : ms(5) }]}
    >
      <View style={styles.imageDetailView}>
        <Image source={{ uri: item?.image }} style={styles.productImageStyle} />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.productNameText} numberOfLines={1}>
            {item?.name}
          </Text>
          <Text style={styles.genderTextStyle} numberOfLines={1}>
            {item?.category?.name}
          </Text>
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

  const isLoading = useSelector((state) =>
    isLoadingSelector([RETAIL_TYPES.GET_ONE_PRODUCT, RETAIL_TYPES.ADD_PRODUCT_CART], state)
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
        />

        {/* <Spacer space={SH(15)} /> */}

        <FlatList
          data={productData?.data ?? []}
          extraData={productData?.data ?? []}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          ListEmptyComponent={() => (
            <View style={styles.noProductCon}>
              <Text style={styles.noProduct}>{strings.retail.noProduct}</Text>
            </View>
          )}
          onEndReachedThreshold={0.1}
          onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
          onMomentumScrollBegin={() => {}}
          onMomentumScrollEnd={() => {
            if (onEndReachedCalledDuringMomentum.current) {
              onLoadMoreProduct();
              onEndReachedCalledDuringMomentum.current = false;
            }
          }}
          removeClippedSubviews={true}
          ListFooterComponent={() => (
            <View>{productLoad && <ActivityIndicator size="large" color={COLORS.darkBlue} />}</View>
          )}
        />

        <AddProductCart {...{ addProductCartRef, productDetailHanlder }} />
        <ProductDetails {...{ productDetailRef, bothSheetClose }} />

        {isLoading ? <FullScreenLoader /> : null}
      </View>
    </ScreenWrapper>
  );
}
