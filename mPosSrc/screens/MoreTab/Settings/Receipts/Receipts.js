import React, { useState } from 'react';
import { View } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './Receipts.styles';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { upadteApi } from '@/actions/SettingAction';
import { ToggleView } from '../Components/ToggleView';

export function Receipts() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);

  const smsStatus = getSettingData?.getSetting?.invoice_sms_send_status;
  const emailStatus = getSettingData?.getSetting?.invoice_email_send_status;
  const invoiceStatus = getSettingData?.getSetting?.print_invoice_status;

  const [smsLoading, setSmsLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  const clickHandler = (id) => {
    let data = {};
    switch (id) {
      case 1:
        setSmsLoading(true);
        data.invoice_sms_send_status = !smsStatus;
        break;
      case 2:
        setEmailLoading(true);
        data.invoice_email_send_status = !emailStatus;
        break;
      case 3:
        setInvoiceLoading(true);
        data.print_invoice_status = !invoiceStatus;
        break;
      default:
    }
    dispatch(upadteApi(data))
      .then(() => {
        setSmsLoading(false);
        setEmailLoading(false);
        setInvoiceLoading(false);
      })
      .catch(() => {
        setSmsLoading(false);
        setEmailLoading(false);
        setInvoiceLoading(false);
      });
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.receipts?.receipts} />
      <View style={styles.container}>
        <SettingsContainer
          heading={strings?.receipts?.invoiceSetting}
          subHeading={strings?.receipts?.subTitle}
        >
          <ToggleView
            icon={Images.smsIcon}
            title={strings?.receipts?.sms}
            subTitle={strings?.receipts?.applyCharge}
            onPress={() => clickHandler(1)}
            toggle={smsStatus}
            pending={smsLoading}
          />
          <ToggleView
            icon={Images.emailInvoice}
            title={strings?.receipts?.email}
            subTitle={strings?.receipts?.emailAdd}
            onPress={() => clickHandler(2)}
            toggle={emailStatus}
            pending={emailLoading}
          />
          <ToggleView
            icon={Images.printInvoice}
            title={strings?.receipts?.printInvoice}
            subTitle={strings?.receipts?.connectprinter}
            onPress={() => clickHandler(3)}
            toggle={invoiceStatus}
            pending={invoiceLoading}
          />
        </SettingsContainer>
      </View>
    </ScreenWrapper>
  );
}
