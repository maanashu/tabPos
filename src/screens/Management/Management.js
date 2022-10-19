import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { crossButton, Fonts, notifications, rightIcon, search_light, tray } from "@/assets";
import { strings } from "@/localization";
import { COLORS, SF, SW, SH } from "@/theme";
import { Button, Spacer } from "@/components";
import { styles } from "@/screens/Management/Management.styles";

export function Management() {
    const [addCash, setAddCash] = useState(false);
    const [cashSummary, setCashSummary] = useState('');
    const [saveSession, setSaveSession] = useState('');
    const [removeCash, setRemoveCash] = useState(false);
    const [endSession, setEndSession] = useState(false);
    const [viewSession, setViewSession] = useState(false);
    const [selectAmount, setSelectAmount] = useState('first');
    const [trackingSession, setTrackingSession] = useState(false);

    const customHeader = () => {
        return (
            <View style={styles.headerMainView}>
                <View style={styles.deliveryView}>
                    <Image source={tray} style={styles.truckStyle} />
                    <Text style={styles.deliveryText}>{strings.management.cashTracking}</Text>
                </View>

                <View style={styles.deliveryView}>
                    <Image source={notifications} style={[styles.truckStyle, { right: 10 }]} />
                    <View style={styles.searchView}>
                        <Image source={search_light} style={styles.searchImage} />
                        <TextInput
                            placeholder={strings.deliveryOrders.search}
                            style={styles.textInputStyle}
                            placeholderTextColor={COLORS.darkGray}
                        />
                    </View>
                </View>
            </View>
        );
    };

    const trackinSessionModal = () => {
        return (
            <Modal transparent isVisible={trackingSession}>
                <View style={styles.modalMainView}>
                    <View style={styles.headerView}>
                        <View style={{ width: SW(170), alignItems: 'center' }}>
                            <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>{strings.management.session}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { setTrackingSession(false) }} style={{ width: SW(10) }}>
                            <Image source={crossButton} style={styles.crossIconStyle} />
                        </TouchableOpacity>
                    </View>

                    <Spacer space={SH(80)} />
                    <View style={styles.countCashView}>
                        <Text style={styles.countCashText}>{strings.management.countCash}</Text>

                        <Spacer space={SH(40)} />
                        <View>
                            <Text style={styles.amountCountedText}>{strings.management.amountCounted}</Text>
                            <TextInput placeholder={strings.management.amount} style={styles.inputStyle} placeholderTextColor={COLORS.solid_grey} />
                        </View>

                        <Spacer space={SH(40)} />
                        <View>
                            <Text style={styles.amountCountedText}>{strings.management.note}</Text>
                            <TextInput placeholder={strings.management.note} style={styles.noteInputStyle} placeholderTextColor={COLORS.gerySkies} />
                        </View>
                    </View>

                    <Spacer space={SH(90)} />
                    <View style={{ flex: 1 }} />
                    <Button title={strings.management.save} textStyle={styles.buttonText} style={styles.saveButton} onPress={() => { setTrackingSession(false), setSaveSession('save') }} />
                    <Spacer space={SH(40)} />
                </View>
            </Modal>
        )
    }

    const addCashModal = () => {
        return (
            <Modal transparent isVisible={addCash}>
                <View style={styles.modalMainView}>
                    <View style={[styles.headerView, { backgroundColor: removeCash ? COLORS.black : COLORS.primary }]}>
                        <View style={{ width: SW(170), alignItems: 'center' }}>
                            <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>{removeCash ? strings.management.removeCash : strings.management.addCash}</Text>
                        </View>

                        <TouchableOpacity onPress={() => { setAddCash(false) }} style={{ width: SW(10) }}>
                            <Image source={crossButton} style={styles.crossIconStyle} />
                        </TouchableOpacity>
                    </View>

                    <Spacer space={SH(80)} />
                    <View style={styles.countCashView}>
                        <Text style={styles.countCashText}>{removeCash ? strings.management.amountRemoved : strings.management.amountAdded}</Text>

                        <Spacer space={SH(40)} />
                        <View>
                            <Text style={styles.amountCountedText}>{strings.management.cashAmount}</Text>
                            <TextInput placeholder={strings.management.amount} style={styles.inputStyle} placeholderTextColor={COLORS.solid_grey} />
                        </View>

                        <Spacer space={SH(40)} />
                        <View>
                            <Text style={styles.amountCountedText}>{strings.management.note}</Text>
                            <TextInput placeholder={strings.management.note} style={styles.noteInputStyle} placeholderTextColor={COLORS.gerySkies} />
                        </View>
                    </View>

                    <Spacer space={SH(90)} />
                    <View style={{ flex: 1 }} />
                    <Button title={strings.management.confirm} textStyle={styles.buttonText} style={styles.saveButton} onPress={() => { setAddCash(false) }} />
                    <Spacer space={SH(40)} />
                </View>
            </Modal>
        )
    }

    const endSessionModal = () => {
        return (
            <Modal transparent isVisible={endSession}>
                <View style={styles.modalMainView}>
                    <View style={[styles.headerView, { backgroundColor: removeCash ? COLORS.black : COLORS.primary }]}>
                        <View style={{ width: SW(170), alignItems: 'center' }}>
                            <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>{strings.management.endTrackingSession}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setAddCash(false) }} style={{ width: SW(10) }}>
                            <Image source={crossButton} style={styles.crossIconStyle} />
                        </TouchableOpacity>
                    </View>

                    <Spacer space={SH(80)} />
                    {endSessionCashFunction()}
                    <Spacer space={SH(40)} />
                </View>
            </Modal>
        )
    }

    const contentFunction = () => {
        if (viewSession) {
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.sessionMainView}>
                        <View style={styles.sessionView}>
                            <View>
                                <Text style={styles.cashDrawerText}>{strings.management.cashDrawer}</Text>
                                <Text style={styles.drawerIdText}>{strings.management.drawerID}</Text>
                            </View>

                            <Text style={[styles.drawerIdText, { top: 2 }]}>{strings.management.date}</Text>
                        </View>

                        <Spacer space={SH(30)} />
                        <View>
                            <Text style={styles.usdText}>{strings.management.usd}</Text>
                            <Text style={[styles.cashDrawerText, { fontFamily: Fonts.Regular, textAlign: 'center' }]}>{strings.management.expected}</Text>
                        </View>

                        <Spacer space={SH(35)} />
                        <View style={[styles.buttonView, { flexDirection: 'row' }]}>
                            <TouchableOpacity onPress={() => { setAddCash(true), setRemoveCash(false) }} style={styles.addCashView}>
                                <Text style={styles.sessionHistoryText}>{strings.management.addCash}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setAddCash(true), setRemoveCash(true) }} style={styles.removeCashView}>
                                <Text style={styles.cashDrawerText}>{strings.management.removeCash}</Text>
                            </TouchableOpacity>
                        </View>
                        <Spacer space={SH(35)} />
                    </View>

                    <Spacer space={SH(40)} />
                    <View style={styles.buttonView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.cashPaymentsText}>{strings.management.cashPayments}</Text>
                            <Text>{''}</Text>
                        </View>

                        <View style={styles.paymentOptionsView}>
                            <Text style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}>{strings.management.totalCashIn}</Text>
                            <Text style={styles.cashDrawerText}>{strings.management.usd}</Text>
                        </View>

                        <View style={styles.paymentOptionsView}>
                            <Text style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}>{strings.management.totalCashOut}</Text>
                            <Text style={styles.cashDrawerText}>{strings.management.usd}</Text>
                        </View>

                        <View style={[styles.paymentOptionsView, { borderBottomWidth: 0 }]}>
                            <Text style={styles.cashDrawerText}>{strings.management.netPayment}</Text>
                            <Text style={styles.cashDrawerText}>{strings.management.usd}</Text>
                        </View>
                    </View>

                    <Spacer space={SH(40)} />
                    <Button
                        onPress={() => { setEndSession(true) }}
                        style={styles.buttonStyle}
                        textStyle={[styles.cashDrawerText, { color: COLORS.red }]}
                        title={strings.management.endSession} />
                    <Spacer space={SH(40)} />
                </ScrollView>
            )
        } else {
            return (
                <View>
                    <View style={styles.cashDrawerView}>
                        <View>
                            <Text style={styles.cashDrawerText}>{strings.management.cashDrawer}</Text>
                            <Text style={styles.drawerIdText}>{strings.management.drawerID}</Text>
                        </View>

                        {saveSession ? (<TouchableOpacity onPress={() => { setViewSession(true) }} style={styles.viewSessionButtonView}>
                            <Text style={styles.viewSessionButtonText}>{strings.management.viewSession.toUpperCase()}</Text>
                        </TouchableOpacity>)
                            :
                            (<TouchableOpacity onPress={() => { setTrackingSession(!trackingSession) }} style={styles.trackingButtonView}>
                                <Text style={styles.trackingButtonText}>{strings.management.session.toUpperCase()}</Text>
                            </TouchableOpacity>)}
                    </View>

                    <Spacer space={SH(30)} />
                    <View style={styles.sessionHistoryView}>
                        <Text style={styles.sessionHistoryText}>{strings.management.sessionHistory}</Text>
                        <Image source={rightIcon} style={styles.rightIconStyle} />
                    </View>
                </View>
            )
        }
    }

    const endSessionCashFunction = () => {
        if (cashSummary === 'summary') {
            return (
                <View style={{ width: SW(150), alignSelf: 'center' }}>
                    <View>
                        <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonRegular }]}>{'Cash summary'}</Text>
                        <Spacer space={SH(50)} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.Regular, color: COLORS.dark_grey, fontSize: SF(20) }}>{'Amount expected'}</Text>
                            <Text style={{ fontFamily: Fonts.Regular, color: COLORS.dark_grey, fontSize: SF(20) }}>{'USD $5,240.00'}</Text>
                        </View>

                        <Spacer space={SH(25)} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.Regular, color: COLORS.dark_grey, fontSize: SF(20) }}>{'Amount counted'}</Text>
                            <Text style={{ fontFamily: Fonts.Regular, color: COLORS.dark_grey, fontSize: SF(20) }}>{'USD $5,200.00'}</Text>
                        </View>

                        <Spacer space={SH(25)} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: Fonts.Regular, color: COLORS.orange, fontSize: SF(20) }}>{'Discrepancy'}</Text>
                            <Text style={{ fontFamily: Fonts.Regular, color: COLORS.orange, fontSize: SF(20) }}>{'-USD $40.00'}</Text>
                        </View>
                        <Spacer space={SH(60)} />
                    </View>

                    <Spacer space={SH(90)} />
                    <View style={{ flex: 1 }} />
                    <Button
                        style={styles.saveButton}
                        textStyle={styles.buttonText}
                        title={strings.management.next}
                        onPress={() => { setCashSummary('selectAmount') }} />
                </View>
            )
        } else if (cashSummary === 'selectAmount') {
            return (
                <View>
                    <View style={styles.countCashView}>
                        <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonRegular }]}>{'Select amount to leave in drawer'}</Text>
                        <Spacer space={SH(40)} />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { setSelectAmount('first') }} style={{ alignItems: 'center', justifyContent: 'center', width: SW(35), height: SH(60), borderWidth: 1, borderColor: selectAmount === 'first' ? COLORS.primary : COLORS.solidGrey, borderRadius: 5 }}>
                                <Text style={[styles.cashDrawerText, { color: selectAmount === 'first' ? COLORS.primary : COLORS.solid_grey }]}>{'$0.00'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setSelectAmount('second') }} style={{ left: 10, alignItems: 'center', justifyContent: 'center', width: SW(35), height: SH(60), borderWidth: 1, borderColor: selectAmount === 'second' ? COLORS.primary : COLORS.solidGrey, borderRadius: 5 }}>
                                <Text style={[styles.cashDrawerText, { color: selectAmount === 'second' ? COLORS.primary : COLORS.solid_grey }]}>{'$5,200.00'}</Text>
                            </TouchableOpacity>
                        </View>

                        <Spacer space={SH(40)} />
                        <View>
                            <Text style={styles.amountCountedText}>{'Other amount (USD)'}</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder={strings.management.amount}
                                placeholderTextColor={COLORS.solid_grey} />
                        </View>
                        <Spacer space={SH(60)} />
                    </View>

                    <Spacer space={SH(90)} />
                    <View style={{ flex: 1 }} />
                    <Button
                        style={styles.saveButton}
                        textStyle={styles.buttonText}
                        title={strings.management.next}
                        onPress={() => { setCashSummary('remove') }} />
                </View>
            )
        } else if (cashSummary === 'remove') {
            return (
                <View>
                    <View style={styles.countCashView}>
                        <Text style={{ textAlign: 'center', fontFamily: Fonts.Bold, fontSize: SF(30), color: COLORS.solid_grey }}>{'Remove USD $5,200.00 from drawer'}</Text>
                        <Spacer space={SH(21)} />
                        <Text style={{ textAlign: 'center', fontFamily: Fonts.Regular, fontSize: SF(16), color: COLORS.solid_grey }}>{'Amount left in drawer: USD $0.00'}</Text>
                    </View>

                    <Spacer space={SH(190)} />
                    <View style={{ flex: 1 }} />
                    <Button
                        style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
                        textStyle={[styles.buttonText, { color: COLORS.white }]}
                        title={'Done'}
                        onPress={() => { setEndSession(false), setCashSummary('') }} />
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.countCashView}>
                        <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonRegular }]}>{strings.management.countCash}</Text>
                        <Spacer space={SH(40)} />
                        <View>
                            <Text style={styles.amountCountedText}>{strings.management.cashAmount}</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder={strings.management.amount}
                                placeholderTextColor={COLORS.solid_grey} />
                        </View>
                        <Spacer space={SH(60)} />
                    </View>

                    <Spacer space={SH(90)} />
                    <View style={{ flex: 1 }} />
                    <Button
                        style={styles.saveButton}
                        textStyle={styles.buttonText}
                        title={strings.management.next}
                        onPress={() => { setCashSummary('summary') }} />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {customHeader()}

            <Spacer space={SH(20)} />
            {contentFunction()}
            {trackinSessionModal()}
            {addCashModal()}
            {endSessionModal()}
        </View>
    )
}