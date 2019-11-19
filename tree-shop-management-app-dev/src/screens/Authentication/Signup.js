import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  KeyboardAwareScrollView,
  RoundInput,
  Text,
  TouchableButton
} from '../../components';
import { Images, Colors, Metrics } from '../../themes';
import { pop } from '../../navigation/navigationConfig/serviceActions';
import LoginActions from '../../redux/LoginRedux/actions';
class Signup extends React.Component {
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

  onSignUp = () => {
    if (!this.fullname.getText()) {
      this.fullname.focus();
      return null;
    }
    if (!this.username.getText()) {
      this.username.focus();
      return null;
    }
    if (!this.phone.getText()) {
      this.phone.focus();
      return null;
    }
    if (!this.address.getText()) {
      this.address.focus();
      return null;
    }
    if (!this.email.getText()) {
      this.email.focus();
      return null;
    }
    if (!this.password.getText()) {
      this.password.focus();
      return null;
    }
    const data = {
      username: this.username.getText(),
      password: this.password.getText(),
      fullname: this.fullname.getText(),
      address: this.address.getText(),
      email: this.email.getText(),
      phone: this.phone.getText(),
      roleId: 2,
      dates: '2019-06-06'
    };
    this.props.signup(data);
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <Image source={Images.logo} resizeMode="cover" style={styles.logo} />
          <View style={styles.inputContainer}>
            <RoundInput
              ref={ref => {
                this.fullname = ref;
              }}
              isRequired
              validateType="username"
              errorMessage={'Full name is invalid'}
              placeholder={'Full name'}
              onSubmitEditing={() => {
                this.focusNextField('username');
              }}
            />

            <RoundInput
              ref={ref => {
                this.username = ref;
              }}
              isRequired
              validateType="username"
              errorMessage={'Username is invalid'}
              placeholder={'Username'}
              onSubmitEditing={() => {
                this.focusNextField('phone');
              }}
            />

            <RoundInput
              ref={ref => {
                this.phone = ref;
              }}
              isRequired
              validateType="phone"
              errorMessage={'Phone is invalid'}
              placeholder={'Phone'}
              onSubmitEditing={() => {
                this.focusNextField('address');
              }}
            />

            <RoundInput
              ref={ref => {
                this.address = ref;
              }}
              isRequired
              validateType="empty"
              errorMessage={'Address is invalid'}
              placeholder={'Address'}
              onSubmitEditing={() => {
                this.focusNextField('email');
              }}
            />

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
            type="light"
            sizeType="medium"
            underline
            color={Colors.black}
            style={styles.txtBackToLogin}
            onPress={() => pop(this.props.componentId)}
          >
            {'Back to login'}
          </Text>
          <TouchableButton
            title={'Sign Up'}
            buttonColor={Colors.primary}
            style={styles.buttonSignUp}
            onPress={this.onSignUp}
            // onPress={() => pop(this.props.componentId)}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  signup: data => dispatch(LoginActions.signUp(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20
  },
  inputContainer: {
    marginHorizontal: 20
  },
  txtBackToLogin: {
    textAlign: 'center',
    paddingTop: 8
  },
  buttonSignUp: {
    margin: 20,
    width: Metrics.screenWidth - 30,
    alignSelf: 'center',
    borderRadius: 50
  }
});
