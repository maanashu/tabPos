import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  crossButton,
  Fonts,
  notifications,
  rightIcon,
  search_light,
  tray,
  backArrow,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { styles } from '@/screens/Management/Management.styles';

import { SessionHistoryTable, SummaryHistory } from '@/screens/Management/Components';

export function Management() {
  const [addCash, setAddCash] = useState(false);
  const [cashSummary, setCashSummary] = useState('');
  const [saveSession, setSaveSession] = useState('');
  const [removeCash, setRemoveCash] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [viewSession, setViewSession] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState(false);
  const [selectAmount, setSelectAmount] = useState('first');
  const [trackingSession, setTrackingSession] = useState(false);
  const [newTrackingSession, setNewTrackingSession] = useState(false);
  const [sessionHistory, setSessionHistory] = useState(false);
  const [historyHeader, setHistoryHeader] = useState(false);
  const [endSelectAmount, setEndSelectAmount] = useState(false);
  const [removeUsd, setRemoveUsd] = useState(false);

  const tableTouchHandler = () => {
    setSessionHistory(false), setSummaryHistory(true);
  };
  const emailButtonHandler = () => {
    setSummaryHistory(false),
    setViewSession(false),
    contentFunction(),
    setNewTrackingSession(true);
    setHistoryHeader(false);
  };

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {sessionHistory || viewSession ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              viewSession ? setViewSession(false) : setSessionHistory(false);
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={tray} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>
              {strings.management.cashTracking}
            </Text>
          </View>
        )}
        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
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
            <View style={{ width: SW(140), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.session}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setTrackingSession(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(80)} />
          <View style={styles.countCashView}>
            <Text style={styles.countCashText}>
              {strings.management.countCash}
            </Text>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.amountCounted}
              </Text>
              <TextInput
                placeholder={strings.management.amount}
                style={styles.inputStyle}
                placeholderTextColor={COLORS.solid_grey}
              />
            </View>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.note}
              </Text>
              <TextInput
                placeholder={strings.management.note}
                style={styles.noteInputStyle}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            title={strings.management.save}
            textStyle={styles.buttonText}
            style={styles.saveButton}
            onPress={() => {
              setTrackingSession(false), setSaveSession('save');
            }}
          />
          <Spacer space={SH(40)} />
        </View>
      </Modal>
    );
  };

  const addCashModal = () => {
    return (
      <Modal transparent isVisible={addCash}>
        <View style={styles.modalMainView}>
          <View
            style={[
              styles.headerView,
              { backgroundColor: removeCash ? COLORS.black : COLORS.primary },
            ]}
          >
            <View style={{ width: SW(135), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {removeCash
                  ? strings.management.removeCash
                  : strings.management.addCash}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setAddCash(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(50)} />
          <View style={styles.countCashView}>
            <Text style={styles.countCashText}>
              {removeCash
                ? strings.management.amountRemoved
                : strings.management.amountAdded}
            </Text>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.cashAmount}
              </Text>
              <TextInput
                placeholder={strings.management.amount}
                style={styles.inputStyle}
                placeholderTextColor={COLORS.solid_grey}
              />
            </View>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.note}
              </Text>
              <TextInput
                placeholder={strings.management.note}
                style={styles.noteInputStyle}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            title={strings.management.confirm}
            textStyle={styles.buttonText}
            style={styles.saveButton}
            onPress={() => {
              setAddCash(false);
            }}
          />
          <Spacer space={SH(40)} />
        </View>
      </Modal>
    );
  };

  const endSessionFunction = () => {
    if (endSession) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endTrackingSession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEndSession(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text
                style={[
                  styles.countCashText,
                  { fontFamily: Fonts.MaisonRegular },
                ]}
              >
                {strings.management.countCash}
              </Text>
              <Spacer space={SH(40)} />
              <View>
                <Text style={styles.amountCountedText}>
                  {strings.management.cashAmount}
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={strings.management.amount}
                  placeholderTextColor={COLORS.solid_grey}
                />
              </View>
              <Spacer space={SH(60)} />
            </View>
            <View style={{ flex: 1 }} />
            <Button
              style={styles.saveButton}
              textStyle={styles.buttonText}
              title={strings.management.next}
              onPress={() => (setEndSession(false), setCashSummary(true))}
            />
          </View>
        </View>
      );
    } else if (cashSummary) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endTrackingSession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setCashSummary(false), setEndSession(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text
                style={[
                  styles.countCashText,
                  { fontFamily: Fonts.MaisonRegular },
                ]}
              >
                {strings.management.cashSummary}
              </Text>
              <Spacer space={SH(50)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>
                  {strings.management.amountexpect}
                </Text>
                <Text style={styles.amountExpect}>{'USD $5,240.00'}</Text>
              </View>
              <Spacer space={SH(25)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>
                  {strings.management.amountCounted}
                </Text>
                <Text style={styles.amountExpect}>{'USD $5,200.00'}</Text>
              </View>

              <Spacer space={SH(25)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>
                  {strings.management.discrepancy}
                </Text>
                <Text style={styles.amountExpect}>{'-USD $40.00'}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              onPress={() => {
                setCashSummary(false), setEndSelectAmount(true);
              }}
            />
          </View>
        </View>
      );
    } else if (endSelectAmount) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endTrackingSession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEndSelectAmount(false), setCashSummary(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text
                style={[
                  styles.countCashText,
                  { fontFamily: Fonts.MaisonRegular },
                ]}
              >
                {strings.management.selectAmountDra}
              </Text>
              <Spacer space={SH(20)} />
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectAmount('first');
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SW(45),
                    height: SH(50),
                    borderWidth: 1,
                    borderColor:
                      selectAmount === 'first'
                        ? COLORS.primary
                        : COLORS.solidGrey,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={[
                      styles.cashDrawerText,
                      {
                        color:
                          selectAmount === 'first'
                            ? COLORS.primary
                            : COLORS.solid_grey,
                      },
                    ]}
                  >
                    {'$0.00'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectAmount('second');
                  }}
                  style={{
                    left: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SW(45),
                    height: SH(50),
                    borderWidth: 1,
                    borderColor:
                      selectAmount === 'second'
                        ? COLORS.primary
                        : COLORS.solidGrey,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={[
                      styles.cashDrawerText,
                      {
                        color:
                          selectAmount === 'second'
                            ? COLORS.primary
                            : COLORS.solid_grey,
                      },
                    ]}
                  >
                    {'$5,200.00'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Spacer space={SH(20)} />
              <View>
                <Text style={styles.amountCountedText}>
                  {strings.management.otherAmountusd}
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={strings.management.amount}
                  placeholderTextColor={COLORS.solid_grey}
                />
              </View>
            </View>

            <View style={{ flex: 1 }} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              onPress={() => (setEndSelectAmount(false), setRemoveUsd(true))}
            />
          </View>
        </View>
      );
    } else if (removeUsd) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endTrackingSession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setRemoveUsd(false), setEndSelectAmount(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text style={styles.removerDarkText}>
                {'Remove USD $5,200.00 from drawer'}
              </Text>
              <Spacer space={SH(21)} />
              <Text style={styles.removerDarkTextRegular}>
                {'Amount left in drawer: USD $0.00'}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={'Done'}
              onPress={() => {
                setRemoveUsd(false),
                  setEndSession(false),
                  setCashSummary(''),
                  setSummaryHistory(true),
                  setHistoryHeader(true);
              }}
            />
          </View>
        </View>
      );
    }
  };

  const endSessionModal = () => {
    return (
      <Modal
        transparent
        isVisible={endSession || cashSummary || endSelectAmount || removeUsd}
      >
        <View style={styles.modalMainView}>{endSessionFunction()}</View>
      </Modal>
    );
  };

  const contentFunction = props => {
    if (sessionHistory) {
      return <SessionHistoryTable tableTouchHandler={tableTouchHandler} />;
    } else if (summaryHistory) {
      return (
        <View>
          <View style={styles.summaryHeaderCon}>
            <View style={styles.displayFlex}>
              {historyHeader === true ? (
                <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={() => {
                    setSummaryHistory(false), setViewSession(true);
                    setHistoryHeader(false);
                  }}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>
                    {strings.posSale.back}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={() => {
                    setSummaryHistory(false);
                    setSessionHistory(true);
                    setHistoryHeader(false);
                  }}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>
                    {strings.posSale.back}
                  </Text>
                </TouchableOpacity>
              )}

              <View>
                {historyHeader === true ? (
                  <Text style={styles.summaryText}>
                    {strings.management.summary}{' '}
                    <Text
                      style={[styles.summaryText, { color: COLORS.primary }]}
                    >
                      {strings.management.date}
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.summaryText}>
                    {strings.management.sessionHistory}{' '}
                    <Text
                      style={[styles.summaryText, { color: COLORS.primary }]}
                    >
                      {strings.management.date}
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <Text>{null}</Text>
              </View>
            </View>
          </View>

          <SummaryHistory
            historyHeader={historyHeader}
            // emailButtonHandler={emailButtonHandler}
          />

          <View>
            <Spacer space={SH(20)} />
            {historyHeader === true ? (
              <Button
                title={strings.management.sendEmailButton}
                textStyle={styles.buttonText}
                style={styles.senEmailButton}
                onPress={emailButtonHandler}
              />
            ) : null}
          </View>
        </View>
      );
    } else if (viewSession) {
      return (
        <View>
          <View style={styles.sessionMainView}>
            <View style={styles.sessionView}>
              <View>
                <Text style={styles.cashDrawerText}>
                  {strings.management.cashDrawer}
                </Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID}
                </Text>
              </View>

              <Text style={[styles.drawerIdText, { top: 2 }]}>
                {strings.management.date}
              </Text>
            </View>

            <Spacer space={SH(10)} />
            <View>
              <Text style={styles.usdText}>{strings.management.usd}</Text>
              <Text
                style={[
                  styles.cashDrawerText,
                  { fontFamily: Fonts.Regular, textAlign: 'center' },
                ]}
              >
                {strings.management.expected}
              </Text>
            </View>

            <Spacer space={SH(25)} />
            <View style={[styles.buttonView, { flexDirection: 'row' }]}>
              <TouchableOpacity
                onPress={() => {
                  setAddCash(true), setRemoveCash(false);
                }}
                style={styles.addCashView}
              >
                <Text style={styles.sessionHistoryText}>
                  {strings.management.addCash}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAddCash(true), setRemoveCash(true);
                }}
                style={styles.removeCashView}
              >
                <Text style={styles.cashDrawerText}>
                  {strings.management.removeCash}
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(35)} />
          </View>

          <Spacer space={SH(20)} />
          <View style={styles.buttonView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cashPaymentsText}>
                {strings.management.cashPayments}
              </Text>
              <Text>{''}</Text>
            </View>

            <View style={styles.paymentOptionsView}>
              <Text
                style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}
              >
                {strings.management.totalCashIn}
              </Text>
              <Text style={styles.cashDrawerText}>
                {strings.management.usd}
              </Text>
            </View>

            <View style={styles.paymentOptionsView}>
              <Text
                style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}
              >
                {strings.management.totalCashOut}
              </Text>
              <Text style={styles.cashDrawerText}>
                {strings.management.usd}
              </Text>
            </View>

            <View style={[styles.paymentOptionsView, { borderBottomWidth: 0 }]}>
              <Text style={styles.cashDrawerText}>
                {strings.management.netPayment}
              </Text>
              <Text style={styles.cashDrawerText}>
                {strings.management.usd}
              </Text>
            </View>
          </View>

          <Spacer space={SH(40)} />
          <Button
            onPress={() => {
              setEndSession(true);
            }}
            style={styles.buttonStyle}
            textStyle={[styles.cashDrawerText, { color: COLORS.red }]}
            title={strings.management.endSession}
          />
          <Spacer space={SH(40)} />
        </View>
      );
    } else {
      return (
        <View>
          {saveSession ? (
            <View style={styles.cashDrawerView}>
              <View>
                <Text style={styles.cashDrawerText}>
                  {strings.management.cashDrawer}
                </Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setViewSession(true);
                }}
                style={styles.viewSessionButtonView}
              >
                <Text style={styles.viewSessionButtonText}>
                  {strings.management.viewSession.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cashDrawerView}>
              <View>
                <Text style={styles.cashDrawerText}>
                  {strings.management.cashDrawer}
                </Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTrackingSession(!trackingSession);
                }}
                style={styles.trackingButtonView}
              >
                <Text style={styles.trackingButtonText}>
                  {strings.management.session.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {newTrackingSession ? (
            <View>
              <Spacer space={SH(30)} />
              <View style={styles.cashDrawerView}>
                <View>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.cashDrawer}
                  </Text>
                  <Text style={styles.drawerIdText}>
                    {strings.management.drawerID2}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    //   setTrackingSession(!trackingSession);
                    alert('coming soon');
                  }}
                  style={styles.trackingButtonView}
                >
                  <Text style={styles.trackingButtonText}>
                    {strings.management.session.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <Spacer space={SH(30)} />
          <TouchableOpacity style={styles.sessionHistoryView} onPress={() => setSessionHistory(true)}>
            <Text style={styles.sessionHistoryText}>
              {strings.management.sessionHistory}
            </Text>
              <Image source={rightIcon} style={styles.rightIconStyle} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {summaryHistory ? null : customHeader()}
        {contentFunction()}
        {trackinSessionModal()}
        {addCashModal()}
        {endSessionModal()}
      </View>
    </ScreenWrapper>
  );
}
