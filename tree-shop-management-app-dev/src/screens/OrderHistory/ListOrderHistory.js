import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import OrderHistoryActions from '../../redux/OrderHistoryRedux/actions';
import { Colors } from '../../themes';
import { Touchable } from '../../components/index';
import { Text, EmptyView } from '../../components/index';
import { pushScreen } from '../../navigation/navigationConfig/serviceActions';

class ListOrderHistory extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'ListOrderHistory'
        }
      }
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onPressItem = item => {
    console.log('item', item);
    this.props.getOrderHistoryData(this.props.userData.id);
    pushScreen(
      this.props.componentId,
      'app.orderHistoryDetail',
      { orderDetail: item },
      { topBarTitle: 'Order Detail' }
    );
  };

  renderItem = ({ item }) => {
    const productId = item.data.map(item => item.prodId);
    const filterProduct = this.props.productData.filter(
      item => item.id === productId[0]
    );
    const isDisable = item.data.map(item => item.isDisable)[0] === true;
    return (
      <View style={styles.itemContainer}>
        {isDisable ? (
          <View style={styles.isDisable}>
            <Text style={{ color: Colors.white, paddingVertical: 5, left: 5 }}>
              Order ID: {item.title}
            </Text>
          </View>
        ) : (
          <View style={styles.textId}>
            <Text style={{ color: Colors.white, paddingVertical: 5, left: 5 }}>
              Order ID: {item.title}
            </Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.image}>
            <Image
              source={{ uri: filterProduct[0].image }}
              style={{ height: 140, width: 100 }}
            />
          </View>
          <View style={styles.info}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18 }}>{filterProduct[0].name}</Text>
            </View>

            <View style={styles.quantityContainer}>
              <View>
                <Text>Quantity: {item.data.map(item => item.quantity)[0]}</Text>
              </View>
              <View>
                <Text>{item.data.map(item => item.price)[0]} VND</Text>
              </View>
            </View>

            <View style={styles.totalContainer}>
              <Text style={{ fontSize: 15 }}>Total payment:</Text>
              <Text style={{ fontWeight: 'bold' }}>
                {item.data.map(item => item.amount)[0]} VND
              </Text>
            </View>
          </View>
        </View>

        <Touchable onPress={() => this.onPressItem(item)}>
          {isDisable ? (
            <View style={styles.buttonSeeMoreDisable}>
              <Text style={{ textAlign: 'center', color: 'white' }}>
                See more
              </Text>
            </View>
          ) : (
            <View style={styles.buttonSeeMore}>
              <Text style={{ textAlign: 'center', color: '#616161' }}>
                See more
              </Text>
            </View>
          )}
        </Touchable>
      </View>
    );
  };

  renderEmptyView = () => {
    const data = this.props.orderHistoryData === {};
    return <EmptyView title={data ? 'D' : "Don't have any order"} />;
  };

  render() {
    const object1 = this.props.orderHistoryData;
    var convertData = Object.keys(
      _.zipObject(Object.keys(object1), Object.values(object1))
    ).map(function(key) {
      return [
        Number(key),
        _.zipObject(Object.keys(object1), Object.values(object1))[key]
      ];
    });

    var newData = convertData.map(function(x) {
      return {
        title: x[0],
        data: x[1]
      };
    });

    const orderHistoryData = _.orderBy(newData, ['title'], ['desc']);
    console.log('====================================');
    console.log(orderHistoryData);
    console.log('====================================');
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 15
            }}
          >
            <FlatList
              data={orderHistoryData}
              renderItem={this.renderItem}
              ListEmptyComponent={this.renderEmptyView}
              keyExtractor={item => `${item.data.map(item => item.orderId)}`}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userData: state.login.data,
  productData: state.product.data,
  orderHistoryData: state.orderHistory.data
});

const mapDispatchToProps = dispatch => ({
  getOrderHistoryData: data =>
    dispatch(OrderHistoryActions.fetchOrderHistory(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOrderHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: { flex: 1, paddingVertical: 15 },
  image: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    left: 5,
    marginVertical: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: 'white'
  },

  buttonSeeMore: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#d5edc5',
    top: 10
  },
  isDisable: {
    flex: 1,
    backgroundColor: '#787878',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5
  },
  buttonSeeMoreDisable: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#c9c9c9',
    top: 10
  },
  textId: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    top: 20
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#b0b0b0',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
