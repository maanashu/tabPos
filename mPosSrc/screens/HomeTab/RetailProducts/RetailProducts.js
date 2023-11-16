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
import { strings } from '@mPOS/localization';
import ProductDetails from './Components/ProductDetails';
import { FullScreenLoader, Header, ImageView, ScreenWrapper } from '@mPOS/components';
import { debounce } from 'lodash';
import {
  cartRun,
  getBrand,
  getCategory,
  getMainProduct,
  getOneProduct,
  getSubCategory,
} from '@/actions/RetailAction';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';
import Modal from 'react-native-modal';
import ProductFilter from './Components/ProductFilter';
import { Fonts } from '@/assets';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@common/commonImports';

export function RetailProducts(props) {
  const onEndReachedCalledDuringMomentum = useRef(false);
  const getAuth = useSelector(getAuthData);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  // console.log(retailData?.categoryList);
  const productData = retailData?.getMainProduct;
  const addProductCartRef = useRef(null);
  const productDetailRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const data = props?.route?.params?.item;
  const [isSelected, setSelected] = useState(false);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [productFilterCount, setProductFilterCount] = useState(0);
  const [rootServiceId, setRootServiceId] = useState(null);
  const [subCategorySelectId, setSubCategorySelectId] = useState(null);
  const productDetailHanlder = () => {
    productDetailRef.current.present();
  };
  const bothSheetClose = () => {
    productDetailRef.current.dismiss();
    addProductCartRef.current.dismiss();
  };
  const [productSearch, setProductSearch] = useState('');
  const [productFilter, setProductFilter] = useState(false);

  useEffect(() => {
    const ids = {
      ...(rootServiceId && { category_ids: rootServiceId }),
      ...(subCategorySelectId && { sub_category_ids: subCategorySelectId }),
    };
    dispatch(getMainProduct(ids));
  }, [rootServiceId, subCategorySelectId]);

  useEffect(() => {
    dispatch(getCategory(sellerID));
    dispatch(getSubCategory(sellerID));
    dispatch(getBrand(sellerID));
  }, []);
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

  const renderRootServiceItem = ({ item, index }) => {
    const color = item.id === rootServiceId ? COLORS.primary : COLORS.darkGray;
    const fonts = item.id === rootServiceId ? Fonts.SemiBold : Fonts.Regular;
    return (
      <RootServiceItem
        item={item}
        onPress={() =>
          rootServiceId === item.id ? setRootServiceId(null) : setRootServiceId(item.id)
        }
        textColor={color}
        fonts={fonts}
      />
    );
  };

  const RootServiceItem = ({ item, onPress, textColor, fonts }) => (
    <TouchableOpacity onPress={onPress} style={[styles.categoryMainView]}>
      <Text style={[styles.categoryTitleText, { color: textColor, fontFamily: fonts }]}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({ item, index }) => {
    const color = item.id === subCategorySelectId ? COLORS.primary : COLORS.darkGray;
    const fonts = item.id === subCategorySelectId ? Fonts.SemiBold : Fonts.Regular;
    return (
      <SubCategoryItem
        item={item}
        onPress={() =>
          subCategorySelectId === item.id
            ? setSubCategorySelectId(null)
            : setSubCategorySelectId(item.id)
        }
        textColor={color}
        fonts={fonts}
      />
    );
  };
  const SubCategoryItem = ({ item, onPress, textColor, fonts }) => (
    <TouchableOpacity onPress={onPress} style={[styles.categoryMainView]}>
      <Text style={[styles.categoryTitleText, { color: textColor, fontFamily: fonts }]}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={async () => {
        const res = await dispatch(getOneProduct(sellerID, item.id));
        if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
          addProductCartRef.current.present();
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
    isLoadingSelector([TYPES.GET_ONE_PRODUCT, TYPES.ADDCART], state)
  );
  const categoryLoad = useSelector((state) => isLoadingSelector([TYPES.GET_CATEGORY], state));
  const subCategoryLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SUB_CATEGORY], state)
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={{ backgroundColor: COLORS.white }}>
          <Header
            backRequired
            title={`Back`}
            cartIcon
            cartHandler={() => {
              dispatch(cartRun('product'));
              navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart });
            }}
          />
          {categoryLoad ? (
            <View style={[styles.contentContainerStyle, { height: ms(20) }]}>
              <Text style={styles.loading}>{'Loading...'}</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={retailData?.categoryList ?? []}
              renderItem={renderRootServiceItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={styles.contentContainerStyle}
            />
          )}

          <View style={styles.lineSeprator} />
          <View
            style={{
              borderWidth: 0.5,
              paddingHorizontal: ms(10),
              flex: 0.6,
              borderColor: COLORS.washGrey,
              backgroundColor: COLORS.washGrey,
            }}
          />
          {subCategoryLoad ? (
            <View style={[styles.contentContainerStyle, { height: ms(20) }]}>
              <Text style={styles.loading}>{'Loading...'}</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={retailData?.subCategories ?? []}
              renderItem={renderSubCategoryItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={styles.contentContainerStyle}
            />
          )}
        </View>

        <Search
          value={productSearch}
          onChangeText={(productSearch) => {
            setProductSearch(productSearch);
            debounceProduct(productSearch);
          }}
          filterHandler={() => setProductFilter(true)}
          selectFilterCount={productFilterCount}
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
