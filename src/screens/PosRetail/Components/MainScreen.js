import React, { useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer, TextField } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import {
  addDiscountPic,
  categoryMenu,
  categoryshoes,
  checkArrow,
  email,
  keyboard,
  location,
  notess,
  ok,
  pause,
  Phone_light,
  search_light,
  terryProfile,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { CategoryModal } from './CategoryModal';
import { SubCatModal } from './SubCatModal';
import { BrandModal } from './BrandModal';
import { catTypeData } from '@/constants/flatListData';
import { CustomHeader } from './CustomHeader';
import { moderateScale } from 'react-native-size-matters';
import { AddCartModal } from './AddCartModal';
import { AddCartDetailModal } from './AddCartDetailModal';

export function MainScreen({ checkOutHandler, headercrossHandler }) {
  const [selectedId, setSelectedId] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [catTypeId, setCatTypeId] = useState();
  const [addCartModal, setAddCartModal] = useState(false);
  const [addCartDetailModal, setAddCartDetailModal] = useState(false);

  const catTypeFun = id => {
    id === 1
      ? setCategoryModal(true)
      : id === 2
      ? setSubCategoryModal(true)
      : setBrandModal(true);
  };

  //  categoryType -----start
  const catTypeRenderItem = ({ item }) => {
    const backgroundColor = item.id === catTypeId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === catTypeId ? 'white' : 'black';

    return (
      <CatTypeItem
        item={item}
        onPress={() => {
          setCatTypeId(item.id), catTypeFun(item.id);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const CatTypeItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      style={styles.chooseCategoryCon}
      onPress={onPress}
      //   onPress={() => setCategoryModal(true)}
    >
      <Text style={styles.chooseCat}>{item.name}</Text>
      <Image source={categoryMenu} style={styles.categoryMenu} />
    </TouchableOpacity>
  );
  //  categoryType -----end

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      style={styles.productCon}
      onPress={() => setAddCartModal(true)}
    >
      <Image source={categoryshoes} style={styles.categoryshoes} />
      <Spacer space={SH(10)} />
      <Text numberOfLines={1} style={styles.productDes}>
        Made well colored cozy
      </Text>
      <Text numberOfLines={1} style={styles.productDes}>
        short cardigan
      </Text>
      <Spacer space={SH(6)} />
      <Text numberOfLines={1} style={styles.productSubHead}>
        Baby Boy
      </Text>
      <Spacer space={SH(6)} />
      <Text numberOfLines={1} style={styles.productPrice}>
        $5.65
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.homeScreenCon}>
        <CustomHeader crossHandler={headercrossHandler} />

        <View style={styles.displayflex2}>
          <View style={styles.itemLIistCon}>
            <View>
              <FlatList
                data={catTypeData}
                extraData={catTypeData}
                renderItem={catTypeRenderItem}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.contentContainer}
              />
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.displayflex}>
              <Text style={styles.allProduct}>
                All Products <Text style={styles.allProductCount}>(1280)</Text>
              </Text>
              <View style={styles.barcodeInputWraper}>
                <View style={styles.displayRow}>
                  <View>
                    <Image
                      source={search_light}
                      style={styles.sideSearchStyle}
                    />
                  </View>
                  <TextInput
                    placeholder="Search by Barcode, SKU, Name"
                    style={styles.sideBarsearchInput}
                    // value={search}
                    // onChangeText={search => (
                    //   setSearch(search), onChangeFun(search)
                    // )}
                    placeholderTextColor={COLORS.gerySkies}
                  />
                </View>
              </View>
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.productBodyCon}>
              <View>
                <FlatList
                  data={[1, 2, 3, 4, 5, 6]}
                  renderItem={renderItem}
                  keyExtractor={item => item}
                  extraData={selectedId}
                  // numColumns={6}
                  horizontal
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            //   pointerEvents="auto"
            style={[
              styles.rightSideCon,
              //  { opacity: 0.1 }
            ]}
          >
            <View style={styles.displayflex}>
              <Image source={keyboard} style={styles.keyboard} />
              <TouchableOpacity
                style={styles.holdCartCon}
                //   onPress={() => setProductdetailModal(true)}
              >
                {/* <Image source={pause} style={styles.pause} /> */}

                <Text style={styles.holdCart}>
                  {strings.dashboard.holdCart}
                </Text>
              </TouchableOpacity>
              <View style={[styles.holdCartCon, styles.dark_greyBg]}>
                {/* <Image source={eraser} style={styles.pause} /> */}
                <Text style={styles.holdCart}>
                  {strings.dashboard.clearcart}
                </Text>
              </View>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles.nameAddCon}>
              <View style={styles.sideBarInputWraper}>
                <View style={styles.displayRow}>
                  <View>
                    <Image
                      source={search_light}
                      style={styles.sideSearchStyle}
                    />
                  </View>
                  <TextInput
                    placeholder="803-238-2630"
                    style={styles.sideBarsearchInput}
                    keyboardType="numeric"
                    // value={search}
                    // onChangeText={search => (
                    //   setSearch(search), onChangeFun(search)
                    // )}
                    placeholderTextColor={COLORS.solid_grey}
                  />
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={terryProfile} style={styles.Phonelight} />
                  <Text style={styles.terryText}>Terry Moore</Text>
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={Phone_light} style={styles.Phonelight} />
                  <Text style={styles.terryText}>803-238-2630</Text>
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={email} style={styles.Phonelight} />
                  <Text style={styles.terryText}>
                    mailto:harryrady@jourrapide.com
                  </Text>
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={location} style={styles.Phonelight} />
                  <Text style={styles.terryText}>4849 Owagner Lane</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.okButtonCon}>
                <Image source={ok} style={styles.lockLight} />
                <Text style={[styles.okText]}>{strings.dashboard.ok}</Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View
              style={{
                borderWidth: 1,
                //   borderStyle: 'dashed',
                borderColor: COLORS.solidGrey,
              }}
            />
            <Spacer space={SH(10)} />
            <View style={styles.displayflex}>
              <View style={styles.addDiscountCon}>
                <Image source={addDiscountPic} style={styles.addDiscountPic} />
                <Text style={styles.addDiscountText}>Add Discount</Text>
              </View>
              <View style={styles.addDiscountCon}>
                <Image source={notess} style={styles.addDiscountPic} />
                <Text style={styles.addDiscountText}>Add Notes</Text>
              </View>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles.totalItemCon}>
              <Text style={styles.totalItem}>
                {strings.dashboard.totalItem}
                {' 10'}
              </Text>
            </View>
            <Spacer space={SH(5)} />
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Sub Total</Text>
              <Text style={styles.subTotalDollar}>$4.00</Text>
            </View>
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Total VAT</Text>
              <Text style={styles.subTotalDollar}>$4.00</Text>
            </View>
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Total Taxes</Text>
              <Text style={styles.subTotalDollar}>$4.00</Text>
            </View>
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Discount</Text>
              <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                ($4.00)
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: COLORS.solidGrey,
              }}
            />
            <Spacer space={SH(5)} />
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.itemValue}>Item value</Text>
              <Text style={[styles.subTotalDollar, styles.itemValueBold]}>
                $4.00
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.checkoutButtonSideBar}
              onPress={checkOutHandler}
            >
              <Text style={styles.checkoutText}>{strings.retail.checkOut}</Text>
              <Image source={checkArrow} style={styles.checkArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={categoryModal || subCategoryModal || brandModal}
      >
        <View>
          {categoryModal ? (
            <CategoryModal crossHandler={() => setCategoryModal(false)} />
          ) : subCategoryModal ? (
            <SubCatModal crossHandler={() => setSubCategoryModal(false)} />
          ) : (
            <BrandModal crossHandler={() => setBrandModal(false)} />
          )}
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={addCartModal || addCartDetailModal}
      >
        {addCartDetailModal ? (
          <AddCartDetailModal
            crossHandler={() => setAddCartDetailModal(false)}
          />
        ) : (
          <AddCartModal
            crossHandler={() => setAddCartModal(false)}
            detailHandler={() => setAddCartDetailModal(true)}
          />
        )}
      </Modal>
    </View>
  );
}
