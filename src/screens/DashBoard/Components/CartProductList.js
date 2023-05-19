import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import {
  borderCross,
  columbiaMen,
  minus,
  plus,
  scn,
  search_light,
} from '@/assets';

export function CartProductList({ cartproductListHandler }) {
  return (
    <View>
      <View style={styles.inputWraper2}>
        <View style={styles.displayRow}>
          <View>
            <Image source={search_light} style={styles.searchStyle} />
          </View>
          <TextInput
            placeholder={strings.retail.searchProduct}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity>
          <Image source={scn} style={styles.scnStyle} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(10)} />
      {/* changeList start */}

      <View style={styles.blueListHeader}>
        <View style={styles.displayflex}>
          <View style={[styles.tableListSide, styles.listLeft]}>
            <Text style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}>
              #
            </Text>
            <Text style={styles.cashLabelWhite}>Item</Text>
          </View>
          <View style={[styles.tableListSide, styles.tableListSide2]}>
            <Text style={styles.cashLabelWhite}>Unit Price</Text>
            <Text style={styles.cashLabelWhite}>Quantity</Text>
            <Text style={styles.cashLabelWhite}>Line Total</Text>
            <Text style={{ color: COLORS.primary }}>1</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.blueListData}
        onPress={cartproductListHandler}
      >
        <View style={styles.displayflex}>
          <View style={[styles.tableListSide, styles.listLeft]}>
            <Text style={[styles.blueListDataText, styles.cashLabelWhiteHash]}>
              1
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={columbiaMen} style={styles.columbiaMen} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.blueListDataText}>
                  Columbia Men's Rain Jacket
                </Text>
                <Text style={styles.sukNumber}>SUK: 5689076</Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableListSide, styles.tableListSide2]}>
            <Text style={styles.blueListDataText}>$80.99</Text>
            <View style={styles.listCountCon}>
              <Image source={minus} style={styles.minus} />
              <Text>1</Text>
              <Image source={plus} style={styles.minus} />
            </View>
            <Text style={styles.blueListDataText}>$80.99</Text>
            <Image source={borderCross} style={styles.borderCross} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.blueListData}
        onPress={cartproductListHandler}
      >
        <View style={styles.displayflex}>
          <View style={[styles.tableListSide, styles.listLeft]}>
            <Text style={[styles.blueListDataText, styles.cashLabelWhiteHash]}>
              1
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={columbiaMen} style={styles.columbiaMen} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.blueListDataText}>
                  Columbia Men's Rain Jacket
                </Text>
                <Text style={styles.sukNumber}>SUK: 5689076</Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableListSide, styles.tableListSide2]}>
            <Text style={styles.blueListDataText}>$80.99</Text>
            <View style={styles.listCountCon}>
              <Image source={minus} style={styles.minus} />
              <Text>1</Text>
              <Image source={plus} style={styles.minus} />
            </View>
            <Text style={styles.blueListDataText}>$80.99</Text>
            <Image source={borderCross} style={styles.borderCross} />
          </View>
        </View>
      </TouchableOpacity>

      {/* changeList end */}
    </View>
  );
}
