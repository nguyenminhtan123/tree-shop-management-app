import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  showConfirmAlert,
  startTabBasedApp
} from '../../navigation/navigationConfig/serviceActions';
import {
  Container,
  TouchableButton,
  RoundInput,
  KeyboardAwareScrollView
} from '../../components';
import { Colors, Images } from '../../themes';
import UserActions from '../../redux/UserProfileRedux/actions';

import LoginActions from '../../redux/LoginRedux/actions';

class ChangePassword extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'Change Password'
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
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
    if (prevProps.changePasswordData !== this.props.changePasswordData) {
      showConfirmAlert('Change Password', 'Do you want to keep this session?', [
        {
          text: 'No',
          onPress: () => {
            this.props.logout();
          }
        },
        {
          text: 'Yes',
          onPress: () => {
            startTabBasedApp(listTabs);
          }
        }
      ]);
    }
  }

  componentDidMount() {}

  changePassword = () => {
    if (!this.oldPassword.getText()) {
      this.oldPassword.focus();
      return null;
    }
    if (!this.newPassword.getText()) {
      this.newPassword.focus();
      return null;
    }
    const data = {
      userId: this.props.userData.id,
      requestData: {
        password: this.oldPassword.getText(),
        newpass: this.newPassword.getText()
      }
    };

    this.props.changePassword(data);
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <Image source={Images.logo} resizeMode="cover" style={styles.logo} />
          <View style={styles.inputContainer}>
            <RoundInput
              ref={ref => {
                this.oldPassword = ref;
              }}
              isRequired
              placeholder={'Old Password'}
              secureTextEntry
              validateType="password"
              errorMessage={'Password must be at least 6 characters'}
              onSubmitEditing={() => {
                this.focusNextField('newPassword');
              }}
            />
            <RoundInput
              ref={ref => {
                this.newPassword = ref;
              }}
              isRequired
              placeholder={'New Password'}
              secureTextEntry
              validateType="password"
              errorMessage={'Password must be at least 6 characters'}
            />

            <TouchableButton
              title={'Submit'}
              buttonColor={Colors.primary}
              style={styles.buttonConfirm}
              onPress={this.changePassword}
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.login.data,
  changePasswordData: state.userProfile.token
});

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(UserActions.changePassword(data)),
  logout: () => dispatch(LoginActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  userProfile: {
    flex: 3
  },
  logo: { width: 150, height: 150, alignSelf: 'center', marginVertical: 15 },
  buttonConfirm: {
    width: '100%',
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 50
  }
});
