import React from 'react';
import { Image, Text, View ,TouchableOpacity} from 'react-native';
import { t } from 'react-native-tailwindcss';
import Rating from './Rating'; 
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const { id,title, price, rating, description, brand, thumbnail } = product;
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail', { id })}>
    <View style={[t.p4, t.bgWhite, t.roundedLg, t.shadow, t.m2]}>
      <Image
        source={{ uri: thumbnail }}
        style={[t.wFull, t.h48, t.roundedLg]}
        resizeMode="contain"
      />
      <Text style={[t.textLg, t.fontBold, t.mt2]}>{title}</Text>
      <Text style={[t.textSm, t.textGray600]}>{brand}</Text>
      <Text style={[t.textBase, t.textGray800, t.mt1]}>$ {price}</Text>
      <Rating rating={rating} />
      <Text style={[t.textSm, t.textGray700, t.mt2]}>{description}</Text>
    </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
