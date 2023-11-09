import React, { useState } from 'react';
import { View } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './WalletSettings.styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { upadteApi } from '@/actions/SettingAction';
import { ToggleView } from '../Components/ToggleView';
import { cardPayment, wallet } from '@/assets';

export function WalletSettings() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);

  const coinStatus = getSettingData?.getSetting?.accept_jbr_coin_payment;
  const cashStatus = getSettingData?.getSetting?.accept_cash_payment;
  const cardStatus = getSettingData?.getSetting?.accept_card_payment;

  const [coinLoading, setCoinLoading] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  const clickHandler = (id) => {
    let data = {};
    switch (id) {
      case 1:
        setCoinLoading(true);
        data.accept_jbr_coin_payment = !coinStatus;
        break;
      case 2:
        setCashLoading(true);
        data.accept_cash_payment = !cashStatus;
        break;
      case 3:
        setCardLoading(true);
        data.accept_card_payment = !cardStatus;
        break;
      default:
    }
    dispatch(upadteApi(data))
      .then(() => {
        setCoinLoading(false);
        setCashLoading(false);
        setCardLoading(false);
      })
      .catch(() => {
        setCoinLoading(false);
        setCashLoading(false);
        setCardLoading(false);
      });
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.walletSetting?.wallet} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ToggleView
            icon={wallet}
            title={strings?.walletSetting?.payJbr}
            subTitle={strings?.walletSetting?.subTitle}
            subHeading={strings?.walletSetting?.onlineShop}
            onPress={() => clickHandler(1)}
            toggle={coinStatus}
            pending={coinLoading}
            start
            imageStyle={styles.iconStyle}
          />
          <ToggleView
            icon={Images.cash}
            title={strings?.walletSetting?.payCash}
            subHeading={strings?.walletSetting?.pos}
            subTitle={strings?.walletSetting?.subTitle}
            onPress={() => clickHandler(2)}
            toggle={cashStatus}
            pending={cashLoading}
            imageStyle={styles.iconStyle}
            start
          />
          <ToggleView
            icon={cardPayment}
            title={strings?.walletSetting?.payCard}
            subHeading={strings?.walletSetting?.pos}
            subTitle={strings?.walletSetting?.subTitle}
            onPress={() => clickHandler(3)}
            toggle={cardStatus}
            pending={cardLoading}
            imageStyle={styles.iconStyle}
            start
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
