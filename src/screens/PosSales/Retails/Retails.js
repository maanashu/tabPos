import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Spacer, Button, TextField } from '@/components';
import { SH, SF } from '@/theme';
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
} from '@/assets';
import { styles } from './Retails.styles';
import { strings } from '@/localization';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Modal from "react-native-modal";

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
];
export function Retails() {
  const [categoryModal, setCategoryModal] = useState(false);
  const [sideContainer, setSideContainer] = useState(false);
  const [amountPopup, setAmountPopup] = useState(false)

  const menuHandler = () => {
    setCategoryModal(!categoryModal);
  };
  const sideContainerHandler = () => {
    setSideContainer(!sideContainer);
  };
  const rightConCloseHandler = () => {
    setSideContainer(false);
  };
  const amountPopHandler = () => {
    setAmountPopup(!amountPopup)
  };
  const amountRemoveHandler = () => {
    setAmountPopup(false)
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
      <View style={{flexDirection:'row', alignItems:'center'}}>
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
          <FlatList
            data={ProductData}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            // showsVerticalScrollIndicator={false}
            // bounces={false}
            numColumns={3}
          />
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
              <Text style={styles.actionButton}>More action</Text>
            </View>
          </View>
          <Spacer space={SH(30)} />
          <TouchableOpacity style={styles.jfrContainer} onPress={amountPopHandler}>
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
              // onPress={loginIntialHandler}
              title="Checkout"
              textStyle={styles.selectedText}
              style={styles.submitButton}
            />
          </View>
        </View>
      ) : null}
      {/* end right side view */}

      {/* Amount container start */}

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={amountPopup}
      >
        <View style={styles.amountPopupCon}>
          <View style={styles.primaryHeader}>
              <Text style={styles.headerText}>Amount: <Text>$382.75</Text></Text>
              <TouchableOpacity onPress={amountRemoveHandler} style={styles.crossButtonPosition}>
               <Image source={crossButton} style={styles.crossButton}/>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Amount container End */}
    </View>
  );
}
