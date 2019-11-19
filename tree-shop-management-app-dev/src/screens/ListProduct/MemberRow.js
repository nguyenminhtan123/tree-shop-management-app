import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Touchable, Text } from '../../components/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MemberRow extends React.PureComponent {
  onPressItem = () => {
    const { item, onPressItem } = this.props;
    onPressItem(item);
  };

  renderPrice() {
    const { item } = this.props;
    const isPromote = item.promotePrice === 0;
    return (
      <View style={styles.priceContainer}>
        <View style={styles.priceStyle}>
          <Icon name="ios-pricetags" color="#ccc" size={20} />
          {isPromote ? (
            <Text style={{ paddingHorizontal: 5 }}>{item.price} VND</Text>
          ) : (
            <Text style={{ paddingHorizontal: 5 }}>
              {item.promotePrice} VND
            </Text>
          )}
        </View>
        {isPromote ? (
          <Text />
        ) : (
          <View style={styles.priceStyle}>
            <Text style={styles.textPrice}>{item.price} VND</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { item } = this.props;
    const outOfStock = item.quantity === 0;
    return (
      <Touchable onPress={this.onPressItem}>
        <View style={styles.itemStyle}>
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.imageStyle} />

            <View style={styles.infoContainer}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {item.name}
                </Text>
                <Text style={{ color: '#9298a1' }}>{item.fullname} </Text>
              </View>

              <View style={{ flex: 1, paddingVertical: 10 }}>
                <Text numberOfLines={3} style={{ color: '#646973' }}>
                  {item.description}
                </Text>
              </View>

              <View style={styles.quantityContainer}>
                <View style={styles.priceStyle}>
                  <Icon name="ios-leaf" color="#ccc" size={22} />
                  {!outOfStock ? (
                    <Text style={{ paddingHorizontal: 5 }}>
                      {item.quantity} cây
                    </Text>
                  ) : (
                    <Text style={{ paddingHorizontal: 5 }}>Hết hàng</Text>
                  )}
                </View>
                {this.renderPrice()}
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}
const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: '100%'
  },
  priceStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  textPrice: {
    paddingHorizontal: 5,
    textDecorationLine: 'line-through',
    color: '#9298a1'
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
});
