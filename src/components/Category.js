import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Category = ({ category, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(category.name)}>
      <View style={styles.card}>
        <Image source={{uri:'https://dummyjson.com/image/200x100'}} style={styles.image} />
        <Text style={styles.categoryText}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default Category;
