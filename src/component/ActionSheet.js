import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';



const ActionSheetComponent = React.forwardRef(
  ({ title = '', dataset = [], onPress = () => {} }, ref) => (
    <ActionSheet ref={ref} containerStyle={{ backgroundColor: 'transparent' }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {dataset.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  ref.current.hide();
                  onPress(item);
                }}
                style={styles.listItem}>
                <Text style={styles.listItemText} numberOfLines={1}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => ref.current.hide()} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  ),
);

export default ActionSheetComponent;
const styles = StyleSheet.create({
    container: {
      padding: 10,
      paddingBottom: 20,
    },
    headerContainer: {
      backgroundColor: 'rgba(241,241,241,0.9)',
      borderRadius: 10,
      marginBottom: 10,
      overflow: 'hidden',
    },
    header: {
      borderBottomWidth: 1.5,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    title: {
      color: 'rgb(0,88,200)',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '500',
    },
    scrollView: {
      maxHeight: 200,
    },
    listItem: {
      paddingVertical: 12,
      alignItems: 'center',
      borderBottomWidth: 1.5,
      borderBottomColor: '#ccc',
    },
    listItemText: {
      color: '#000',
      fontSize: 16,
    },
    cancelButton: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: 'rgb(0,88,200)',
      fontSize: 18,
      fontWeight: '600',
    },
  });