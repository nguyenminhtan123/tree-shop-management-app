import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Touchable,
  Text,
  TouchableButton,
  ChangeQuantityButton
} from '../../components/index';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Colors } from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';
import CartActions from '../../redux/CartRedux/actions';

import {
  pushScreen,
  showInAppNotification,
  showConfirmAlert
} from '../../navigation/navigationConfig/serviceActions';

class CartMemberRow extends React.Component {
  onPressItem = () => {
    const { item, onPressItem } = this.props;
    onPressItem(item);
  };

  renderImage() {
    const { item } = this.props;
    return (
      <View style={styles.image}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 100,
            height: 140
          }}
        />
      </View>
    );
  }

  plusQuantity = prodId => {
    const data = {
      userId: this.props.userData.id,
      requestData: {
        prodId: prodId
      }
    };
    this.props.plusquantity(data);
  };

  minusQuantity = prodId => {
    const data = {
      userId: this.props.userData.id,
      requestData: {
        prodId: prodId
      }
    };
    this.props.minusquantity(data);
  };

  onOrder = () => {
    const data = this.props.userData.id;

    this.props.order(data);
  };

  onDelete = () => {
    const { item } = this.props;
    const data = {
      userId: this.props.userData.id,
      prodId: item.prodId
    };
    showConfirmAlert('Cart', 'Delete this product to the Cart?', [
      {
        text: 'No'
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.deleteProduct(data);
        }
      }
    ]);
  };

  renderQuantity() {
    const { item } = this.props;
    return (
      <View style={styles.quantityStyle}>
        <ChangeQuantityButton
          title={'-'}
          textStyle={{
            color: 'black',
            fontSize: 40,
            textAlignVertical: 'center'
          }}
          style={{
            width: 20,
            height: 30
          }}
          onPress={() => this.minusQuantity(item.prodId)}
        />
        <Text
          style={{
            fontSize: 15,
            paddingHorizontal: 10,
            width: 40,
            textAlign: 'center'
          }}
        >
          {item.quantity}
        </Text>
        <ChangeQuantityButton
          title={'+'}
          textStyle={{
            color: 'black',
            fontSize: 25,
            textAlignVertical: 'center'
          }}
          style={{
            width: 20,
            height: 30
          }}
          onPress={() => this.plusQuantity(item.prodId)}
        />
      </View>
    );
  }

  render() {
    const { item } = this.props;
    return (
      //onPress={this.onPressItem}
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          {this.renderImage(item.image)}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingHorizontal: 15,
              marginVertical: 25
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {item.name}
              </Text>

              <Text style={{ color: '#9298a1' }}>{item.fullname}</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Icon
                  name="ios-pricetags"
                  color="#ccc"
                  size={20}
                  style={{ marginHorizontal: 5 }}
                />
                <Text>{item.price}</Text>
              </View>
              {this.renderQuantity(item.quantity, item.prodId)}
            </View>
          </View>
          <View style={{ paddingVertical: 11 }}>
            <ChangeQuantityButton
              title={'x'}
              textStyle={{
                color: '#9298a1',
                fontSize: 20,
                textAlignVertical: 'center'
              }}
              style={{
                width: 30,
                height: 30
              }}
              onPress={this.onDelete}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({ userData: state.login.data });

const mapDispatchToProps = dispatch => ({
  plusquantity: data => dispatch(CartActions.plusQuantity(data)),
  minusquantity: data => dispatch(CartActions.minusQuantity(data)),
  order: data => dispatch(CartActions.order(data)),
  deleteProduct: data => dispatch(CartActions.deleteProduct(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartMemberRow);

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start'
  },
  quantityStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'center',
    marginLeft: '35%'
  },
  priceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 70,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    paddingVertical: 10,
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
  buttonOrder: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});
