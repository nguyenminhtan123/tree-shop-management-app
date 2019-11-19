import React from 'react';
import { StyleSheet, Image, Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  KeyboardAwareScrollView,
  RoundInput,
  TouchableButton
} from '../../components';
import { Images, Colors, Metrics } from '../../themes';
import { pushScreen } from '../../navigation/navigationConfig/serviceActions';
import LoginActions from '../../redux/LoginRedux/actions';

class ResetPassword extends React.Component {
  static options(passProps) {
    return {
      topBar: {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  onResetPassword = () => {
    if (!this.newPassword.getText()) {
      this.newPassword.focus();
      return null;
    }
    if (!this.confirmPassword.getText()) {
      this.confirmPassword.focus();
      return null;
    }
    const data = {
      userId: this.props.userData.id,
      password: {
        newPassword: this.newPassword.getText(),
        confirmPassword: this.confirmPassword.getText()
      }
    };

    this.props.resetPassword(data);
  };
  onMoveToConfirmCode = () => {};
  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <Image source={Images.logo} resizeMode="cover" style={styles.logo} />
          <View style={styles.inputContainer}>
            <RoundInput
              ref={ref => {
                this.newPassword = ref;
              }}
              isRequired
              validateType="password"
              errorMessage={'Password is invalid'}
              placeholder={'New Password'}
              secureTextEntry
              onSubmitEditing={() => {
                this.focusNextField('confirmPassword');
              }}
            />

            <RoundInput
              ref={ref => {
                this.confirmPassword = ref;
              }}
              isRequired
              validateType="password"
              errorMessage={'Password is invalid'}
              placeholder={'Confirm Password'}
              secureTextEntry
            />
          </View>
          <TouchableButton
            title={'Submit'}
            buttonColor={Colors.primary}
            style={styles.buttonResetPassword}
            onPress={this.onResetPassword}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ userData: state.login.forgotPasswordData });

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(LoginActions.resetPassword(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

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
  buttonResetPassword: {
    width: Metrics.screenWidth - 50,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 50
  }
});
