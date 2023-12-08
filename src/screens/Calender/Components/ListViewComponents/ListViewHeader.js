import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styles } from '../../Calender.styles';
import { memo } from 'react';
import { ms } from 'react-native-size-matters';

const ListViewHeader = () => {
  return (
    <>
      <View style={styles.LlistViewHeaderContainer}>
        <View style={{ flex: 0.2 }}>
          <Text style={[styles.LheaderText, { paddingLeft: ms(15), textAlign: 'left' }]}>
            Client
          </Text>
        </View>
        <Text style={styles.LheaderText}>Staff</Text>
        <Text style={styles.LheaderText}>Service</Text>
        <Text style={styles.LheaderText}>Time</Text>
        <Text style={styles.LheaderText}></Text>
      </View>
      {/* <View style={styles.deviderList} /> */}
    </>
  );
};

export default memo(ListViewHeader);
