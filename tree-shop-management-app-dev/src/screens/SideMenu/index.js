import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Share,
  Image,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { Text, RowDirect } from '../../components';
import { Colors } from '../../themes';
import {
  pushScreen,
  showConfirmAlert
} from '../../navigation/navigationConfig/serviceActions';

import LoginActions from '../../redux/LoginRedux/actions';

class SideMenu extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      avatar:
        'https://zmp3-photo-fbcrawler.zadn.vn/avatars/e/e/ee58fcc0ff45002b8d416bd7685809ce_1487040461.jpg'
    };
  }

  onAvatarChange = e => {
    this.setState({ avatar: e });
  };

  goToProfile = () => {
    pushScreen(
      this.props.componentId,
      'app.userProfile',
      {},
      {
        topBarTitle: 'User Profile'
      }
    );
  };

  goToChangePassword = () => {
    pushScreen(
      this.props.componentId,
      'app.changePassword',
      {},
      {
        topBarTitle: 'Change Password'
      }
    );
  };

  showConfirmAlert = () => {
    showConfirmAlert('Rating', 'You are totally into this app?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Select'
      }
    ]);
  };

  showFeedbackPopup = () => {};

  logout = () => {
    showConfirmAlert('Logout', 'Are you sure to logout', [
      {
        text: 'Cancel'
      },
      {
        text: 'Submit',
        onPress: () => {
          this.props.logout();
        }
      }
    ]);
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://cdn2.hercampus.com/styles/hcxo_tile_standard/s3/hero-images/2018/11/10/274292f1-corgi.jpg?timestamp=1541912810'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.safeAreaView}>
          <ScrollView>
            <View style={styles.headerContainer}>
              <ImageBackground
                style={{ flex: 1 }}
                source={{
                  uri:
                    'https://cdn2.hercampus.com/styles/hcxo_tile_standard/s3/hero-images/2018/11/10/274292f1-corgi.jpg?timestamp=1541912810'
                }}
                blurRadius={3}
              >
                <View style={styles.profileContainer}>
                  <View>
                    <Image
                      source={{
                        uri:
                          'https://cdn2.hercampus.com/styles/hcxo_tile_standard/s3/hero-images/2018/11/10/274292f1-corgi.jpg?timestamp=1541912810'
                      }}
                      style={styles.avatar}
                    />
                  </View>

                  <View>
                    <Text type="bold" color={Colors.white} sizeType="large">
                      {this.props.userData.fullname}
                    </Text>
                    <Text color={Colors.white} style={{ textAlign: 'center' }}>
                      {this.props.userData.phone}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <RowDirect
              rowTitle="Personal Information"
              onPress={this.goToProfile}
            />
            <RowDirect
              rowTitle="Change password"
              onPress={this.goToChangePassword}
            />
            <RowDirect rowTitle="Share app" onPress={this.onShare} />
            <RowDirect
              icon="ic-logout"
              rowTitle={'Logout'}
              onPress={this.logout}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ userData: state.userProfile.data });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 230,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.divider
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 100,
    margin: 10,
    borderColor: 'white',
    borderWidth: 1,
    bottom: 10
  },
  infoUser: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
