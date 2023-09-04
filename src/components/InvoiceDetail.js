import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';
import {
  barcode,
  crossButton,
  deliveryHomeIcon,
  dropdown,
  Fonts,
  logo_full,
  minus,
  plus,
  scanner,
  scooter,
} from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';
import AddedCartItemsCard from './AddedCartItemsCard';
import mapCustomStyle from './MapCustomStyles';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_MAP } from '@/constants/ApiKey';

export function InvoiceDetail({
  setTrackingView,
  singleOrderDetail,
  latitude,
  longitude,
  sourceCoordinate,
  destinationCoordinate,
  openShippingOrders,
  renderOrderDetailProducts,
  location,
  mapRef,
  closeHandler,
}) {
  const dummyCart = [
    {
      id: 5228,
      cart_id: 1039,
      product_id: 3480,
      service_id: 4,
      supply_id: 34791,
      supply_price_id: 104371,
      supply_variant_id: null,
      custom_price: 0,
      offer_id: null,
      qty: 1,
      created_at: '2023-09-04T11:23:29.000Z',
      updated_at: '2023-09-04T11:23:29.000Z',
      deleted_at: null,
      product_details: {
        id: 3480,
        brand_id: 646,
        service_id: 4,
        category_id: 1,
        sub_category_id: 5,
        name: 'Champagne Nicolas Feuillatte Réserve Exclusive Brut - 750ml Bottle',
        weight: '750',
        weight_unit: 'mL',
        length: '10',
        breadth: '5',
        height: '10',
        image:
          'https://target.scene7.com/is/image/Target/GUEST_44f1731b-9ee8-4a8a-b086-135f6dcc4aaf?wid=2000&hei=2000&',
        description: null,
        allergens_and_warnings: null,
        price: 37.99,
        sku: null,
        barcode: null,
        is_adult: false,
        tcin: '50632014',
        upc: '088586003899',
        item_number: '213-00-2795',
        type: 'physical',
        specifications: [
          {
            title: 'Package Quantity',
            value: 1,
          },
          {
            title: 'Net weight',
            value: '750 mL',
          },
          {
            title: 'TCIN',
            value: 50632014,
          },
          {
            title: 'UPC',
            value: "088586003899'",
          },
          {
            title: 'Item Number (DPCI)',
            value: '213-00-2795',
          },
          {
            title: 'Origin',
            value: 'Made in the USA or Imported',
          },
        ],
        ingredients: null,
        created_by: 'admin',
        created_by_id: null,
        created_at: '2023-06-16T08:14:33.000Z',
        updated_at: '2023-07-13T13:24:25.000Z',
        deleted_at: null,
        brand: {
          name: 'Nicolas Feuillatte',
          id: 646,
        },
        product_images: [
          {
            url: 'https://target.scene7.com/is/image/Target/GUEST_44f1731b-9ee8-4a8a-b086-135f6dcc4aaf?wid=2000&hei=2000&',
          },
          {
            url: 'https://target.scene7.com/is/image/Target/GUEST_e14927b0-11e3-438b-aeb9-ac4b8979d4b8?wid=2000&hei=2000&',
          },
          {
            url: 'https://target.scene7.com/is/image/Target/GUEST_af7651cb-4c04-45b8-8a7b-d7dbc9ebe023?wid=2000&hei=2000&',
          },
          {
            url: 'https://target.scene7.com/is/image/Target/GUEST_78e70451-482d-4caf-8976-0d1d39d3ac2f?wid=2000&hei=2000&',
          },
          {
            url: 'https://target.scene7.com/is/image/Target/GUEST_089d56c1-0052-4590-9ad8-6b4744db8cbd?wid=2000&hei=2000&',
          },
        ],
        category: {
          name: 'Wine, Beer & Liquor',
          id: 1,
        },
        sub_category: {
          name: 'Wine',
        },
        product_ingredient: [],
        health_rating: 0,
        bar_code: null,
        pos_staff: [],
        is_product_added_to_cart: false,
        supply: {
          id: 34791,
          seller_id: 'b169ed4d-be27-44eb-9a08-74f997bc6a2f',
          rest_quantity: 100,
          delivery_options: '3,1,4,2',
          approx_service_time: null,
          sold_quantity: 0,
          supply_prices: {
            id: 104371,
            app_name: 'pos',
            price_type: 'fixed',
            selling_price: 37.99,
            min_qty: 0,
            max_qty: 0,
            margin_percentage: 5,
            actual_price: 37.99,
          },
          supply_variants: false,
          seller_details: {
            id: 2,
            parent_id: null,
            email: 'man@yopmail.com',
            pos_security_pin: null,
            unique_uuid: 'b169ed4d-be27-44eb-9a08-74f997bc6a2f',
            is_active: true,
            is_wallet: true,
            is_google_auth_enable: false,
            created_at: '2023-06-02T14:37:50.000Z',
            updated_at: '2023-06-30T12:26:40.000Z',
            deleted_at: null,
            user_profiles: {
              id: 2,
              user_id: 2,
              username: 'Pathan',
              is_biometric: null,
              banner_image:
                'https://t3.ftcdn.net/jpg/03/35/51/06/360_F_335510693_HY7mLg3ARdLccKoXk3m66NLDpJRJh51p.jpg',
              service_type: '1,2,3',
              service_ids: '4,5,6',
              opening_time: '10 AM',
              closing_time: '11 PM',
              firstname: 'Galib',
              middlename: null,
              lastname: 'Pathan',
              organization_name: 'Pathan General Store',
              business_website: 'https://www.retail.com/',
              is_email_verified: true,
              is_business_registered: true,
              manufacturer_images: [
                'https://thumbs.dreamstime.com/z/jakarta-indonesia-december-view-samsonite-front-store-luggage-manufacturer-retailer-products-ranging-large-181705690.jpg',
                'https://www.shutterstock.com/image-photo/customers-shopping-modern-clothing-store-260nw-2053746077.jpg',
              ],
              videos: ['https://youtu.be/kVg2ujqHOt0', 'https://youtu.be/Jxe8Tgnz2SA'],
              certification: [
                'https://www.retaildogma.com/wp-content/uploads/2023/01/Certificate-opr-1024x793.png',
                'https://www.certifiedretailprofessional.com/wp-content/uploads/logo-coloured.png',
              ],
              business_details:
                'Retail is the sale of goods and services to consumers, in contrast to wholesaling, which is sale to business or institutional customers. A retailer purchases goods in large quantities from manufacturers, directly or through a wholesaler, and then sells in smaller quantities to consumers for a profit.',
              business_inspection_report: [
                'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                'https://i.pinimg.com/originals/7d/43/64/7d4364ae1d7d32070fc9811562736828.jpg',
              ],
              overview: [
                {
                  country: 'India',
                  patents: 'ahsdfausgh',
                  main_markets: 'hhdjh',
                  main_products: 'clothes',
                  year_established: '2-01-1845',
                  total_annual_revenue: '47$',
                  product_certifications:
                    'https://ik.imagekit.io/upgrad1/marketing-platform-assets/new-images%2Fprogram-certificates-v2/pm_cert__1635421888096.jpg',
                },
              ],
              dob: '2002-07-03',
              security_pin: '1234',
              profile_photo:
                'https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-on-transparent-vector-id1313958250?k=20&m=1313958250&s=612x612&w=0&h=vCvfwHB-pUpqWoB7wT2ifkKEL1qa5lhxxUPLIsgER00=',
              phone_code: '+1',
              phone_no: '7038712986',
              full_phone_number: '+17038712986',
              is_phone_verified: true,
              seller_type: null,
              ssn_number: '540613999',
              email_otp: null,
              is_ssn_number_verified: false,
              age: null,
              identity_type: null,
              identity_urls: null,
              is_age_verified: false,
              reffer_code: null,
              gender: null,
              current_address: {
                city: 'New York County',
                state: 'NY',
                country: 'US',
                zipcode: '10013',
                latitude: 40.7243799,
                longitude: -74.01072719999999,
                address_type: 'home',
                street_address: '456 Washington Street',
              },
              zipcode: null,
              vehical_make: null,
              vehical_year: null,
              vehical_model: null,
              vehical_mileage: null,
              vehical_vin: null,
              registration_expiry_date: null,
              registration_expiry_photo: null,
              insurance_expiry_date: null,
              insurance_expiry_photo: null,
              driving_licence_no: null,
              driving_license_front_photo: null,
              driving_license_back_photo: null,
              driver_steps: 1,
              wallet_steps: 1,
              merchant_steps: 6,
              about_us: 'we are given to best services in our city',
              guideline_flag: null,
              termcnd_flag: null,
              ride_points: 0,
              reward_point: 0,
              reward_status_id: null,
              is_online: false,
              estimated_preparation_time: 600,
              two_fa_secret: null,
              is_two_fa_enabled: false,
              business_logo: null,
              socket_id: null,
              privacy_policy_status: false,
              terms_and_conditons_status: false,
              created_at: '2023-06-02T14:37:50.000Z',
              updated_at: '2023-08-19T13:02:52.000Z',
              deleted_at: null,
            },
            user_locations: [
              {
                id: 1,
                user_id: 2,
                phone_no: null,
                custom_address: 'jalandhar',
                address_type: 'jalandhar',
                formatted_address: null,
                address_line_1: '305 Broadway',
                address_line_2: null,
                city: 'New York County',
                postal_code: '160014',
                district: null,
                is_current: true,
                state: 'New York',
                state_code: null,
                country_code: null,
                country: 'United States',
                longitude: -73.7698,
                latitude: 41.04655,
                place_id: 'ChIJWbH6F0Sx5zsRcR2n7NeOH1I',
                created_at: '2023-06-02T14:37:51.000Z',
                updated_at: '2023-06-15T09:55:21.000Z',
                deleted_at: null,
              },
              {
                id: 435,
                user_id: 2,
                phone_no: null,
                custom_address: '456 Washington Street',
                address_type: 'home',
                formatted_address: null,
                address_line_1: null,
                address_line_2: null,
                city: 'New York County',
                postal_code: null,
                district: null,
                is_current: false,
                state: 'NY',
                state_code: null,
                country_code: null,
                country: 'US',
                longitude: -74.01072719999999,
                latitude: 40.7243799,
                place_id: null,
                created_at: '2023-06-30T12:26:40.000Z',
                updated_at: '2023-06-30T12:26:40.000Z',
                deleted_at: null,
              },
            ],
            user_settings: {
              id: 52,
              user_id: 2,
              notification_status: true,
              email_notification_status: true,
              push_notification_status: true,
              chat_notification_status: true,
              promotion_notification_status: true,
              order_notification_status: true,
              shipping_notification_status: true,
              service_notification_status: false,
              wallet_notification_status: true,
              account_notification_status: true,
              feeds_notification_status: true,
              rqf_notification_status: true,
              delivery_update_status: true,
              support_update_status: true,
              english_status: true,
              receive_marketing_status: true,
              order_accepted_status: true,
              order_shipped_status: true,
              order_transit_status: true,
              order_picked_up_status: true,
              order_out_for_delivery_status: true,
              order_delivered_status: true,
              order_canceled_status: true,
              order_ready_for_pickup_status: true,
              order_refund_status: true,
              privacy_policy: null,
              terms_and_conditons: null,
              discount_coupon_policy: null,
              return_policy: null,
              shipping_policy: null,
              created_at: '2023-06-16T12:41:40.000Z',
              updated_at: '2023-07-17T12:08:10.000Z',
              deleted_at: null,
            },
            user_images: [
              {
                id: 1,
                user_id: 2,
                image:
                  'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80',
                created_at: '2023-06-02T14:37:51.000Z',
                updated_at: '2023-06-02T14:37:51.000Z',
                deleted_at: null,
              },
            ],
            rating: {
              rating: 3.4,
              review_count: 21,
            },
          },
          attributes: [],
        },
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.firstRowStyle]}>
        <View style={styles.invoiceDetailSection}>
          <View style={[{ height: '100%', alignItems: 'center' }]}>
            <Text style={styles._kSubCenterContainer}>{'Primark'}</Text>
            {/* <Text
              style={styles._kAddress}
            >{`${merchantDetails?.user_profiles?.current_address?.street_address}, ${merchantDetails?.user_profiles?.current_address?.city}, ${merchantDetails?.user_profiles?.current_address?.state}, ${merchantDetails?.user_profiles?.current_address?.country}, ${merchantDetails?.user_profiles?.current_address?.zipcode}`}</Text>
            <Text style={styles._kNumber}>{merchantDetails?.user_profiles?.full_phone_number}</Text> */}
            <Text style={styles._kAddress}>{'63 Ivy Road, Hawkville, GA, USA 31036'}</Text>
            <Text style={styles._kAddress}>{'+123-456-7890'}</Text>

            <View style={styles._flatListContainer}>
              <FlatList
                data={dummyCart}
                style={{ width: '100%' }}
                renderItem={({ item, index }) => <AddedCartItemsCard item={item} index={index} />}
              />
            </View>
            <Spacer space={SH(10)} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Sub-Total</Text>
              <Text style={styles._subTotalPrice}>${'0.00'}</Text>
            </View>

            <View style={styles._horizontalLine} />
            {/* <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Shipping Charge</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View> */}
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Discount</Text>
              <Text style={styles._subTotalPrice}>${'0.00'}</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Tips</Text>
              <Text style={styles._subTotalPrice}>${'123'}</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Total Taxes</Text>
              <Text style={styles._subTotalPrice}>${'0.00'}</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text
                style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
              >
                Total
              </Text>
              <Text
                style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
              >
                $7001.20
              </Text>
            </View>
            {/* <View style={styles._horizontalLine} /> */}
            <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

            <View style={styles._paymentTitleContainer}>
              <Text style={styles._payTitle}>Payment option: </Text>
              <Text style={styles._paySubTitle}>{'Cash'}</Text>
            </View>
            <Text style={styles._commonPayTitle}>{'Wed 26 Apr , 2023 6:27 AM'}</Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
            <Text style={styles._commonPayTitle}>POS No. #Front-CC01</Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>

            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={barcode} style={styles._barCodeImage} />
            {/* <Text style={styles._barCode}>ABC-abc-1234</Text> */}
            <Image source={logo_full} style={styles.logoFull} />
          </View>
        </View>
        <View style={styles.mapMainView}>
          <MapView
            customMapStyle={mapCustomStyle}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showCompass
            region={{
              latitude: latitude ?? 0.0,
              longitude: longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: latitude ?? 0.0,
              longitude: longitude ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
            style={styles.detailMap}
          >
            <MapViewDirections
              key={location?.latitude ?? 0.0}
              origin={{
                latitude: latitude ?? 0.0,
                longitude: longitude ?? 0.0,
              }}
              destination={{
                latitude: singleOrderDetail?.coordinates?.[0] ?? 0.0,
                longitude: singleOrderDetail?.coordinates?.[1] ?? 0.0,
              }}
              apikey={GOOGLE_MAP.API_KEYS}
              strokeWidth={6}
              strokeColor={COLORS.primary}
            />
            <Marker coordinate={sourceCoordinate}>
              <View>
                <Image source={scooter} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
            <Marker coordinate={destinationCoordinate}>
              <View>
                <Image source={deliveryHomeIcon} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
          </MapView>

          <TouchableOpacity
            onPress={closeHandler}
            style={[
              styles.expandButtonStyle,
              {
                borderColor: COLORS.dark_grey,
                borderWidth: 1,
                backgroundColor: COLORS.white,
              },
            ]}
          >
            <Image source={crossButton} style={styles.rightIconStyle} />
            <Text
              style={[styles.acceptTextStyle, { color: COLORS.dark_grey, paddingHorizontal: 12 }]}
            >
              {strings.deliveryOrders2.close}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstRowStyle: {
    flexDirection: 'row',
    paddingVertical: ms(10),
    paddingHorizontal: ms(10),
    justifyContent: 'space-between',
  },
  invoiceDetailSection: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: Platform.OS === 'ios' ? windowWidth * 0.25 : windowWidth * 0.27,
    height: windowHeight * 0.92,
  },
  _kSubCenterContainer: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginTop: ms(5),
  },
  _kAddress: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    marginTop: ms(5),
    paddingHorizontal: ms(5),
  },
  _flatListContainer: { height: ms(100), width: '100%', marginTop: ms(5) },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(5),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(7),
  },
  _horizontalLine: {
    height: ms(1),
    width: '90%',
    marginTop: ms(4),
    backgroundColor: COLORS.textInputBackground,
  },
  _paymentTitleContainer: {
    marginTop: ms(5),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(15),
    marginTop: ms(3),
    fontSize: ms(7),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(10),
  },
  _barCodeImage: { height: ms(25), width: '70%', marginTop: ms(5) },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    marginTop: ms(2),
  },
  mapMainView: {
    flex: 1,
    marginLeft: ms(10),
    // width: Dimensions.get('window').width / 2.2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: windowHeight * 0.92,
  },
  detailMap: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  mapMarkerStyle: { height: ms(30), width: ms(30), resizeMode: 'contain' },
  expandButtonStyle: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end',
    top: 20,
    right: 20,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
});
