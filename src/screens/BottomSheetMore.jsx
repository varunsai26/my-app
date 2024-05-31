import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const BottomSheetMore = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  const DATA = [
    { icon: "person-circle-outline", title: "My profile" },
    { icon: "logo-dropbox", title: "orders" },
    { icon: "location-outline", title: "address" },
    { icon: "chatbox-ellipses-outline", title: "contact us" },
    // Add more items as needed
  ];

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={24} color="black" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ItemSeparator}
          estimatedItemSize={50}
        />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
});

export default BottomSheetMore;
