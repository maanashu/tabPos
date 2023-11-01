import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { COLORS, Fonts, SH } from '@/theme';
import { ms } from 'react-native-size-matters';
import Search from './Components/Search';
import { Images } from '@mPOS/assets';
// import {AddNotes} from '@mPOS/screens/Cart/Components';
import AddNotes from '@mPOS/screens/Cart/Components/AddNotes';
import AddDiscount from '@mPOS/screens/Cart/Components/AddDiscount';
import ClearCart from '@mPOS/screens/Cart/Components/ClearCart';
import CustomProductAdd from '@mPOS/screens/Cart/Components/CustomProductAdd';
import PriceChange from '@mPOS/screens/Cart/Components/PriceChange';
import Modal from 'react-native-modal';
import { strings } from '@mPOS/localization';
import { FullScreenLoader, Spacer } from '@mPOS/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCart } from '@mPOS/actions/RetailActions';
import { getRetail } from '@mPOS/selectors/RetailSelector';
import { formattedReturnPrice } from '@mPOS/utils/GlobalMethods';
import { number } from 'prop-types';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { RETAIL_TYPES } from '@mPOS/Types/RetailTypes';

export function Cart() {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);

  const productCartData = retailData?.productCart;
  const paymentSelection = useRef();
  const addProductCartRef = useRef(null);

  const [addNotes, setAddNotes] = useState(false);
  const [addDiscount, setAddDiscount] = useState(false);
  const [clearCart, setClearCart] = useState(false);
  const [customProductAdd, setCustomProductAdd] = useState(false);
  const [priceChange, setPriceChange] = useState(false);
  const isLoading = useSelector((state) =>
    isLoadingSelector([RETAIL_TYPES.GET_PRODUCT_CART], state)
  );
  useEffect(() => {
    dispatch(getProductCart());
  }, []);

  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [listData, setListData] = useState(
    Array(20)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const tipData = [
    {
      id: 1,
      percentage: '18%',
      title: '18',
    },
    {
      id: 2,
      percentage: '20%',
      title: '20',
    },
    {
      id: 3,
      percentage: '22%',
      title: '22',
    },
    {
      id: 4,
      percentage: 'No Tips',
      percentage: 'No Tips',
    },
  ];

  const paymentSelectionData = [
    {
      id: 1,
      paymentType: 'Cost',
    },
    {
      id: 2,
      paymentType: 'Card',
    },
    {
      id: 3,
      paymentType: 'JBR coin',
    },
    {
      id: 4,
      paymentType: 'Gift Card',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.cartScreenHeader,
          { opacity: productCartData?.poscart_products?.length > 0 ? 1 : 0.5 },
        ]}
        pointerEvents={productCartData?.poscart_products?.length > 0 ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={styles.headerImagecCon}
          // onPress={() => setAddNotes((prev) => !prev)}
        >
          <Image source={Images.addCustomerIcon} style={styles.headerImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerImagecCon}
          onPress={() => setAddNotes((prev) => !prev)}
        >
          <Image source={Images.notes} style={styles.headerImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerImagecCon}
          onPress={() => setAddDiscount((prev) => !prev)}
        >
          <Image source={Images.discountOutline} style={styles.headerImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerImagecCon}
          onPress={() => setClearCart((prev) => !prev)}
        >
          <Image source={Images.ClearEraser} style={styles.headerImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerImagecCon}>
          <Image source={Images.pause} style={styles.headerImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerImagecCon}
          onPress={() => setCustomProductAdd((prev) => !prev)}
        >
          <Image source={Images.fluent} style={styles.headerImage} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
        <View style={styles.searchMainView}>
          <Image source={Images.search} style={styles.searchIconStyle} />

          <TextInput
            placeholder={strings.homeTab.placeholder}
            style={styles.searchTextInputStyle}
          />
        </View>

        <View style={styles._flatListContainer}>
          {isLoading ? (
            <View style={styles.noDataCon}>
              <ActivityIndicator size="small" color={COLORS.darkBlue} />
            </View>
          ) : (
            <SwipeListView
              showsVerticalScrollIndicator={false}
              data={productCartData?.poscart_products}
              extraData={productCartData?.poscart_products}
              renderItem={(data) => (
                <View style={styles.cartProductCon}>
                  <View style={[styles.disPlayFlex]}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={{ uri: data?.item?.product_details?.image }}
                        style={{ width: ms(35), height: ms(35) }}
                      />
                      <View style={{ marginLeft: ms(10) }}>
                        <Text style={styles.cartProductName} numberOfLines={1}>
                          {data?.item?.product_details?.name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.colorName}>Color: Grey</Text>
                          <Text style={[styles.colorName, { marginLeft: ms(10) }]}>Size: xxl</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: ms(3),
                          }}
                        >
                          <Text style={[styles.cartPrice, { fontFamily: Fonts.Regular }]}>
                            ${data?.item?.product_details?.supply?.supply_prices?.selling_price}
                          </Text>
                          <Text style={[styles.colorName, { marginLeft: ms(10) }]}>X</Text>
                          <View style={styles.counterCon}>
                            <TouchableOpacity style={styles.cartPlusCon}>
                              <Text style={styles.counterDigit}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterDigit}>{data?.item?.qty}</Text>
                            <TouchableOpacity style={styles.cartPlusCon}>
                              <Text style={styles.counterDigit}>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity onPress={() => setPriceChange((prev) => !prev)}>
                        <Image source={Images.pencil} style={styles.pencil} />
                      </TouchableOpacity>
                      <Text style={[styles.cartPrice, { marginTop: ms(15) }]}>
                        $
                        {data?.item?.product_details?.supply?.supply_prices?.selling_price *
                          data?.item?.qty}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              renderHiddenItem={() => (
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  // onPress={() => deleteRow(rowMap, data.item.key)}
                  onPress={() => alert('in Progress')}
                >
                  <Image
                    source={Images.cross}
                    style={[styles.crossImageStyle, { tintColor: COLORS.white }]}
                  />
                </TouchableOpacity>
              )}
              // leftOpenValue={75}
              rightOpenValue={-75}
              previewRowKey={'0'}
              // previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
              ListEmptyComponent={() => (
                <View style={styles.noDataCon}>
                  <Text style={styles.noDataFound}>{strings.cart.noDataFound}</Text>
                </View>
              )}
            />
          )}
        </View>

        <TouchableOpacity style={styles.availablOffercon}>
          <Text style={styles.avaliableofferText}>{strings.cart.availablOffer}</Text>
        </TouchableOpacity>
        <Spacer space={SH(10)} />
        <View style={styles.totalItemCon}>
          <Text style={styles.totalItem}>
            {strings.cart.totalItem} {productCartData?.poscart_products?.length}
          </Text>
        </View>
        <Spacer space={SH(8)} />
        <View style={styles.disPlayFlex}>
          <Text style={styles.subTotal}>Sub Total</Text>
          <Text style={styles.subTotalBold}>
            ${Number(productCartData?.amount?.products_price ?? '0.00')?.toFixed(2)}
          </Text>
        </View>
        <Spacer space={SH(8)} />
        <View style={styles.disPlayFlex}>
          <Text style={styles.subTotal}>Total Taxes</Text>
          <Text style={styles.subTotalBold}>
            ${Number(productCartData?.amount?.tax ?? '0.00')?.toFixed(2)}
          </Text>
        </View>
        <Spacer space={SH(8)} />
        <View style={styles.disPlayFlex}>
          <Text style={styles.subTotal}>{`Discount ${
            productCartData?.discount_flag === 'percentage' ? '(%)' : ''
          } `}</Text>
          <Text style={[styles.subTotalBold, { color: COLORS.red }]}>
            {formattedReturnPrice(productCartData?.amount?.discount)}
          </Text>
        </View>
        <Spacer space={SH(8)} />
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: COLORS.light_border,
          }}
        />
        <Spacer space={SH(8)} />
        <View style={styles.disPlayFlex}>
          <Text style={styles.itemValue}>Item value</Text>
          <Text style={styles.itemValue}>
            ${Number(productCartData?.amount?.total_amount ?? '0.00')?.toFixed(2)}
          </Text>
        </View>
        <Spacer space={SH(15)} />
        <TouchableOpacity
          style={[
            styles.payNowcon,
            {
              opacity: productCartData?.poscart_products?.length > 0 ? 1 : 0.7,
            },
          ]}
          onPress={handlePresentModalPress}
          disabled={productCartData?.poscart_products?.length > 0 ? false : true}
        >
          <Text style={styles.payNowText}>{strings.cart.payNow}</Text>
          <Image source={Images.buttonArrow} style={styles.buttonArrow} />
        </TouchableOpacity>
      </View>

      {/* header modal */}

      <Modal animationType="fade" transparent={true} isVisible={addNotes}>
        <AddNotes notesClose={() => setAddNotes(false)} />
      </Modal>
      <Modal animationType="fade" transparent={true} isVisible={addDiscount}>
        <AddDiscount discountClose={() => setAddDiscount(false)} />
      </Modal>
      <Modal animationType="fade" transparent={true} isVisible={clearCart}>
        <ClearCart cartClose={() => setClearCart(false)} />
      </Modal>
      <Modal animationType="fade" transparent={true} isVisible={customProductAdd}>
        <CustomProductAdd customProductClose={() => setCustomProductAdd(false)} />
      </Modal>
      <Modal animationType="fade" transparent={true} isVisible={priceChange}>
        <PriceChange priceChangeClose={() => setPriceChange(false)} />
      </Modal>

      {/* <RBSheet
        ref={paymentSelection}
        height={ms(700)}
        animationType={'fade'}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          },
        }}>
        <View></View>
      </RBSheet> */}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={() => <View />}
        onChange={handleSheetChanges}
        backdropComponent={CustomBackdrop}
        style={styles.sheetStyle}
        detached
      >
        <View style={{ paddingHorizontal: ms(20), paddingVertical: ms(10) }}>
          <TouchableOpacity style={{ position: 'absolute', top: ms(5), right: ms(10) }}>
            <Image
              source={Images.cross}
              resizeMode="contain"
              style={{ height: ms(40), width: ms(40) }}
            />
          </TouchableOpacity>
          <Spacer space={ms(45)} />
          <Text
            style={{
              fontSize: ms(16),
              fontFamily: Fonts.Regular,
              color: COLORS.placeholderText,
              textAlign: 'center',
            }}
          >
            {'Total Payable Amount:'}
          </Text>
          <Text
            style={{
              fontSize: ms(18),
              fontFamily: Fonts.SemiBold,
              color: COLORS.darkBlue,
              textAlign: 'center',
              marginTop: ms(10),
            }}
          >
            {'$34.05'}
          </Text>
          <Spacer space={ms(10)} />

          <View
            style={{
              borderRadius: ms(5),
              borderColor: COLORS.light_border,
              borderWidth: 1,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                fontSize: ms(16),
                fontFamily: Fonts.SemiBold,
                color: COLORS.black,
                padding: ms(10),
                backgroundColor: COLORS.lightgray,
              }}
            >
              {'Select Tips'}
            </Text>
            <Text
              style={{
                fontSize: ms(16),
                fontFamily: Fonts.SemiBold,
                color: COLORS.black,
                paddingHorizontal: ms(10),
                paddingTop: ms(5),
              }}
            >
              {'$5.19'}
            </Text>
            <FlatList
              data={tipData}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={{ marginHorizontal: ms(6) }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.lightgray,
                    marginHorizontal: ms(4),
                    borderRadius: ms(5),
                    marginVertical: ms(10),
                    padding: ms(18),
                    paddingVertical: ms(10),
                  }}
                >
                  <Text
                    style={{
                      fontSize: ms(16),
                    }}
                  >
                    {item?.percentage}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </BottomSheetModal>
      {/* {isLoading ? <FullScreenLoader /> : null} */}
    </SafeAreaView>
  );
}
