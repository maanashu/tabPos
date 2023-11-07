import { StyleSheet, Dimensions } from 'react-native';
import { SW, SH, SF } from '@/theme';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { verticalScale, moderateScale, ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  displayFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calenderContainer: {
    // width: windowWidth * 0.94,
    flex: 1,
  },
  headerMainView: {
    width: windowWidth,
    // paddingHorizontal: SW(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingTop: SH(13),
    flexDirection: 'row',
  },
  textInputStyle: {
    height: SH(40),
    width: '100%',
    fontFamily: Fonts.Italic,
    fontSize: SF(12),
    paddingLeft: 5,
    margin: 0,
    padding: 0,
  },
  truckStyle: {
    width: SH(28),
    height: SH(28),
    resizeMode: 'contain',
  },
  deliveryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.solid_grey,
    fontSize: SF(18),
    paddingLeft: SW(4),
  },
  searchView: {
    borderWidth: 1,
    height: SH(40),
    borderRadius: 30,
    borderColor: COLORS.row_grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchImage: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  calenderCon: {
    flex: 1,
    // backgroundColor: COLORS.textInputBackground,
  },
  notificationCon: {
    width: windowWidth * 0.34,
    height: '90%',
    position: 'absolute',
    top: ms(40),
    right: 110,
    borderRadius: ms(5),
    backgroundColor: COLORS.textInputBackground,
  },
  approveButtonCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    height: SH(32),
    width: SH(110),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonCon: {
    backgroundColor: COLORS.dark_grey,
    borderRadius: 3,
    height: SH(32),
    justifyContent: 'center',
    alignItems: 'center',
    width: SH(110),
    marginLeft: moderateScale(10),
  },

  approveText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  requestFor: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(15),
    width: windowWidth * 0.25,
    overflow: 'hidden',
  },
  timeLabel: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(15),
    paddingHorizontal: moderateScale(5),
  },
  notificationchildCon: {
    borderBottomWidth: 1,
    borderColor: '#F3F3F3',
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(8),
  },
  roundCalender: {
    width: SH(22),
    height: SH(22),
    resizeMode: 'contain',
    tintColor: COLORS.bluish_green,
  },
  watch: {
    width: SH(18),
    height: SH(18),
    resizeMode: 'contain',
    tintColor: COLORS.bluish_green,
  },
  modalMainView: {
    backgroundColor: COLORS.white,
    width: SW(180),
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerView: {
    backgroundColor: COLORS.primary,
    width: SW(180),
    height: SH(60),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  trackingButtonText: {
    fontFamily: Fonts.Medium,
    color: COLORS.white,
    fontSize: SF(12),
  },
  charlene: {
    width: SH(100),
    height: SH(100),
    resizeMode: 'contain',
    borderRadius: 100,
  },
  address: {
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(5),
  },
  charleneName: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(20),
  },
  location: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  appointment: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  service: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
    fontSize: SF(16),
  },
  serviceType: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
    marginRight: moderateScale(10),
  },
  upcomingCon: {
    borderRadius: 3,
    backgroundColor: COLORS.bluish_green,
    height: SH(35),
    width: SH(116),
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(16),
  },
  calenderHeader: {
    height: SH(60),
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    paddingLeft: moderateScale(5),
  },
  unChecked: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(12),
    // paddingHorizontal:moderateScale(18)
  },
  clickedButtonCon: {
    backgroundColor: COLORS.primary,
    height: SH(32),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: moderateScale(10),
    paddingHorizontal: ms(10),
  },
  unClickedButtonCon: {
    backgroundColor: COLORS.white,
    height: SH(32),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: moderateScale(10),
    paddingHorizontal: ms(10),
  },
  checkedText: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    fontSize: SF(12),
  },
  unCheckedText: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(12),
  },
  schdule: {
    height: SH(670),
    width: windowWidth * 0.68,
    resizeMode: 'contain',
  },
  monthlySchduel: {
    height: SH(36),
    // width: SH(240),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 3,
    paddingHorizontal: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftLight: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
  },
  monthlySchduleDate: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
    fontSize: SF(14),
    paddingHorizontal: moderateScale(5),
  },
  headerBody: {
    width: SW(170),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  startEndDate: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
    marginTop: ms(3),
  },
  eventContainer: {
    backgroundColor: 'white',
    elevation: 0,
    borderLeftColor: COLORS.dark_grey,
    borderLeftWidth: ms(1),
    borderStyle: 'solid',
    borderRadius: ms(1),
    paddingLeft: ms(5),
    justifyContent: 'center',
  },
  eventTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
  },
  iImageCon: {
    backgroundColor: COLORS.dark_grey,
    borderRadius: 100,
    height: SW(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: SW(8),
  },
  iImage: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  serviceTextCon: {
    flexDirection: 'row',
    width: windowWidth * 0.45,
  },
  requestTextName: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    width: windowWidth * 0.5,
  },
  lockLight: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    paddingLeft: moderateScale(5),
  },
  requestNotFound: {
    fontFamily: Fonts.Regular,
    color: COLORS.primary,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: SF(20),
  },
  arrowButtonStl: {
    backgroundColor: COLORS.white,
    borderRadius: ms(2),
    paddingHorizontal: ms(3),
    paddingVertical: ms(2),
  },
  rightTabContainer: {
    backgroundColor: COLORS.white,
    flex: 0.9,
    margin: ms(7),
    marginLeft: ms(10),
    marginTop: ms(10),
    height: '97.8%',
    alignItems: 'center',
  },
  RequestEventBadgeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    color: COLORS.white,
  },
  requestEventBadgeContainer: {
    height: ms(10),
    width: ms(10),
    borderRadius: ms(5),
    backgroundColor: COLORS.yellowTweet,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  requestCalendarIcon: { height: ms(20), width: ms(20), resizeMode: 'contain' },
  requestCalendarContainer: {
    height: ms(35),
    width: '80%',
    marginTop: ms(5),
    borderRadius: ms(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTextEmployee: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(4),
    color: COLORS.black,
  },
  circularBadgeEmployee: {
    position: 'absolute',
    right: ms(-3),
    bottom: ms(-3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'teal',
    height: ms(10),
    width: ms(10),
    borderRadius: ms(5),
  },
  employeeImages: {
    height: ms(18),
    width: ms(18),
    borderRadius: ms(9),
    borderWidth: ms(1),
    borderColor: COLORS.yellowTweet,
    resizeMode: 'cover',
  },
  renderItemContainer: {
    height: ms(28),
    width: ms(28),
    borderRadius: ms(2),
    alignItems: 'center',
    justifyContent: 'center',
    margin: ms(2),
  },
  asigneesBadgeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
    color: COLORS.dark_grey,
    alignItems: 'center',
  },
  circularBadgeContainer: {
    height: ms(10),
    width: ms(10),
    borderRadius: ms(5),
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.dark_grey,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ms(5),
    bottom: ms(5),
  },
  asignessCalendarImage: {
    height: ms(14),
    width: ms(14),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  alignmentCalendarContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: ms(10),
    borderRadius: ms(3),
    height: ms(35),
    width: ms(35),
  },
  calendarIconSettings: {
    height: ms(20),
    width: ms(20),
    resizeMode: 'contain',
  },
  CalendarSettingsContainer: {
    position: 'absolute',
    height: ms(40),
    width: '95%',
    alignSelf: 'center',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  _calendarContainer: {
    // flex: 1,
    marginHorizontal: ms(10),
    overflow: 'hidden',
    zIndex: -99,
    backgroundColor: 'white',
  },
  _eventTitle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(7),
    color: COLORS.dark_grey,
  },
  lineStl: {
    height: ms(8),
    width: 1,
    backgroundColor: COLORS.gerySkies,
    marginHorizontal: ms(10),
  },
  eventItemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: ms(5),
    marginHorizontal: ms(8),
    marginTop: ms(5),
  },
  approveText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.white,
  },
  acceptbtnContainer: {
    height: ms(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: ms(3),
    marginLeft: ms(8),
  },
  declineText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.dark_grey,
  },
  declineBtnContainer: {
    height: ms(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    borderRadius: ms(3),
  },
  _btnContainer: {
    flexDirection: 'row',
    marginHorizontal: ms(10),
    marginVertical: ms(10),
  },
  paidText: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    alignSelf: 'center',
  },
  paidContainer: {
    backgroundColor: COLORS.primary,
    padding: ms(3),
    marginHorizontal: ms(10),
    width: ms(35),
    borderRadius: ms(3),
    marginTop: ms(3),
    justifyContent: 'center',
    alignContent: 'center',
  },
  totalTile: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(9),
    color: COLORS.black,
  },
  serviceChargeSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: ms(5),
  },
  duractiontxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginLeft: ms(4),
    color: COLORS.black,
  },
  duractionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(10),
  },
  eventDate: {
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    color: COLORS.solid_grey,
  },
  eventDay: {
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    color: COLORS.solid_grey,
    marginLeft: ms(8),
  },
  evenclockIcon: { height: ms(10), width: ms(10), resizeMode: 'contain' },
  serviceTimeContainer: {
    borderWidth: 1,
    padding: ms(3),
    borderRadius: ms(3),
    borderColor: COLORS.textInputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(5),
  },
  subContainer1: {
    marginHorizontal: ms(10),
    marginTop: ms(10),
    marginBottom: 20,
  },
  hairCutTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(9),
    color: COLORS.black,
  },
  eventAddress: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
    color: COLORS.solid_grey,
    marginTop: ms(2),
  },
  eventAddressIcon: {
    height: ms(10),
    width: ms(8),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  customerName: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    color: COLORS.black,
  },
  customerUserProfile: {
    height: ms(20),
    width: ms(20),
    resizeMode: 'cover',
    borderRadius: ms(10),
  },
  customerDetailContainer: {
    backgroundColor: COLORS.textInputBackground,
    margin: ms(10),
    borderRadius: ms(5),
    paddingVertical: ms(10),
    paddingHorizontal: ms(8),
  },
  _requestTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
    color: COLORS.dark_grey,
    marginLeft: ms(8),
    marginVertical: ms(8),
  },
  subtotalContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ms(5),
  },
  invoiceTxt: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    marginVertical: ms(5),
  },
  amountSliptContainer: {
    marginTop: ms(15),
    marginHorizontal: ms(15),
    padding: ms(5),
    borderRadius: ms(5),
    backgroundColor: COLORS.textInputBackground,
  },
  assignedContainer: {
    backgroundColor: COLORS.white,
    margin: ms(10),
    marginTop: ms(2),
    borderRadius: ms(5),
    paddingHorizontal: ms(8),
    marginBottom: ms(20),
  },
  chatIconStl: { height: ms(15), width: ms(15), resizeMode: 'contain' },
  eventDetailModalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: ms(5),
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  crossStl: { height: ms(18), width: ms(18), tintColor: COLORS.black, alignSelf: 'center' },
  crossEventDetailModal: { position: 'absolute', right: ms(8), top: ms(6) },
  profilePicContainer: {
    height: ms(12),
    width: ms(12),
    borderRadius: ms(6),
    borderWidth: ms(1),
    borderColor: `#A179F2`,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  eventProfilePic: { height: ms(12), width: ms(12), resizeMode: 'cover' },
  headerEmployeeDesignation: {
    fontFamily: Fonts.Regular,
    fontSize: ms(5),
    color: COLORS.black,
  },
  headerEmployeeName: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
    color: COLORS.black,
  },
  headerEmployeeImage: {
    height: ms(14),
    width: ms(14),
    borderRadius: ms(7),
    borderWidth: 1,
    borderColor: 'teal',
  },
  headerEmployeeCard: {
    padding: ms(5),
    marginHorizontal: ms(1),
    alignItems: 'center',
    flexDirection: 'row',
    width: '14.1%',
    justifyContent: 'center',
  },
  headerScrollContainer: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    paddingLeft: ms(25),
  },
  editOptionIcon: {
    height: ms(14),
    width: ms(14),
    resizeMode: 'contain',
    marginRight: ms(2),
    tintColor: COLORS.darkGray,
  },
  cancelOptionIcon: { height: ms(12), width: ms(12), resizeMode: 'contain', marginRight: ms(7) },
  EventDetailoptionsContainer: {
    width: ms(40),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  //New Reschedule Modal
  addCartCon: {
    backgroundColor: 'white',
    borderRadius: ms(10),
    width: windowWidth * 0.5,
    paddingBottom: ms(15),
    paddingTop: ms(5),
    alignSelf: 'center',
  },
  addCartConHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SH(70),
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: COLORS.solidGrey,
  },
  crossBg: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
  },
  continueBtnCon: {
    height: SH(44),
    padding: SH(10),
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderRadius: 3,
    borderColor: COLORS.red,
    borderWidth: 1,
  },
  addToCartCon: {
    backgroundColor: COLORS.primary,
    width: 'auto',
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  detailBtnCon: {
    color: COLORS.red,
    fontSize: ms(8),
    fontFamily: Fonts.Regular,
    fontWeight: '600',
  },
  addTocartText: {
    color: COLORS.white,
    fontSize: ms(8),
    fontFamily: Fonts.Regular,
    fontWeight: '600',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorRow: {
    height: SH(2),
    width: windowWidth * 0.17,
    backgroundColor: '#D8D8D8',
  },
  serviceRow: {
    flex: 1,
  },
  colorText: {
    marginHorizontal: SH(10),
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  selected: {
    fontSize: ms(8),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  calendarIcon: {
    height: ms(15),
    width: ms(15),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  messageSend: {
    height: ms(25),
    width: ms(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  attachIcon: {
    height: ms(18),
    width: ms(18),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: ms(5),
  },
  messagesContainerStyle: {
    paddingBottom: ms(10),
  },
  checkinContainer: {
    flex: 1,
    borderRadius: ms(3),
    padding: ms(15),
    width: 'auto',
    backgroundColor: COLORS.primary,
    paddingVertical: ms(10),
  },
  checkintitle: { color: COLORS.white, fontFamily: Fonts.SemiBold },
  editTextBtn: { fontFamily: Fonts.SemiBold, fontSize: ms(8), color: COLORS.darkGray },
  btmEditBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: ms(3),
    padding: ms(15),
    paddingVertical: ms(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(14),
    marginTop: ms(10),
  },
  cellRoot: {
    backgroundColor: COLORS.textInputBackground,
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    marginHorizontal: moderateScale(6),
  },
  cellText: {
    fontFamily: Fonts.Medium,
    fontSize: ms(15),
    color: COLORS.black,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  confirmCheckinOtpBtn: {
    marginTop: ms(10),
    width: 'auto',
    backgroundColor: COLORS.primary,
    padding: ms(10),
    paddingHorizontal: ms(40),
  },
  verifyOtpContainer: {
    borderWidth: 1,
    borderRadius: ms(5),
    backgroundColor: COLORS.inputBorder,
    width: '35%',
    paddingVertical: ms(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LheaderText: {
    flex: 0.2,
    fontSize: ms(9),
    fontFamily: Fonts.SemiBold,
    marginVertical: ms(5),
    textAlign: 'center',
  },
  LlistViewHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: ms(5),
    flex: 1,
  },
  listViewSubContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.2,
    marginLeft: ms(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviderList: { height: 1, width: '100%', backgroundColor: COLORS.solidGrey },
  listViewEditIcon: { height: ms(12), width: ms(12), resizeMode: 'contain' },
  listViewEditBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    marginLeft: ms(5),
    padding: ms(5),
    borderRadius: ms(3),
  },
  listViewCheckinBtn: {
    width: 'auto',
    borderColor: COLORS.primary,
    borderWidth: 1,
    paddingVertical: ms(5),
    paddingHorizontal: ms(8),
    backgroundColor: COLORS.white,
  },
  listCheckinBtnText: {
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
    fontSize: ms(7),
    fontWeight: '500',
  },
  lineViewValues: { fontFamily: Fonts.Regular, fontSize: ms(8.5) },
  noAppointmentEmpty: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    alignSelf: 'center',
    margin: ms(20),
  },
  calendarModalView: {
    backgroundColor: COLORS.white,
    width: windowWidth * 0.6,
    height: windowHeight - SW(30),
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
  },
  closeImageSearchBtn: { height: ms(20), width: ms(20) },
  closeSearchBtn: { position: 'absolute', top: ms(5), right: ms(7) },
  searchAppointmentModalContainer: {
    marginHorizontal: ms(40),
    marginVertical: ms(40),
    backgroundColor: 'white',
    borderRadius: ms(5),
    paddingHorizontal: ms(20),
    paddingVertical: ms(20),
    minHeight: '70%',
  },
  cancelSavebtnReschedule: {
    flex: 1,
    flexDirection: 'row',
    marginTop: ms(10),
    marginHorizontal: ms(26),
    alignSelf: 'center',
  },
  dropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: ms(10),
  },
  containerStyle: {
    backgroundColor: COLORS.white,
    width: ms(100),
    borderRadius: ms(4),
    borderColor: COLORS.gerySkies,
    borderWidth: 1,
    padding: 0,
    // marginTop: ms(5),
    // height: ms(20),
    // backgroundColor: 'red',
  },
  dropdown: {
    zIndex: Platform.OS === 'ios' ? 100 : 99,
    fontStyle: Fonts.Regular,
    fontSize: ms(6),
    borderColor: COLORS.transparent,
    padding: 0,
    margin: 0,
    height: ms(15),
    minHeight: ms(25),
    overflow: 'hidden',
    // backgroundColor: 'blue',
  },
  calendarView: {
    // position: 'absolute',
    // right: ms(0),
    // top: ms(10),
    // height: ms(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
