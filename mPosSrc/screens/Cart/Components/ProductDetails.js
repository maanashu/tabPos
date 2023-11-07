import React, { useState } from 'react';
import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { COLORS, Fonts } from '@/theme';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { ms } from 'react-native-size-matters';
import { styles } from '../styles';
import { StockItems } from '@mPOS/constants/enums';

const ProductDetails = ({ productDetailRef, selectedProduct }) => {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: ms(10),
          borderWidth: 1,
          marginVertical: ms(5),
          paddingVertical: ms(3),
          borderColor: COLORS.placeholderText,
          borderRadius: ms(4),
          flex: 1,
        }}
      >
        <Text style={{ flex: 3 }}>{item?.size}</Text>
        <Text style={{ flex: 1 }}>{item?.quantity}</Text>
      </View>
      <TouchableOpacity
        style={{
          marginLeft: ms(10),
          borderWidth: 1,
          paddingHorizontal: ms(8),
          paddingVertical: ms(4),
          borderColor: COLORS.placeholderText,
          borderRadius: ms(4),
        }}
      >
        <Image
          source={Images.notification}
          style={{ height: ms(12), width: ms(20) }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <RBSheet
      ref={productDetailRef}
      height={Dimensions.get('window').height - ms(60)}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: ms(10),
        },
      }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View>
          <Spacer space={ms(15)} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => productDetailRef.current.close()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: ms(10),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  //   productDetailRef.current.open();
                  // addProductCartRef.current.close();
                }}
                style={{
                  paddingHorizontal: ms(10),
                  paddingVertical: ms(3),
                  marginLeft: ms(10),
                  backgroundColor: COLORS.light_border,
                  borderRadius: ms(4),
                }}
              >
                <Text style={{ color: COLORS.black }}>{'Back'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  paddingHorizontal: ms(8),
                  paddingVertical: ms(3),
                  marginLeft: ms(10),
                  backgroundColor: COLORS.darkBlue,
                  borderRadius: ms(4),
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: ms(14) }}>{'Add to Cart'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Spacer space={ms(15)} />
          <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />
          <Spacer space={ms(15)} />

          <View
            style={{
              flexDirection: 'row',
              overflow: 'hidden',
              borderRadius: ms(10),
            }}
          >
            <View
              style={{
                borderRadius: ms(10),
                overflow: 'hidden',
                height: ms(100),
                width: ms(80),
              }}
            >
              <Image
                source={Images.boy}
                resizeMode="cover"
                style={{ height: ms(100), width: ms(80) }}
              />
            </View>
            <View style={{ marginHorizontal: ms(10) }}>
              <Text
                style={{
                  fontSize: ms(14),
                  fontFamily: Fonts.Bold,
                  color: COLORS.black,
                }}
              >
                {'Jacket-Nord'}
              </Text>
              <Text style={{ fontSize: ms(12), color: COLORS.black }}>{'Men>Coats & Jacket'}</Text>
              <Text
                style={{
                  fontSize: ms(10),
                  color: COLORS.placeholderText,
                  marginTop: ms(6),
                  marginRight: ms(10),
                  width: ms(260),
                }}
              >
                {
                  'A hoody jacket, also known as a hoodie or a hooded sweatshirt, is a type of casual garment that is designed for comfort and warmth.'
                }
              </Text>
            </View>
          </View>
          <Spacer space={ms(20)} />

          <View
            style={{
              backgroundColor: COLORS.light_border,
              flexDirection: 'row',
              paddingVertical: ms(10),
              borderRadius: ms(5),
              paddingHorizontal: ms(10),
            }}
          >
            <Text style={{ flex: 1, color: COLORS.black, fontSize: ms(13) }}>{'Price'}</Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: ms(15),
                fontFamily: Fonts.SemiBold,
              }}
            >
              {'$82.75'}
            </Text>
          </View>
          <Spacer space={ms(15)} />

          <View
            style={{
              borderWidth: 1,
              borderRadius: ms(10),
              borderColor: COLORS.placeholderText,
              paddingVertical: ms(5),
              paddingHorizontal: ms(10),
            }}
          >
            <View style={{ flexDirection: 'row', marginVertical: ms(5) }}>
              <Text style={{ flex: 1, color: COLORS.black, fontSize: ms(13) }}>{'SKU'}</Text>
              <Text>{'7044085C'}</Text>
            </View>
            <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />

            <View style={{ flexDirection: 'row', marginVertical: ms(5) }}>
              <Text style={{ flex: 1, color: COLORS.black, fontSize: ms(13) }}>{'Barcode'}</Text>
              <Text>{'12'}</Text>
            </View>
            <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />

            <View style={{ flexDirection: 'row', marginVertical: ms(5) }}>
              <Text style={{ flex: 1, color: COLORS.black, fontSize: ms(13) }}>{'Unit Type'}</Text>
              <Text>{'12'}</Text>
            </View>
            <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />

            <View style={{ flexDirection: 'row', marginVertical: ms(5) }}>
              <Text style={{ flex: 1, color: COLORS.black, fontSize: ms(13) }}>
                {'Unit Weight'}
              </Text>
              <Text>{'12'}</Text>
            </View>
            <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />

            <View style={{ flexDirection: 'row', marginVertical: ms(5) }}>
              <Text style={{ flex: 1, color: COLORS.black, fontSize: ms(13) }}>
                {'Other locations'}
              </Text>
              <Text>{'NA'}</Text>
            </View>
          </View>
          <Spacer space={ms(15)} />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                flex: 1,
                alignItems: 'center',
                paddingVertical: ms(10),
                borderColor: COLORS.placeholderText,
                borderTopLeftRadius: ms(7),
                borderBottomLeftRadius: ms(7),
              }}
            >
              <Image
                source={Images.minus}
                resizeMode="contain"
                style={{ height: ms(21), width: ms(25) }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                paddingVertical: ms(10),
                fontSize: ms(16),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                fontFamily: Fonts.Bold,
                color: COLORS.black,
                borderColor: COLORS.placeholderText,
              }}
            >
              1
            </Text>
            <Text
              style={{
                borderWidth: 1,
                flex: 1,
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                paddingVertical: ms(10),
                fontSize: ms(16),
                borderColor: COLORS.placeholderText,
                borderTopRightRadius: ms(7),
                borderBottomRightRadius: ms(7),
              }}
            >
              +
            </Text>
          </View>

          <Spacer space={ms(5)} />
          <Text
            style={{
              fontSize: ms(15),
              color: COLORS.black,
              fontFamily: Fonts.SemiBold,
              marginVertical: ms(10),
            }}
          >
            {'Stock on Hand'}
          </Text>
          <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />

          <Spacer space={ms(15)} />

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={Images.babyBoy}
              resizeMode="contain"
              style={{ height: ms(80), width: ms(80) }}
            />
            <View style={{ backgroundColor: COLORS.light_border, width: ms(2) }} />
            <View style={{ marginHorizontal: ms(10) }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ width: ms(165) }}>
                  <Text
                    style={{
                      fontSize: ms(11),
                      color: COLORS.black,
                      fontFamily: Fonts.SemiBold,
                    }}
                  >
                    {'Size: '}
                    <Text
                      style={{
                        fontSize: ms(10),
                        color: COLORS.black,
                        fontFamily: Fonts.Regular,
                      }}
                    >
                      {'USA'}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginRight: ms(10) }}>
                  <Text
                    style={{
                      fontSize: ms(11),
                      color: COLORS.black,
                      fontFamily: Fonts.SemiBold,
                    }}
                  >
                    {'Quantity: '}
                    <Text
                      style={{
                        fontSize: ms(10),
                        color: COLORS.black,
                        fontFamily: Fonts.Regular,
                      }}
                    >
                      {'USA'}
                    </Text>
                  </Text>
                </View>
              </View>
              <FlatList data={StockItems} renderItem={renderItem} />
            </View>
          </View>

          <Spacer space={ms(15)} />
          <View style={{ height: ms(1), backgroundColor: COLORS.light_border }} />
          <Spacer space={ms(10)} />
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                flex: 1,
                paddingHorizontal: ms(10),
                fontFamily: Fonts.Italic,
              }}
            >
              {'Reorder Point'}
            </Text>
            <Text>{'10'}</Text>
          </View>

          <Spacer space={ms(30)} />
          <Text>{'Available for Selling'}</Text>

          <Spacer space={ms(10)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              paddingHorizontal: ms(20),
              paddingVertical: ms(5),
              borderColor: COLORS.placeholderText,
              borderRadius: ms(5),
            }}
          >
            <Text style={{ flex: 1 }}>{'In store'}</Text>
            <Image
              source={Images.onToggle}
              resizeMode="contain"
              style={{ height: ms(20), width: ms(20) }}
            />
          </View>
          <Spacer space={ms(10)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              paddingHorizontal: ms(20),
              paddingVertical: ms(5),
              borderColor: COLORS.placeholderText,
              borderRadius: ms(5),
            }}
          >
            <Text style={{ flex: 1 }}>{'Online - delivery'}</Text>
            <Image
              source={Images.offToggle}
              resizeMode="contain"
              style={{ height: ms(20), width: ms(20) }}
            />
          </View>
          <Spacer space={ms(10)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              paddingHorizontal: ms(20),
              paddingVertical: ms(5),
              borderColor: COLORS.placeholderText,
              borderRadius: ms(5),
            }}
          >
            <Text style={{ flex: 1 }}>{'Online - Shipping'}</Text>
            <Image
              source={Images.offToggle}
              resizeMode="contain"
              style={{ height: ms(20), width: ms(20) }}
            />
          </View>
          <Spacer space={ms(10)} />
        </View>
      </ScrollView>
    </RBSheet>
  );
};

export default ProductDetails;
