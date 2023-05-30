import React, { useState } from 'react';
import { ScreenWrapper } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { right_light } from '@/assets';

import { settingLabelData } from '@/constants/flatListData';
import {
  Device,
  Invoices,
  Location,
  Notification,
  Plans,
  Security,
  Taxes,
  Wallet,
  Shipping,
  Languages,
  Legal,
  Policies,
} from '@/screens/Setting/Components';

export function Setting() {
  const [selectedId, setSelectedId] = useState(1);
  const [security, setSecurity] = useState(false);
  const [device, setDevice] = useState(false);
  const onpressFun = id => {
    if (id === 1) {
      setSecurity(true), setDevice(false);
    } else if (id === 2) {
      setDevice(true), setSecurity(false);
    }
  };

  const renderView = {
    [1]: <Security />,
    [2]: <Device />,
    [3]: <Notification />,
    [4]: <Location />,
    [5]: <Plans />,
    [6]: <Invoices />,
    [7]: <Taxes />,
    [8]: <Wallet />,
    [9]: <Shipping />,
    [10]: (
      <View>
        <Text>Staffs</Text>
      </View>
    ),
    [11]: <Languages />,
    [12]: <Legal />,
    [13]: <Policies />,
    [14]: (
      <View>
        <Text>Device Detail</Text>
      </View>
    ),
  };

  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    borderColor,
    tintAndColor,
  }) => (
    <TouchableOpacity
      style={[styles.headingBody, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <View style={styles.flexRow}>
        <View style={styles.dispalyRow}>
          <Image
            source={item.image}
            style={[styles.security, { tintColor: tintAndColor }]}
          />
          <View style={{ marginLeft: 6 }}>
            <Text style={[styles.securityText, { color: textColor }]}>
              {item.name}
            </Text>
            <Text style={[styles.notUpdated, { color: tintAndColor }]}>
              {item.subhead}
            </Text>
          </View>
        </View>
        <Image
          source={right_light}
          style={[styles.right_light, { tintColor: tintAndColor }]}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? COLORS.blue_shade : '#transparent';
    const tintAndColor =
      item.id === selectedId ? COLORS.primary : COLORS.darkGray;
    const borderColor =
      item.id === selectedId ? COLORS.blue_shade : COLORS.solidGrey;
    const color = item.id === selectedId ? COLORS.primary : COLORS.black;

    return (
      <Item
        item={item}
        onPress={() => (setSelectedId(item.id), onpressFun(item.id))}
        backgroundColor={backgroundColor}
        textColor={color}
        tintAndColor={tintAndColor}
        borderColor={borderColor}
      />
    );
  };
  const bodyView = () => {
    return renderView[selectedId];
  };

  // const customHeader = () => {
  //   return (
  //     <View style={styles.headerMainView}>
  //       {rewardList ? (
  //         <TouchableOpacity
  //           style={styles.backButtonCon}
  //           onPress={() => setRewardList(false)}
  //         >
  //           <Image source={backArrow} style={styles.backButtonArrow} />
  //           <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
  //         </TouchableOpacity>
  //       ) : (
  //         <View style={styles.deliveryView}>
  //           <Image source={reward} style={styles.truckStyle} />
  //           <Text style={styles.deliveryText}>{strings.reward.rewards}</Text>
  //         </View>
  //       )}

  //       <View style={styles.deliveryView}>
  //         <Image
  //           source={notifications}
  //           style={[styles.truckStyle, { right: 20 }]}
  //         />
  //         <View style={styles.searchView}>
  //           <Image source={search_light} style={styles.searchImage} />
  //           <TextInput
  //             placeholder={strings.deliveryOrders.search}
  //             style={styles.textInputStyles}
  //             placeholderTextColor={COLORS.darkGray}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.dispalyRow}>
          <View style={styles.headingCon}>
            <View>
              <FlatList
                data={settingLabelData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            </View>
          </View>
          <View style={styles.DataCon}>{bodyView()}</View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
