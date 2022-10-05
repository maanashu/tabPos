import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Spacer, Button, TextField } from '@/components';
import { SH, SF, COLORS } from '@/theme';
import {
  Fonts,
  deliveryTruck,
  crossButton,
  menu,
  search_light,
  scn,
  purchese,
  arrow_right,
  categoryProduct,
  marboloRed,
  plus,
  minus,
  doubleRight,
  jfr,
  upMenu,
  dropdown2,
  dollar,
  addDiscountPic,
  notes,
  checkbox,
  checkedCheckbox,
} from '@/assets';
import { styles } from './Retails.styles';
import { strings } from '@/localization';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
const windowHeight = Dimensions.get('window').height;

export const CategoryData = [
  {
    name: 'Category',
    id: '1',
  },
  {
    name: 'Sub-Category',
    id: '2',
  },
  {
    name: 'Brand',
    id: '3',
  },
];
export const ProductData = [
  {
    name: 'Marlboro Red',
    id: '1',
  },
  {
    name: 'Marlboro Red1',
    id: '2',
  },
  {
    name: 'Marlboro Red2',
    id: '3',
  },
  {
    name: 'Marlboro Red2',
    id: '4',
  },
  {
    name: 'Marlboro Red2',
    id: '5',
  },
  {
    name: 'Marlboro Red2',
    id: '6',
  },
];

export function Retails() {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [categoryModal, setCategoryModal] = useState(false);
  const [sideContainer, setSideContainer] = useState(false);
  const [rightMoreAction, setRightMoreAction] = useState(false);
  const [addDiscount, setAddDiscount] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [checkboxs, setCheckBoxs] = useState(true);
  const [amountDis, setAmountDis] = useState('');
  const [percentDis, setPercentDis] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [numPadContainer, setNumpadContainer] = useState(false);
  const [amountPopup, setAmountPopup] = useState(false);
  const [cityModalOpen, setCityModelOpen] = useState(false);
  const [cityModalValue, setCityModalValue] = useState(null);
  const [cityItems, setCityItems] = useState([
    { label: 'Miami', value: 'miami' },
    { label: 'abc', value: 'abc' },
  ]);

  const menuHandler = () => {
    setCategoryModal(!categoryModal);
  };
  const sideContainerHandler = () => {
    setSideContainer(!sideContainer);
    setCategoryModal(true);
  };
  const rightConCloseHandler = () => {
    setSideContainer(false);
  };
  const amountPopHandler = () => {
    setAmountPopup(!amountPopup);
  };
  const amountRemoveHandler = () => {
    setAmountPopup(false);
  };
  const numpadConHandler = () => {
    setNumpadContainer(!numPadContainer);
  };
  const moreActionHandler = () => {
    setRightMoreAction(!rightMoreAction);
    setSideContainer(!sideContainer);
  };
  const moreActionCloseHandler = () => {
    setRightMoreAction(false);
    setSideContainer(true);
  };
  const addDiscountHandler = () => {
    setAddDiscount(!addDiscount);
  };
  const addDiscountCloseHandler = () => {
    setAddDiscount(false);
    setRightMoreAction(true);
  };
  const addNotesHandler = () => {
    setAddNotes(!addNotes);
  };
  const addNotesCloseHandler = () => {
    setAddNotes(false);
    setRightMoreAction(true);
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryCon}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.categoryHeader}>{item.name}</Text>
          <View style={styles.catProcCon1}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={categoryProduct} style={styles.categoryProduct} />
              <Text style={styles.productName1}>Tobacco</Text>
            </View>
          </View>
          <View style={styles.catProcCon2}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={categoryProduct} style={styles.categoryProduct} />
              <Text style={styles.productName2}>Vape</Text>
            </View>
          </View>

          <View style={styles.catProcCon2}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={categoryProduct} style={styles.categoryProduct} />
              <Text style={styles.productName2}>Vape</Text>
            </View>
          </View>
          <View style={styles.catProcCon2}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={categoryProduct} style={styles.categoryProduct} />
              <Text style={styles.productName2}>Vape</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={marboloRed} style={styles.marboloStyle} />
        <View style={{ paddingHorizontal: moderateScale(5) }}>
          <Text style={styles.productName}>{item.name}</Text>
          <Spacer space={SH(3)} />
          <Text style={styles.proSubName}>Marlboro</Text>
        </View>
      </View>
      <Spacer space={SH(7)} />
      <Text style={styles.size}>Size</Text>
      <Spacer space={SH(7)} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.cartonButton}>Carton</Text>
        <Text style={styles.singlePackBtn}>Single Pack</Text>
      </View>
      <Spacer space={SH(7)} />
      <Text style={styles.size}>Price</Text>
      <Spacer space={SH(7)} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.previousRate}>$5.65</Text>
        <Text style={styles.currentRate}>$5.65</Text>
      </View>
      <Spacer space={SH(12)} />
      <View style={styles.hrLine}></View>
      <Spacer space={SH(15)} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity>
          <Image source={minus} style={styles.plusBtn} />
        </TouchableOpacity>
        <Text style={styles.count}>0</Text>
        <TouchableOpacity>
          <Image source={plus} style={styles.plusBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    // start  header section
    <View style={styles.container}>
      <View style={styles.headerCon}>
        <View style={styles.flexRow}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={menuHandler}>
              {categoryModal ? (
                <Image source={upMenu} style={styles.menuStyle} />
              ) : (
                <Image source={menu} style={styles.menuStyle} />
              )}
            </TouchableOpacity>
            <View style={styles.inputWraper}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={search_light} style={styles.searchStyle} />
                <TextInput
                  placeholder="Search product here"
                  style={styles.searchInput}
                />
              </View>
              <View>
                <Image source={scn} style={styles.scnStyle} />
              </View>
            </View>
          </View>
          <View style={styles.purchaseCon}>
            <TouchableOpacity onPress={sideContainerHandler}>
              <Image source={purchese} style={styles.purcheseStyle} />
            </TouchableOpacity>
            <Text style={styles.purchaseText}>
              Items: <Text style={styles.purchasecount}>4</Text>
            </Text>
            <Image source={arrow_right} style={styles.arrowStyle} />
          </View>
        </View>
      </View>
      {/* End  header section */}

      {/* start  category  section */}
      {categoryModal ? null : (
        <View>
          <FlatList
            data={CategoryData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      {/* end  category  section */}
      <View style={styles.productbody}>
        <ScrollView>
          {sideContainer ? (
            <FlatList
              key={'_'}
              data={ProductData}
              renderItem={renderProductItem}
              keyExtractor={item => '_' + item.id}
              numColumns={2}
            />
          ) : (
            <FlatList
              key={'#'}
              data={ProductData}
              renderItem={renderProductItem}
              keyExtractor={item => '#' + item.id}
              numColumns={3}
            />
          )}
        </ScrollView>
      </View>

      {/* start right side view */}
      {sideContainer ? (
        <View style={styles.rightSideContainer}>
          <Spacer space={SH(15)} />
          <View style={styles.flexRow}>
            <TouchableOpacity onPress={rightConCloseHandler}>
              <Image source={doubleRight} style={styles.doubleRightstyle} />
            </TouchableOpacity>
            <View style={styles.flexRow2}>
              <Text style={styles.countCart}>123</Text>
              <Text style={styles.clearCart}>Clear cart</Text>
              <TouchableOpacity onPress={moreActionHandler}>
                <Text style={styles.actionButton}>More action</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Spacer space={SH(30)} />
          <TouchableOpacity
            style={styles.jfrContainer}
            onPress={amountPopHandler}
          >
            <View style={styles.jfrContainer2}>
              <Image source={jfr} style={styles.jfrStyle} />
              <View style={{ paddingVertical: verticalScale(5) }}>
                <Text style={styles.jfrText}>JFR Maduro</Text>
                <Text style={styles.boxText}>Box</Text>
                <Spacer space={SH(5)} />
                <Text style={styles.oneX}>x 1</Text>
              </View>
            </View>
            <Text style={styles.rate}>$382.75</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <View style={styles.bottomContainer}>
            <Spacer space={SH(10)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smalldarkText}>Sub Total</Text>
              <Text style={styles.smallLightText}>$4.00</Text>
            </View>
            <Spacer space={SH(12)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smallLightText}>Discount</Text>
              <Text style={styles.smallLightText}>-$2.00</Text>
            </View>
            <Spacer space={SH(12)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smallLightText}>Tax</Text>
              <Text style={styles.smallLightText}>$4.00</Text>
            </View>
            <Spacer space={SH(12)} />
            <View style={styles.hr}></View>
            <Spacer space={SH(12)} />
            <View style={styles.bottomSubCon}>
              <Text style={[styles.smalldarkText, { fontSize: SF(18) }]}>
                Total
              </Text>
              <Text style={[styles.smalldarkText, { fontSize: SF(20) }]}>
                $254.60
              </Text>
            </View>
            <Spacer space={SH(12)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smallLightText}>4 Items</Text>
            </View>
            <Spacer space={SH(12)} />
            <Button
              onPress={numpadConHandler}
              title="Checkout"
              textStyle={styles.selectedText}
              style={styles.submitButton}
            />
          </View>
        </View>
      ) : null}
      {/* end right side view */}

      {/* Amount container start */}

      <Modal animationType="fade" transparent={true} isVisible={amountPopup}>
        <View style={styles.amountPopupCon}>
          <View style={styles.primaryHeader}>
            <Text style={styles.headerText}>
              Amount: <Text>$382.75</Text>
            </Text>
            <TouchableOpacity
              onPress={amountRemoveHandler}
              style={styles.crossButtonPosition}
            >
              <Image source={crossButton} style={styles.crossButton} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(40)} />
          <View style={{ paddingHorizontal: moderateScale(20) }}>
            <View style={styles.amountjfrContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={jfr} style={styles.amountjfrStyle} />
                <Text style={styles.jfrmaduro}>JFR Maduro</Text>
              </View>
              <View>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image source={dropdown2} style={styles.dropDownIcon} />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image source={dropdown2} style={styles.dropDownIcon} />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStyle,
                    { zIndex: Platform.OS === 'ios' ? 100 : 4 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  open={cityModalOpen}
                  value={cityModalValue}
                  items={cityItems}
                  setOpen={setCityModelOpen}
                  setValue={setCityModalValue}
                  setItems={setCityItems}
                  placeholder="Box"
                  placeholderStyle={{ color: '#14171A' }}
                />
              </View>
            </View>
            <Spacer space={SH(30)} />
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Price</Text>
              <Text style={[styles.price, { fontSize: SF(18) }]}>$382.75</Text>
            </View>
            <Spacer space={SH(30)} />
            <View
              style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
            >
              <Image source={minus} style={styles.plusBtn2} />
              <Text style={[styles.price, { fontSize: SF(24) }]}>1</Text>
              <Image source={plus} style={styles.plusBtn2} />
            </View>
            {/* <View style={{flex:1}}></View> */}
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.removeButton}>Remove from cart</Text>
            <Text style={[styles.removeButton, styles.updateButton]}>
              Update to cart
            </Text>
          </View>
        </View>
      </Modal>
      {/* Amount container End */}

      {/* Numpad container start */}
      {numPadContainer ? (
        <View style={styles.numpadContainer}>
          <View style={{ height: windowHeight, paddingBottom: 60 }}>
            <Spacer space={SH(20)} />
            <View style={styles.inputWraper2}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={dollar} style={styles.searchStyle} />
                <TextInput
                  placeholder="0.00"
                  placeholderTextColor="black"
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.amountInput}
                />
              </View>
            </View>
            <Spacer space={SH(20)} />
            <TextInput
              placeholder="Tittle"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />
            <Spacer space={SH(20)} />
            <TouchableOpacity style={styles.addButtonCon}>
              <Text style={styles.addButtonText}>Add notes</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <View style={styles.directionInRow}>
              <View style={[styles.addCartButton, styles.addcountButton]}>
                <Image source={minus} style={styles.minusBtn2} />
                <Text style={styles.addCartText}>0</Text>
                <Image
                  source={plus}
                  style={[styles.minusBtn2, styles.plusCartBtn]}
                />
              </View>
              <View
                style={
                  amount && title
                    ? styles.addCartButtonFill
                    : styles.addCartButton
                }
              >
                <Text
                  style={
                    amount && title
                      ? styles.addCartBtnTextsubmit
                      : styles.addCartBtnText
                  }
                >
                  Add to cart
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}

      {/* Numpad container end */}
      {/* right side more action View start */}
      {rightMoreAction ? (
        <View
          style={[
            styles.rightSideContainer,
            { paddingHorizontal: moderateScale(10) },
          ]}
        >
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <Text style={styles.moreActText}>More Action</Text>
            <TouchableOpacity onPress={moreActionCloseHandler}>
              <Image source={crossButton} style={styles.crossButtonStyle} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <TouchableOpacity
            style={styles.discountCon}
            onPress={addDiscountHandler}
          >
            <Image source={addDiscountPic} style={styles.addDiscountStyle} />
            <Text style={styles.addDiscountText}>Add Discount</Text>
          </TouchableOpacity>
          <Spacer space={SH(10)} />
          <TouchableOpacity
            style={styles.discountCon}
            onPress={addNotesHandler}
          >
            <Image source={notes} style={styles.addDiscountStyle} />
            <Text style={styles.addDiscountText}>Add Notes</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* right side more action View end */}

      {/* right side Add discount View start */}
      {addDiscount ? (
        <View
          style={[
            styles.rightSideContainer,
            { paddingHorizontal: moderateScale(10) },
          ]}
        >
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <Text style={styles.moreActText}>Add discount to cart</Text>
            <TouchableOpacity onPress={addDiscountCloseHandler}>
              <Image source={crossButton} style={styles.crossButtonStyle} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <View style={styles.adddiscountCon}>
            <Spacer space={SH(12)} />
            <Text style={styles.discountHeader}>Discount</Text>
            <Spacer space={SH(12)} />
            <View
              style={
                amountDis
                  ? styles.dicountInputWraper2
                  : styles.dicountInputWraper
              }
            >
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  {checkboxs ? (
                    <TouchableOpacity onPress={() => setCheckBoxs(!checkboxs)}>
                      <Image source={checkbox} style={styles.checkboxStyle} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setCheckBoxs(!checkboxs)}>
                      <Image
                        source={checkedCheckbox}
                        style={styles.checkboxStyle}
                      />
                    </TouchableOpacity>
                  )}
                  <Text
                    style={amountDis ? styles.amountLabel2 : styles.amountLabel}
                  >
                    Amount Discount
                  </Text>
                </View>
                <TextInput
                  placeholder="$ 00.00"
                  style={
                    amountDis
                      ? styles.amountDiscountInput2
                      : styles.amountDiscountInput
                  }
                  value={amountDis}
                  onChangeText={setAmountDis}
                />
              </View>
            </View>
            <Spacer space={SH(12)} />
            <View
              style={
                percentDis
                  ? styles.dicountInputWraper2
                  : styles.dicountInputWraper
              }
            >
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  {checkboxs ? (
                    <TouchableOpacity onPress={() => setCheckBoxs(!checkboxs)}>
                      <Image source={checkbox} style={styles.checkboxStyle} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setCheckBoxs(!checkboxs)}>
                      <Image
                        source={checkedCheckbox}
                        style={styles.checkboxStyle}
                      />
                    </TouchableOpacity>
                  )}
                  <Text
                    style={
                      percentDis ? styles.amountLabel2 : styles.amountLabel
                    }
                  >
                    Percentage Discount
                  </Text>
                </View>
                <TextInput
                  placeholder="$ 00.00"
                  style={
                    percentDis
                      ? styles.amountDiscountInput2
                      : styles.amountDiscountInput
                  }
                  value={percentDis}
                  onChangeText={setPercentDis}
                />
              </View>
            </View>
            <Spacer space={SH(12)} />
            <View
              style={
                discountCode
                  ? styles.dicountInputWraper2
                  : styles.dicountInputWraper
              }
            >
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  {checkboxs ? (
                    <TouchableOpacity onPress={() => setCheckBoxs(!checkboxs)}>
                      <Image source={checkbox} style={styles.checkboxStyle} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setCheckBoxs(!checkboxs)}>
                      <Image
                        source={checkedCheckbox}
                        style={styles.checkboxStyle}
                      />
                    </TouchableOpacity>
                  )}
                  <Text
                    style={
                      discountCode ? styles.amountLabel2 : styles.amountLabel
                    }
                  >
                    Discount Code
                  </Text>
                </View>
                <TextInput
                  placeholder="CODE"
                  style={
                    discountCode
                      ? styles.amountDiscountInput2
                      : styles.amountDiscountInput
                  }
                  value={discountCode}
                  onChangeText={setDiscountCode}
                />
              </View>
            </View>
            <Spacer space={SH(12)} />
            <Text style={styles.discountTitle}>Discount Tittle</Text>
            <Spacer space={SH(12)} />
            <TextInput placeholder="Tittle" style={styles.discountTitleInput} />
            <Spacer space={SH(12)} />
          </View>
        </View>
      ) : null}

      {/* right side Add discount View end */}

      {/* right side Add notes View start */}
      {addNotes ? (
        <View
          style={[
            styles.rightSideContainer,
            { paddingHorizontal: moderateScale(10) },
          ]}
        >
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <Text style={styles.moreActText}>Add notes</Text>
            <TouchableOpacity onPress={addNotesCloseHandler}>
              <Image source={crossButton} style={styles.crossButtonStyle} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <View style={styles.adddiscountCon}>
            <Spacer space={SH(12)} />
            <Text style={styles.discountHeader}>Notes</Text>
            <Spacer space={SH(12)} />
            <TextInput
              placeholder="Write notes here"
              multiline={true}
              numberOfLines={4}
              style={styles.addNoteInput}
            />
            <Spacer space={SH(12)} />
          </View>
          <Spacer space={SH(15)} />
          <View style={styles.saveButtonCon}>
          <View style={styles.saveNotesButton}>
            <Text style={styles.saveNotesText}>Save notes</Text>
          </View>
          </View>
        </View>
      ) : null}

      {/* right side Add notes View end */}
    </View>
  );
}
