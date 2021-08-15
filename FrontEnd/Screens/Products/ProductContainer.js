import React, { useState, useEffect } from 'react' 
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native'

import ProductList from './ProductList';

const data = require('../../assets/data/products.json');


const ProductContainer = () => {

    const [ products, setProducts ] = useState([]);
    useEffect(() => {
        setProducts(data);
        return () => {
            setProducts([])
        }
    }, [])

    return (
        <View style={styles.container}>
          <Text>Product Container</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={products}
              numColumns={2}
              renderItem={({ item }) => (
                <ProductList key={item.brand} item={item} />
              )}
              keyExtractor={(item) => item.brand}
            />
          </View>
        </View>
      )
    }

    const styles = StyleSheet.create({
        container: {
          flexWrap: 'wrap',
          backgroundColor: 'gainsboro',
        },
        listContainer: {
          width: '100%',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          backgroundColor: 'gainsboro',
        },
        center: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      })

export default ProductContainer;