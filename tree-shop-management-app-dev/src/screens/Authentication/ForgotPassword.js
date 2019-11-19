import React from 'react';
import { StyleSheet, Image, Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  KeyboardAwareScrollView,
  RoundInput,
  TouchableButton,
  Text
} from '../../components';
import { Images, Colors, Metrics } from '../../themes';
import { pushScreen } from '../../navigation/navigationConfig/serviceActions';
import LoginActions from '../../redux/LoginRedux/actions';

class ForgotPassword extends React.Component {
  static options(passProps) {
    return {
      topBar: {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.checkForgot !== prevState.checkForgot) {
  //     return { checkForgot: nextProps.someValue };
  //   } else return null;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.checkForgot !== this.props.checkForgot) {
      pushScreen(
        this.props.componentId,
        'app.confirmcode',
        { email: this.email.getText() },
        { topBarTitle: 'Confirm Code' }
      );
    }
  }

  onForgot = () => {
    if (!this.email.getText()) {
      this.email.focus();
      return null;
    }
    const data = {
      email: this.email.getText()
    };

    this.props.forgotPassword(data);
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
                this.email = ref;
              }}
              isRequired
              validateType="email"
              errorMessage={'Email is invalid'}
              placeholder={'Email'}
              onSubmitEditing={() => {
                Keyboard.dismiss;
              }}
            />
          </View>
          <Text>{this.props.checkForgot.id}</Text>
          <TouchableButton
            title={'Submit'}
            buttonColor={Colors.primary}
            style={styles.buttonForgot}
            onPress={this.onForgot}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  checkForgot: state.login.forgotPasswordData
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: data => dispatch(LoginActions.forgotPassword(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

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
  buttonForgot: {
    width: Metrics.screenWidth - 50,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 50
  }
});
