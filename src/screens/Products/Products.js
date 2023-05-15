import React, { useState } from 'react';
import { ScreenWrapper, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import {
  Fonts,
  Phone_light,
  addDiscountPic,
  cashProfile,
  checkArrow,
  clay,
  clock,
  cloth,
  clothes,
  crossBg,
  email,
  eraser,
  homeMenu,
  keyboard,
  location,
  lockLight,
  ok,
  pause,
  scn,
  search_light,
  terryProfile,
} from '@/assets';
import {
  STARTSELLING,
  SubcategoryData,
  categoryProRowData,
  categoryRowData,
  homeTableData,
  productsData,
} from '@/constants/flatListData';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { width } from '@/theme/ScalerDimensions';
import { Modal } from 'react-native';
import { Colors } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;

export function Products({ navigation }) {
  const categoryListItem = ({ item }) => (
    <View style={styles.categoryArrayCon}>
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </View>
  );
  const categoryProListItem = ({ item, index }) => (
    <View
      style={{
        borderRadius: 100 / 2,
        backgroundColor: 'white',
      }}
    >
      <TouchableOpacity onPress={() => {}} style={[styles.tabCont]}>
        {index === 0 ? (
          <Image
            source={homeMenu}
            style={{ width: SH(50), height: SH(50), marginTop: SH(6) }}
          />
        ) : null}
        <Image
          source={item.image}
          resizeMode="cover"
          style={[styles.tabimg, { borderRadius: 20 }]}
        />
        <Text
          style={[
            styles.subName,
            {
              fontSize: SF(12),
              //  color: item.id === selectedId ? COLORS.primary : COLORS.black,
              paddingHorizontal: 10,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const productsItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: SH(10),
          backgroundColor: COLORS.white,
          margin: SH(10),
          alignItems: 'center',
          borderColor: '#D8D8D8',
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={clay} style={{ height: SH(50), width: SH(50) }} />
          <View style={{ flexDirection: 'column', marginLeft: SH(10) }}>
            <Text
              style={{
                fontSize: SH(16),
                fontFamily: Fonts.SemiBold,
                color: COLORS.solid_grey,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: SH(14),
                fontFamily: Fonts.Regular,
                color: COLORS.solid_grey,
              }}
            >
              {item.stocks}
            </Text>
            <Text
              style={{
                fontSize: SH(14),
                fontFamily: Fonts.Italic,
                color: COLORS.solid_grey,
              }}
            >
              {item.type}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: SH(20),
            fontFamily: Fonts.SemiBold,
            color: COLORS.solid_grey,
          }}
        >
          {item.price}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.homeScreenCon, styles.backgroundColorSCreen]}>
      <View style={styles.searchScreenHeader}>
        <View style={styles.displayflex}>
          <Text style={styles.cashLabelBold}>Wed 26 Apr , 2023</Text>
          <Text style={styles.cashLabelBold}>Walk-In</Text>
          <Text style={styles.cashLabelBold}>Invoice No. # 3467589</Text>
          <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={crossBg} style={styles.crossBg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.displayflex2}>
        <View style={styles.itemLIistCon}>
          <View style={styles.inputWraper2}>
            <View style={styles.displayRow}>
              <View>
                <Image source={search_light} style={styles.searchStyle} />
              </View>
              <TextInput
                placeholder={strings.retail.searchProduct}
                style={styles.searchInput}
                // value={search}
                // onChangeText={search => (
                //   setSearch(search), onChangeFun(search)
                // )}
              />
            </View>
            <TouchableOpacity>
              <Image source={scn} style={styles.scnStyle} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(10)} />

          <View>
            <FlatList
              data={categoryRowData}
              extraData={categoryRowData}
              renderItem={categoryListItem}
              keyExtractor={item => item.id}
              horizontal
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
              }}
            />
          </View>
          <Spacer space={SH(10)} />
          <View
            style={{ borderWidth: 1, borderColor: COLORS.solidGrey }}
          ></View>

          <Spacer space={SH(10)} />

          <View>
            <FlatList
              data={categoryProRowData}
              extraData={categoryProRowData}
              renderItem={categoryProListItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <Spacer space={SH(10)} />
            <View style={{ backgroundColor: 'green' }}></View>

            <FlatList
              data={productsData}
              extraData={productsData}
              renderItem={productsItem}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
              scrollEnabled={true}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={[styles.itemLIistCon, styles.rightSideCon]}>
          <View style={styles.displayflex}>
            <Image source={keyboard} style={styles.keyboard} />
            <View style={styles.holdCartCon}>
              <Image source={pause} style={styles.pause} />
              <Text style={styles.holdCart}>{strings.dashboard.holdCart}</Text>
            </View>
            <View style={[styles.holdCartCon, styles.dark_greyBg]}>
              <Image source={eraser} style={styles.pause} />
              <Text style={styles.holdCart}>{strings.dashboard.clearcart}</Text>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.nameAddCon}>
            <View style={styles.sideBarInputWraper}>
              <View style={styles.displayRow}>
                <View>
                  <Image source={search_light} style={styles.sideSearchStyle} />
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
                <Text style={styles.terryText}>
                  4849 Owagner Lane Seattle, WA 98101
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.okButtonCon}>
              <Image source={ok} style={styles.lockLight} />
              <Text style={[styles.okText]}>{strings.dashboard.ok}</Text>
            </TouchableOpacity>
          </View>
          <Spacer space={SH(10)} />

          <View style={styles.displayflex}>
            <View style={styles.addDiscountCon}>
              <Image source={addDiscountPic} style={styles.addDiscountPic} />
              <Text style={styles.addDiscountText}>Add Discount</Text>
            </View>
            <View style={styles.addDiscountCon}>
              <Image source={addDiscountPic} style={styles.addDiscountPic} />
              <Text style={styles.addDiscountText}>Add Notes</Text>
            </View>
          </View>
        </View>
      </View>
      <Modal visible={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: SH(200),
            // alignItems: 'center',
            backgroundColor: '#E7E7E7',
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: SH(10),
              // alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={crossBg} style={styles.crossBg} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: '#F5F6F7',
                    width: SH(140),
                    height: SH(48),
                    padding: SH(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SH(16),
                      fontFamily: Fonts.SemiBold,
                    }}
                  >
                    Back To Cart
                  </Text>
                </View>

                <View
                  style={{
                    width: SH(140),
                    height: SH(48),
                    padding: SH(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    marginLeft: SH(10),
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: SH(16),
                      fontFamily: Fonts.SemiBold,
                    }}
                  >
                    Continue
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    width: SH(140),
                    height: SH(48),
                    padding: SH(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: SH(10),
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: SH(16),
                      fontFamily: Fonts.SemiBold,
                    }}
                  >
                    Add to Cart
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: SH(2),
                width: '100%',
                backgroundColor: '#D8D8D8',
                marginVertical: SH(10),
              }}
            />
            <View style={{ marginTop: SH(10) }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SH(28),
                  fontFamily: Fonts.Bold,
                }}
              >
                Columbia Men's Rain Jacket{' '}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SH(20),
                  fontFamily: Fonts.Medium,
                }}
              >
                Color:Grey
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SH(20),
                  fontFamily: Fonts.Medium,
                }}
              >
                Size:X
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  marginVertical: SH(20),
                }}
              >
                <View
                  style={{
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    width: SH(200),
                    height: SH(80),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: SH(36), fontFamily: Fonts.Bold }}>
                    -
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    width: SH(200),
                    height: SH(80),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: SH(36), fontFamily: Fonts.Bold }}>
                    1
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    width: SH(200),
                    height: SH(80),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: SH(36), fontFamily: Fonts.Bold }}>
                    +
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    height: SH(2),
                    width: SH(290),
                    backgroundColor: '#D8D8D8',
                  }}
                />
                <Text
                  style={{
                    marginHorizontal: SH(10),
                    fontSize: SH(20),
                    fontFamily: Fonts.Regular,
                    color: COLORS.gerySkies,
                  }}
                >
                  COLORS
                </Text>
                <View
                  style={{
                    height: SH(2),
                    width: SH(290),
                    backgroundColor: '#D8D8D8',
                  }}
                />
              </View>

              <FlatList
                data={[1, 2, 3, 4, 5]}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: SH(154),
                        height: SH(80),
                        borderRadius: SH(10),
                        borderColor: '#E1E3E4',
                        borderWidth: 1,
                        margin: SH(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: SH(10),
                          fontSize: SH(20),
                          fontFamily: Fonts.Regular,
                          color: COLORS.gerySkies,
                        }}
                      >
                        Green
                      </Text>
                    </View>
                  );
                }}
                numColumns={4}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    height: SH(2),
                    width: SH(290),
                    backgroundColor: '#D8D8D8',
                  }}
                />
                <Text
                  style={{
                    marginHorizontal: SH(10),
                    fontSize: SH(20),
                    fontFamily: Fonts.Regular,
                    color: COLORS.gerySkies,
                  }}
                >
                  SIZE
                </Text>
                <View
                  style={{
                    height: SH(2),
                    width: SH(290),
                    backgroundColor: '#D8D8D8',
                  }}
                />
              </View>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: SH(154),
                        height: SH(80),
                        borderRadius: SH(10),
                        borderColor: '#E1E3E4',
                        borderWidth: 1,
                        margin: SH(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: SH(10),
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: SH(10),
                          fontSize: SH(20),
                          fontFamily: Fonts.Regular,
                          color: COLORS.gerySkies,
                        }}
                      >
                        Green
                      </Text>
                    </View>
                  );
                }}
                numColumns={4}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
