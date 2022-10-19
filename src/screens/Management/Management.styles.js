import { StyleSheet, Dimensions } from "react-native";
import { SW, SH, SF } from "@/theme";
import { COLORS } from "@/theme";
import { Fonts } from "@/assets";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    headerMainView: {
        width: windowWidth - 10,
        paddingHorizontal: SW(16),
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingVertical: SH(35),
        flexDirection: 'row',
    },
    textInputStyle: {
        width: SW(45),
        marginLeft: 10,
        fontFamily: Fonts.Italic,
        fontSize: SF(15),
    },
    truckStyle: {
        width: SH(32),
        height: SH(32),
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
        fontSize: SF(20),
        paddingLeft: SW(4),
    },
    searchView: {
        borderWidth: 1,
        width: SW(65),
        height: SH(43),
        borderRadius: 20,
        borderColor: COLORS.row_grey,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchImage: {
        width: SH(24),
        height: SH(24),
        resizeMode: 'contain',
        left: 3,
    },
    cashDrawerView: {
        width: windowWidth - 100,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SH(25),
        paddingVertical: SH(30),
        backgroundColor: COLORS.textInputBackground
    },
    cashDrawerText: {
        fontFamily: Fonts.SemiBold,
        color: COLORS.solid_grey,
        fontSize: SF(20),
    },
    drawerIdText: {
        fontFamily: Fonts.Regular,
        color: COLORS.solid_grey,
        fontSize: SF(14),
    },
    trackingButtonView: {
        width: SW(60),
        height: SH(60),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    trackingButtonText: {
        fontFamily: Fonts.Medium,
        color: COLORS.white,
        fontSize: SF(12),
    },
    viewSessionButtonView: {
        width: SW(40),
        height: SH(60),
        borderRadius: 5,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    viewSessionButtonText: {
        fontFamily: Fonts.Bold,
        color: COLORS.primary,
        fontSize: SF(12),
    },
    sessionHistoryView: {
        width: windowWidth - 100,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.solidGrey,
        borderRadius: 10,
        paddingVertical: SH(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SH(25),
    },
    sessionHistoryText: {
        fontFamily: Fonts.SemiBold,
        color: COLORS.primary,
        fontSize: SF(20),
    },
    rightIconStyle: {
        width: SH(24),
        height: SH(24),
        resizeMode: 'contain'
    },
    modalMainView: {
        backgroundColor: COLORS.white,
        width: SW(180),
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center'
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
        flexDirection: 'row'
    },
    crossIconStyle: {
        width: SH(24),
        height: SH(24),
        resizeMode: 'contain',
        tintColor: COLORS.white
    },
    countCashView: {
        width: SW(130),
        alignSelf: 'center'
    },
    countCashText: {
        fontFamily: Fonts.MaisonBold,
        color: COLORS.solid_grey,
        fontSize: SF(24),
    },
    amountCountedText: {
        fontFamily: Fonts.Medium,
        color: COLORS.darkGray,
        fontSize: SF(14),
    },
    inputStyle: {
        marginTop: 4,
        width: SW(130),
        height: SH(60),
        borderRadius: 5,
        fontFamily: Fonts.Regular,
        fontSize: SF(24),
        color: COLORS.solid_grey,
        paddingLeft: SW(5),
        paddingVertical: SH(5),
        backgroundColor: COLORS.textInputBackground,
    },
    noteInputStyle: {
        marginTop: 4,
        width: SW(130),
        height: SH(60),
        borderRadius: 5,
        fontFamily: Fonts.Italic,
        fontSize: SF(13),
        color: COLORS.solid_grey,
        paddingLeft: SW(5),
        paddingVertical: SH(5),
        backgroundColor: COLORS.textInputBackground,
    },
    buttonText: {
        fontSize: SF(16),
        color: COLORS.darkGray,
        textAlign: 'center',
        fontFamily: Fonts.Medium
    },
    saveButton: {
        alignSelf: 'center',
        width: SW(130),
        height: SH(60),
    },
    sessionMainView: {
        width: windowWidth - 90,
        alignSelf: 'center',
        borderRadius: 10,
        paddingTop: SH(30),
        backgroundColor: COLORS.textInputBackground
    },
    sessionView: {
        width: windowWidth - 140,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.textInputBackground
    },
    usdText: {
        fontSize: SF(54),
        color: COLORS.primary,
        textAlign: 'center',
        fontFamily: Fonts.SemiBold
    },
    buttonView: {
        justifyContent: 'space-between',
        width: windowWidth - 140,
        alignSelf: 'center',
    },
    addCashView: {
        width: SW(144),
        height: SH(110),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.blue_shade
    },
    removeCashView: {
        width: SW(144),
        height: SH(110),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.silver_solid
    },
    cashPaymentsText: {
        fontFamily: Fonts.SemiBold,
        fontSize: SF(24),
        color: COLORS.black
    },
    paymentOptionsView: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.solidGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SH(40),
        paddingBottom: SH(15)
    },
    buttonStyle:{
        width:windowWidth - 90,
        height:SH(90),
        alignSelf:'center'
    }
})