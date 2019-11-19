import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/rnstandard';
import MemberActions from '../../redux/MemberRedux/actions';
import { Colors, Metrics } from '../../themes';
import { Touchable } from '../../components/index';
import MemberRow from './MemberRow';
import { EmptyView } from '../../components/index';
import { getMemberListSelector } from '../../redux/MemberRedux/selectors';
import FirebaseNotification from '../../FirebaseNotification';
import { pushScreen } from '../../navigation/navigationConfig/serviceActions';

class ListProduct extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'Tree of Life'
        }
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
    return <MemberRow item={item} key={index} onPressItem={this.onPressItem} />;
  };

  renderLoading() {
    return (
      <View style={[styles.absoluteLoading]}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  onMoveToCart = () => {
    pushScreen(this.props.componentId, 'app.cart', {}, { topBarTitle: 'Cart' });
  };

  renderEmptyView = () => {
    const { loading } = this.props;
    return <EmptyView title={loading ? 'Loading' : 'Empty'} />;
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

    if (len && isEndOfList) {
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
        <FirebaseNotification />
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

        <TouchableOpacity
          Opacity={0.7}
          onPress={this.onMoveToCart}
          style={styles.TouchableOpacityStyle}
        >
          <Image
            source={require('../../assets/img/shopping-cart.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: getMemberListSelector(state, props),
  total: state.member.memberTotal,
  reduxPage: state.member.memberPage,
  loading: state.member.loading,
  userData: state.login.data
});

const mapDispatchToProps = dispatch => ({
  updatePage: page => dispatch(MemberActions.updatePage(page)),
  refreshPage: isNextPage => dispatch(MemberActions.getMemberList(isNextPage)),
  getNextPage: isNextPage => dispatch(MemberActions.getMemberList(isNextPage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
  buttonCart: {
    position: 'absolute',
    bottom: 15,
    borderRadius: 50,
    width: 55,
    height: 55,
    right: 15,
    backgroundColor: Colors.primary
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.primary,
    borderRadius: 50
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    position: 'absolute'
  }
});
