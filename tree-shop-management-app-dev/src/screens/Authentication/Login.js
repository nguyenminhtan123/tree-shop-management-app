import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  KeyboardAwareScrollView,
  RoundInput,
  Text,
  TouchableButton
} from '../../components';

import { Images, Colors, Metrics } from '../../themes';
import { pushScreen } from '../../navigation/navigationConfig/serviceActions';
import LoginActions from '../../redux/LoginRedux/actions';

class Login extends React.Component {
  static options(passProps) {
    return {
      topBar: {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  focusNextField(nextField) {
    this[nextField].focus();
  }

  onSignIn = () => {
    if (!this.email.getText()) {
      this.email.focus();
      return null;
    }
    if (!this.password.getText()) {
      this.password.focus();
      return null;
    }

    const data = {
      email: this.email.getText(),
      password: this.password.getText()
    };

    this.props.login(data);
  };

  onMoveToForgotPassword = () => {
    pushScreen(
      this.props.componentId,
      'app.forgotpassword',
      {},
      { topBarTitle: 'Forgot password' }
    );
  };

  render() {
    const { loading } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <Image source={Images.logo} resizeMode="cover" style={styles.logo} />
          <View style={styles.inputContainer}>
            <RoundInput
              ref={ref => {
                this.email = ref;
              }}
              isRequired
              validateType="email"
              errorMessage={'Email is invalid'}
              placeholder={'Email'}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
            />
            <RoundInput
              ref={ref => {
                this.password = ref;
              }}
              isRequired
              placeholder={'Password'}
              secureTextEntry
              validateType="password"
              errorMessage={'Password must be at least 6 characters'}
            />
          </View>
          <Text
            type="regular"
            sizeType="medium"
            underline
            color={Colors.primary}
            style={styles.txtForgotPass}
            onPress={this.onMoveToForgotPassword}
          >
            {'Forgot password'}
          </Text>
          <TouchableButton
            title="Sign in"
            buttonColor={Colors.primary}
            style={styles.buttonSignIn}
            onPress={this.onSignIn}
            loading={loading}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loginLoading
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(LoginActions.login(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20
  },
  txtForgotPass: {
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 8
  },
  buttonSignIn: {
    width: Metrics.screenWidth - 30,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 50
  }
});
