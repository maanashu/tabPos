import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { memo } from 'react';
import { styles } from '../../styles';

const ListViewHeader = () => {
  return (
    <>
      <View style={styles.LlistViewHeaderContainer}>
        <Text style={[styles.LheaderText, { flex: 0.3, textAlign: 'left' }]}>Customer</Text>
        {/* <Text style={styles.LheaderText}>Staff</Text> */}
        <Text style={[styles.LheaderText, { textAlign: 'left' }]}>Service</Text>
        {/* <Text style={styles.LheaderText}>Time</Text> */}
        <Text style={styles.LheaderText}></Text>
      </View>
      <View style={styles.deviderList} />
    </>
  );
};

export default memo(ListViewHeader);
