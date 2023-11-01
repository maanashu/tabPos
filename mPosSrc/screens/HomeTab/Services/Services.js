import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from './styles';
import { ClothCollection, ProductData, ProductsList, ServicesData } from '@mPOS/constants/enums';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import { Images } from '@mPOS/assets';
import Search from '../RetailProducts/Components/Search';
import AddProductCart from '../RetailProducts/Components/AddProductCart';
import { AddServiceCartModal } from './AddServiceCart';
import RBSheet from 'react-native-raw-bottom-sheet';

export function Services(props) {
  const addProductCartRef = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState('');
  const data = props?.route?.params?.item;
  const [isSelected, setSelected] = useState(false);

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
      <Text style={[styles.categoryTitleText]}>{item?.title}</Text>
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
      <Text style={[styles.categoryTitleText]}>{item?.title}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedProduct(item), addProductCartRef.current.open();
      }}
      style={[styles.productDetailMainView, { marginTop: index === 0 ? ms(0) : ms(5) }]}
    >
      <View style={styles.imageDetailView}>
        <Image source={{ uri: item?.image }} style={styles.productImageStyle} />
        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.productNameText}>{item?.title}</Text>
          <Text style={styles.genderTextStyle}>{item?.gender}</Text>
          <Text style={styles.priceTextStyle}>{item?.price}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          padding: ms(4),
          borderWidth: 1,
          borderColor: isSelected ? COLORS.darkBlue : COLORS.inputBorder,
          borderRadius: ms(5),
        }}
      >
        <Image
          source={Images.addTitle}
          resizeMode="contain"
          style={{
            height: ms(30),
            width: ms(30),
            tintColor: isSelected ? COLORS.darkBlue : COLORS.placeholderText,
          }}
        />
      </TouchableOpacity>
      {isSelected ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: ms(20),
            backgroundColor: COLORS.darkBlue,
            paddingVertical: ms(1),
            paddingHorizontal: ms(5),
            borderRadius: ms(10),
          }}
        >
          <Text style={{ color: COLORS.white }}>{'1'}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: COLORS.white }}>
        <FlatList
          horizontal
          data={ServicesData}
          renderItem={renderCategoryItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.key}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
      <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />

      <View style={{ backgroundColor: COLORS.white }}>
        <FlatList
          horizontal
          data={ClothCollection}
          renderItem={renderCollectionItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.key}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>

      <Search />

      {/* <Spacer space={SH(15)} /> */}
      <FlatList
        data={ProductsList}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      />
      <RBSheet
        ref={addProductCartRef}
        height={Dimensions.get('window').height - ms(120)}
        openDuration={250}
        customStyles={{
          container: styles.rbSheetContainer,
        }}
      >
        <AddServiceCartModal />
      </RBSheet>
      {/* <AddProductCart {...{addProductCartRef}} /> */}
    </SafeAreaView>
  );
}
