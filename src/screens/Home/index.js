import { FlashList } from '@shopify/flash-list';
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../../components/ProductCard';
import ProductService from '../../services/product/ProductService';
import Category from '../../components/Category';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Flag to track loading state
  const [isRefreshing, setIsRefreshing] = useState(false); // Flag to track refreshing state
  const productService = ProductService();
  const listRef = useRef(null); // Ref to access FlashList methods (optional)

  const getCategories = () => {
    productService.getCategories().then((response) => {
      if (response != null) {
        setCategories(response);
      }
    }).catch((error) => console.error(error));
  };

  const onCategory = (category) => {
    getProductCategories(category);
  };

  const getProductCategories = async (category) => {
    setIsLoadingMore(true); // Set loading flag to indicate data fetching

    try {
      const response = await productService.getCategoryProducts(category);
      if (response) {
        setProducts(response.products); // Efficiently append new products
        setMetaData({ limit: response.limit, start: response.skip, total: response.total });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false); // Reset loading flag after data fetching
    }
  };

  const getProducts = async (start = 0, limit = 10) => {
    if (start === 0) {
      setIsRefreshing(true); // Set refreshing flag to indicate data fetching
    } else {
      setIsLoadingMore(true); // Set loading flag to indicate data fetching
    }

    try {
      const response = await productService.getProducts(start, limit);
      if (response) {
        if (start === 0) {
          setProducts(response.products); // Set new products for refresh
        } else {
          setProducts((prevProducts) => [...prevProducts, ...response.products]); // Efficiently append new products
        }
        setMetaData({ limit: response.limit, start: response.skip, total: response.total });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (start === 0) {
        setIsRefreshing(false); // Reset refreshing flag after data fetching
      } else {
        setIsLoadingMore(false); // Reset loading flag after data fetching
      }
    }
  };

  useEffect(() => {
    getProducts(0, 10);
    getCategories();
  }, []); // Fetch initial products on component mount

  const handleLoadMore = async () => {
    if (!isLoadingMore && metaData.total > products.length) {
      const nextStart = metaData.start + metaData.limit;
      await getProducts(nextStart, metaData.limit);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <FlatList
            data={categories}
            estimatedItemSize={30}
            contentContainerStyle={{ paddingBottom:10}}
            horizontal={true}
            renderItem={({ item }) => <Category category={item} onPress={onCategory} />}
          />
        <FlashList data={products}
          ListHeaderComponent={()=><Text style={styles.header}>Products list</Text>}
          estimatedItemSize={100}
          ListEmptyComponent={()=><Text>no products found</Text>}
          renderItem={({ item }) => <ProductCard product={item} />}
          scrollEnabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
  },
  scrollView: {
    flex: 9,
    width: '100%',
  },
});

export default Home;
