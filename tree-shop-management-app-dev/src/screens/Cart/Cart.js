import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { TouchableButton } from '../../components';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/rnstandard';
import { iconsMap } from '../../utils/appIcons';
import LoginActions from '../../redux/LoginRedux/actions';
import AppActions from '../../redux/AppRedux/actions';
import CartActions from '../../redux/CartRedux/actions';
import { Colors, Metrics } from '../../themes';
import { Touchable } from '../../components/index';
import CartMemberRow from './CartMemberRow';
import { Text, EmptyView } from '../../components/index';
import { getCartMemberListSelector } from '../../redux/CartRedux/selectors';
import OrderHistoryActions from '../../redux/OrderHistoryRedux/actions';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  pushScreen,
  showConfirmAlert,
  startTabBasedApp
} from '../../navigation/navigationConfig/serviceActions';

class Cart extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'Cart'
        },
        rightButtons: [
          {
            id: 'removeAll',
            icon: iconsMap['ios-trash'],
            color: Colors.white
          }
        ]
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      refreshing: false
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      itemVisiblePercentThreshold: 50
    };
    this.onEndReached = _.debounce(this.onEndReached, 1000);
    this.props.refreshPage(false);
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed({ buttonId }) {
    const data = this.props.userData.id;
    if (buttonId === 'removeAll') {
      showConfirmAlert('Cart', 'Delete all product in the Cart?', [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.deleteAllProduct(data);
          }
        }
      ]);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading && !prevState.refreshing && !prevState.isReady) {
      return {
        isReady: true,
        refreshing: false
      };
    }

    if (!nextProps.loading && prevState.refreshing) {
      return {
        refreshing: false
      };
    }

    return null;
  }

  onEndReached = e => {
    const { data, loading, total } = this.props;
    if (loading) return;

    const len = (data && data.length) || 0;
    if (len < 10) {
      return;
    }

    if (len < total) {
      this.props.getNextPage(true);
    }
  };

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const maxIndexItem = _.maxBy(viewableItems, 'index');
    if (!maxIndexItem) {
      return;
    }
    const maxIndex = maxIndexItem.index;
    const currentPage = Math.floor(maxIndex / 10);
    if (currentPage !== this.props.reduxPage) {
      this.props.updatePage(currentPage);
    }
  };

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props.refreshPage(false);
  };

  deleteAllProduct = () => {
    const data = this.props.userData.id;

    showConfirmAlert('Cart', 'Delete all product in the Cart?', [
      {
        text: 'No'
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.deleteAllProduct(data);
        }
      }
    ]);
  };

  rollToTop = () => {
    if (this.flatListRef) {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: 0
      });
    }
  };

  onPressItem = item => {
    pushScreen(
      this.props.componentId,
      'app.productDetail',
      { product: item },
      { topBarTitle: 'Product Detail' }
    );
  };

  renderItem = ({ item, index }) => {
    const id = this.props.userData.id;
    return (
      <CartMemberRow
        item={item}
        key={index}
        onPressItem={this.onPressItem}
        passProps={id}
      />
    );
  };

  renderLoading() {
    return (
      <View style={[styles.absoluteLoading]}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  onOrder = () => {
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
    startTabBasedApp(listTabs);
    const data = this.props.userData.id;
    this.props.order(data);

    //pushScreen(this.props.componentId, 'app.cart', {}, { topBarTitle: 'Cart' });
  };

  renderEmptyView = () => {
    const { loading } = this.props;
    return (
      <EmptyView
        title={loading ? 'Loading' : "Don't have any product in cart"}
      />
    );
  };

  renderSeperator = () => {
    return (
      <View
        style={{
          width: Metrics.screenWidth,
          height: 0.5,
          backgroundColor: Colors.divider
        }}
      />
    );
  };

  renderFooter = () => {
    if (this.state.refreshing) {
      return <View style={styles.loadMore} />;
    }

    const { total, data, loading } = this.props;
    if (loading) {
      return (
        <View style={styles.loadMore}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      );
    }

    const len = data && data.length;
    const isEndOfList = len === total;

    if (len > 5 && isEndOfList) {
      return (
        <Touchable onPress={this.rollToTop}>
          <View style={styles.loadMore}>
            <Icon
              name="ic-next"
              size={14}
              color={Colors.black}
              style={{ transform: [{ rotate: '-90deg' }] }}
            />
          </View>
        </Touchable>
      );
    }

    return <View style={styles.loadMore} />;
  };

  render() {
    if (!this.state.isReady) {
      return this.renderLoading();
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ paddingBottom: 30 }}>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
            data={this.props.data}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />
            }
            keyExtractor={item => `${item.id}`}
            renderItem={this.renderItem}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmptyView}
            ItemSeparatorComponent={this.renderSeperator}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.05}
            initialNumToRender={10}
            maxToRenderPerBatch={2}
            extraData={this.props.loading || this.props.total}
          />
        </View>
        <TouchableButton
          title="Order"
          buttonColor={Colors.primary}
          style={styles.buttonOrder}
          onPress={this.onOrder}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: getCartMemberListSelector(state, props),
  total: state.addToCart.cartMemberTotal,
  reduxPage: state.addToCart.cartMemberPage,
  loading: state.addToCart.loading,
  userData: state.login.data
});

const mapDispatchToProps = dispatch => ({
  updatePage: page => dispatch(CartActions.updatePage(page)),
  refreshPage: isNextPage => dispatch(CartActions.getCartList(isNextPage)),
  getNextPage: isNextPage => dispatch(CartActions.getCartList(isNextPage)),
  order: data => dispatch(CartActions.order(data)),
  deleteAllProduct: data => dispatch(CartActions.deleteAllProduct(data)),
  getOrderList: id => dispatch(OrderHistoryActions.fetchOrderHistory(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  absoluteLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadMore: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonOrder: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});
