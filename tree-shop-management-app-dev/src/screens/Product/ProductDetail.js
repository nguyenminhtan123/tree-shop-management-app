import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  pushScreen,
  showInAppNotification,
  showConfirmAlert
} from '../../navigation/navigationConfig/serviceActions';
import { ViewMoreText, TouchableButton } from '../../components';
import { iconsMap } from '../../utils/appIcons';
import AddToCartActions from '../../redux/CartRedux/actions';
import { Colors } from '../../themes';
import { getCartMemberListSelector } from '../../redux/CartRedux/selectors';
class ProductDetail extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'Product Detail'
        },
        backButton: {
          icon: iconsMap['ic-back'],
          visible: true,
          color: Colors.white
        }
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      language: 'vi',
      text: '',
      currentTabIndex: 0,
      count: 0
    };
  }

  componentDidMount() {}

  onAddToCart = () => {
    const data = {
      userId: this.props.userData.id,
      requestData: {
        prodId: this.props.product.id
      }
    };
    const outOfStock = this.props.product.quantity === 0;
    if (outOfStock) {
      showInAppNotification(
        'Product Detail',
        'The quantity is not available',
        'error'
      );
    } else {
      showConfirmAlert('Product Detail', 'Add this product to the Cart?', [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.addToCart(data);
            pushScreen(
              this.props.componentId,
              'app.cart',
              {},
              { topBarTitle: 'Cart' }
            );
          }
        }
      ]);
    }
  };

  onMoveToCart = () => {
    pushScreen(this.props.componentId, 'app.cart', {}, { topBarTitle: 'Cart' });
  };

  renderImage() {
    return (
      <View style={styles.image}>
        <Image
          source={{ uri: this.props.product.image }}
          style={{
            width: 200,
            height: 250
          }}
        />
      </View>
    );
  }

  renderDescription() {
    return (
      <ViewMoreText
        numberOfLines={4}
        textStyle={{ paddingHorizontal: 10 }}
        textViewMoreStyle={{ paddingLeft: 20 }}
        textViewLessStyle={{
          paddingLeft: 20,
          height: 100,
          textAlignVertical: 'top'
        }}
        description={this.props.product.description}
        textStyle={styles.descriptionStyle}
      />
    );
  }

  renderQuantity() {
    const outOfStock = this.props.product.quantity === 0;
    return (
      <View style={styles.quantityStyle}>
        <Icon name="ios-leaf" color="#ccc" size={22} />
        {!outOfStock ? (
          <Text style={{ paddingHorizontal: 5 }}>
            {this.props.product.quantity} cây
          </Text>
        ) : (
          <Text style={{ paddingHorizontal: 5 }}>Hết hàng</Text>
        )}
      </View>
    );
  }

  renderPrice() {
    const isPromote = this.props.product.promotePrice === 0;
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <View style={styles.priceStyle}>
          <Icon name="ios-pricetags" color="#ccc" size={20} />
          {isPromote ? (
            <Text style={{ paddingHorizontal: 5 }}>
              {this.props.product.price} VND
            </Text>
          ) : (
            <Text style={{ paddingHorizontal: 5 }}>
              {this.props.product.promotePrice} VND
            </Text>
          )}
        </View>
        {isPromote ? (
          <Text />
        ) : (
          <View style={styles.priceStyle}>
            <Text style={styles.promotePrice}>
              {this.props.product.price} VND
            </Text>
          </View>
        )}
      </View>
    );
  }

  renderCategory() {
    const { product, category } = this.props;

    const filterItem = category[product.prodTypeId];

    return (
      <View style={styles.categoryContainer}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={styles.category}>{filterItem && filterItem.name}</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={styles.category}>Cây xanh</Text>
        </View>
      </View>
    );
  }

  render() {
    const hasProduct =
      this.props.data.some(item => item.prodId === this.props.product.id) ===
      true;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.productDetail}>
            {this.renderImage()}
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {this.props.product.name}
              </Text>
            </View>

            <Text style={{ color: '#9298a1' }}>
              {this.props.product.fullname}
            </Text>

            <View style={styles.priceContainer}>
              {this.renderQuantity()}
              {this.renderPrice()}
            </View>
            {this.renderCategory()}
            {this.renderDescription()}
          </View>
        </ScrollView>
        {hasProduct ? (
          <TouchableButton
            title="Go To Cart"
            buttonColor={Colors.primary}
            style={styles.buttonAdd}
            onPress={this.onMoveToCart}
          />
        ) : (
          <TouchableButton
            title="Add to cart"
            buttonColor={Colors.primary}
            style={styles.buttonAdd}
            onPress={this.onAddToCart}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = (state, props) => ({
  data: getCartMemberListSelector(state, props),
  category: state.listCategory.data,
  userData: state.login.data,
  productsInCartData: state.addToCart.cartMemberData
});

const mapDispatchToProps = dispatch => ({
  addToCart: data => dispatch(AddToCartActions.addToCart(data))
  // fetchProductsInCart: data =>
  //   dispatch(AddToCartActions.fetchProductsInCart(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);

const styles = StyleSheet.create({
  buttonAdd: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  container: {
    flex: 1
  },
  descriptionStyle: {
    textAlign: 'justify',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  productDetail: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 70,
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  category: {
    fontSize: 12,
    borderColor: '#9298a1',
    borderWidth: 1,
    borderRadius: 3,
    color: '#9298a1',
    borderEndWidth: 5,
    borderStartWidth: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30
  },
  image: {
    paddingVertical: 15,
    marginVertical: 15,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: 'white',
    paddingHorizontal: 5
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
    paddingHorizontal: 35
  },
  promotePrice: {
    paddingHorizontal: 5,
    textDecorationLine: 'line-through',
    color: '#9298a1'
  }
});
