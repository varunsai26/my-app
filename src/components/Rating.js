import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from 'react-native-tailwindcss';

const Rating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <View style={[t.flexRow, t.itemsCenter]}>
      {[...Array(filledStars)].map((_, index) => (
        <Ionicons key={`filled-${index}`} name="star" size={20} color="#FFD700" />
      ))}
      {halfStars === 1 && (
        <Ionicons key="half" name="star-half" size={20} color="#FFD700" />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <Ionicons key={`empty-${index}`} name="star-outline" size={20} color="#FFD700" />
      ))}
    </View>
  );
};

export default Rating;
