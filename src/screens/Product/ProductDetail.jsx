import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useLayoutEffect } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { t } from "react-native-tailwindcss";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductService from "../../services/product/ProductService";

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const productService = ProductService();
  const { id } = route.params;
  console.log("id: " + id);
  const [product, setProduct] = useState({});
  const getProductDetail = (id) => {
    productService
      .getProduct(id)
      .then((response) => {
        if (response != null) {
          setProduct(response);
        }
      })
      .catch((error) => console.error(error));
  };

  useLayoutEffect(() => {
    getProductDetail(id);
  }, [id]);

  const renderCarouselItem = ({ item }) => (
    <View style={{ backgroundColor: "#fff", borderRadius: 5 }}>
      <Image
        source={{ uri: item }}
        style={[t.wFull, t.h48, t.roundedLg, t.shadow]}
        resizeMode="contain"
      />
    </View>
  );
  const isNotEmpty = (obj) => {
    return (
      obj !== null &&
      obj !== undefined &&
      obj !== undefined &&
      Object.keys(obj).length > 0
    );
  };

  return (
    <SafeAreaView style={{ flex: 1,...t.bgGray100 }}>
      <ScrollView style={[t.flex1, t.p5, t.bgGray100]}>
        {isNotEmpty(product) && (
          <>
            <Text style={[t.text2xl, t.fontBold, t.mb2]}>{product.title}</Text>
            <View style={{ flex: 3, marginTop: 16 }}>
              <Carousel
                loop
                mode="pause-advanced-parallax"
                snapEnabled={true}
                width={400}
                height={200}
                data={product.images}
                scrollAnimationDuration={1000}
                renderItem={renderCarouselItem}
              />
            </View>
            <View>
              <Text style={[t.textXl, t.fontBold, t.mt4, t.mb2]}>
                ${product.price.toFixed(2)}
              </Text>
              <Text style={[t.textBase, t.mb2]}>{product.description}</Text>
              <Text style={[t.textBase, t.mb2]}>
                Category: {product.category}
              </Text>
              <Text style={[t.textBase, t.mb2]}>Brand: {product.brand}</Text>
              <Text style={[t.textBase, t.mb2]}>SKU: {product.sku}</Text>
              <Text style={[t.textBase, t.mb2]}>Weight: {product.weight}g</Text>
              <Text style={[t.textBase, t.mb2]}>
                Dimensions: {product.dimensions.width} x{" "}
                {product.dimensions.height} x {product.dimensions.depth} cm
              </Text>
              <Text style={[t.textBase, t.mb2]}>
                Warranty: {product.warrantyInformation}
              </Text>
              <Text style={[t.textBase, t.mb2]}>
                Shipping: {product.shippingInformation}
              </Text>
              <Text style={[t.textBase, t.mb2]}>
                Availability: {product.availabilityStatus}
              </Text>
              <Text style={[t.textBase, t.mb2]}>
                Return Policy: {product.returnPolicy}
              </Text>
              <Text style={[t.textBase, t.mb2]}>
                Minimum Order Quantity: {product.minimumOrderQuantity}
              </Text>
              <Text style={[t.textBase, t.mb2]}>Rating: {product.rating}</Text>
              <FlatList
                data={product.reviews}
                //   contentContainerStyle={{height:250}}
                //   scrollEnabled={true}
                keyExtractor={(item) => item.reviewerEmail}
                renderItem={({ item }) => (
                  <View style={[t.mb5, t.p3, t.bgGray100, t.rounded]}>
                    <Text style={[t.textSm, t.fontBold]}>
                      Rating: {item.rating}
                    </Text>
                    <Text style={[t.textSm]}>{item.comment}</Text>
                    <Text style={[t.textXs, t.textGray500]}>
                      Date: {new Date(item.date).toLocaleDateString()}
                    </Text>
                    <Text style={[t.textSm, t.italic]}>
                      Reviewer: {item.reviewerName}
                    </Text>
                  </View>
                )}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
