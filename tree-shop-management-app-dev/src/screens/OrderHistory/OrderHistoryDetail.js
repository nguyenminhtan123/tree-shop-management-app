import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SectionList,
  ScrollView,
  Image
} from 'react-native';
import { TouchableButton, ChangeQuantityButton } from '../../components';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/rnstandard';
import { iconsMap } from '../../utils/appIcons';
import OrderHistoryActions from '../../redux/OrderHistoryRedux/actions';
import { Colors, Metrics } from '../../themes';
import { Touchable } from '../../components/index';

import { Text, EmptyView } from '../../components/index';
import {
  startSingleApp,
  startTabBasedApp
} from '../../navigation/navigationConfig/serviceActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  pushScreen,
  showConfirmAlert
} from '../../navigation/navigationConfig/serviceActions';
import moment from 'moment';

class OrderHistoryDetail extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'OrderHistoryDetail'
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      status: true
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onCancel = () => {
    const listTabs = [
      {
        componentName: 'app.listProduct',
        passProps: {},
        tabName: 'Home',
        tabIcon: 'ic-home'
      },
      {
        componentName: 'app.listOrderHistory',
        passProps: {},
        tabName: 'Order History',
        tabIcon: 'ios-today'
      },
      {
        componentName: 'app.sidemenu',
        passProps: {},
        tabName: 'Profile',
        tabIcon: 'ic-user'
      }
    ];
    const orderId = this.props.orderDetail.title;
    showConfirmAlert('Cancel Order', 'Are you sure to cancel this order?', [
      {
        text: 'No'
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.cancelOrder(orderId);
          startTabBasedApp(listTabs);
        }
      }
    ]);
  };

  renderItem = ({ item }) => {
    const productId = item.prodId;
    const filterProduct = this.props.productData.filter(
      item => item.id === productId
    );

    return (
      <View style={{ flex: 1, bottom: 5 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <View style={styles.image}>
              <Image
                source={{ uri: filterProduct.map(item => item.image)[0] }}
                style={{ height: 140, width: 100 }}
              />
            </View>
            <View style={styles.info}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>
                  {filterProduct.map(item => item.name)}
                </Text>
                <Text style={{ fontSize: 12, color: '#b0b0b0' }}>
                  {filterProduct.map(item => item.fullname)}
                </Text>
              </View>
              <View style={styles.quantity}>
                <View>
                  <Text>Quantity: {item.quantity}</Text>
                </View>
                <View>
                  <Text>{item.price} VND</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderEmptyView = () => {
    const { loading } = this.props;
    return <EmptyView title={loading ? 'Loading' : "Don't have any order"} />;
  };

  render() {
    const isDisable =
      this.props.orderDetail.data.map(item => item.isDisable)[0] === true;
    const isConfirm =
      this.props.orderDetail.data.map(item => item.status)[0] === 1;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.subContainer}>
            {isConfirm ? (
              <View style={styles.confirmStatus}>
                <Text style={{ color: 'white' }}>Order confirmed</Text>
              </View>
            ) : (
              <View />
            )}
            {!isDisable && !isConfirm ? (
              <View style={styles.processStatus}>
                <Text>Processing</Text>
              </View>
            ) : (
              <View />
            )}

            <FlatList
              data={this.props.orderDetail.data}
              renderItem={this.renderItem}
              keyExtractor={item => `${item.name}`}
            />
            <View style={styles.address}>
              <View>
                <Text>Address:</Text>
              </View>
              <View>
                <Text>{this.props.userProfile.address}</Text>
              </View>
            </View>

            <View style={styles.dateContainer}>
              <View>
                <Text>Order Date:</Text>
              </View>
              <View>
                <Text>
                  {moment(
                    this.props.orderDetail.data.map(item => item.date)[0]
                  ).format('DD/MM/YYYY hh:mm')}
                </Text>
              </View>
            </View>
            <View style={styles.totalPayment}>
              <View>
                <Text style={styles.textTotalPayment}>Total payment:</Text>
              </View>
              <View>
                <Text style={styles.textTotalPayment}>
                  {this.props.orderDetail.data.map(item => item.amount)[0]} VND
                </Text>
              </View>
            </View>
            {isDisable ? (
              <View style={styles.cancelStatus}>
                <Text style={styles.textCancelStatus}>
                  Order has been canceled
                </Text>
              </View>
            ) : (
              <View />
            )}
            {isDisable || isConfirm ? (
              <View />
            ) : (
              <TouchableButton
                title="Cancel Order"
                buttonColor={Colors.primary}
                style={styles.buttonSignIn}
                onPress={this.onCancel}
                isOutlineMode={true}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userData: state.login.data,
  userProfile: state.userProfile.data,
  productData: state.product.data
});

const mapDispatchToProps = dispatch => ({
  cancelOrder: data => dispatch(OrderHistoryActions.cancelOrder(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistoryDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  buttonOrder: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  image: {
    paddingVertical: 5,
    left: 5,
    marginVertical: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: 'white',
    paddingHorizontal: 5
  },
  buttonSignIn: {
    width: '50%',
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 50,
    bottom: 0
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 15,
    top: 20
  },
  cancelStatus: {
    borderWidth: 1,
    borderColor: '#787878',
    backgroundColor: '#dedcdc',
    height: 50,
    width: '75%',
    alignSelf: 'center',
    borderRadius: 50,
    marginVertical: 10
  },
  textCancelStatus: {
    fontSize: 15,
    color: '#787878',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15
  },
  subContainer: {
    top: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    bottom: 15
  },
  totalPayment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#b0b0b0'
  },
  address: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#b0b0b0'
  },
  confirmStatus: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30
  },
  processStatus: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#c9c9c9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30
  },
  textTotalPayment: { fontSize: 18, fontWeight: 'bold' },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  quantity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 15
  }
});
