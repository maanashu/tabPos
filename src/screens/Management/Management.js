import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { crossButton, Fonts, notifications, rightIcon, search_light, tray } from "@/assets";
import { strings } from "@/localization";
import { COLORS, SF, SW } from "@/theme";
import { styles } from "./Management.styles";
import { Button, Spacer } from "@/components";
import { SH } from "@/theme";

export function Management() {

    const [trackingSession, setTrackingSession] = useState(false);
    const [saveSession, setSaveSession] = useState('');
    const [viewSession, setViewSession] = useState(false)

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

    const contentFunction = () => {
        if (viewSession) {
            return (
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

                    <Spacer space={SH(30)} />
                    {/* <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:1}}>
                        <View style={styles.addCashView}>
                            <Text>{strings.management.addCash}</Text>
                        </View>

                        <View style={styles.removeCashView}>
                            <Text>{strings.management.removeCash}</Text>
                        </View>
                    </View> */}
                </View>
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


    return (
        <View style={styles.container}>

            {customHeader()}

            <Spacer space={SH(20)} />

            {contentFunction()}

            {trackinSessionModal()}
        </View>
    )
}