import React from 'react';
import { StyleSheet, Image, Keyboard, View, Text } from 'react-native';
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

class ConfirmCode extends React.Component {
  static options(passProps) {
    return {
      topBar: {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.checkConfirmCode !== this.props.checkConfirmCode) {
      pushScreen(
        this.props.componentId,
        'app.resetPassword',
        {},
        { topBarTitle: 'Reset Password' }
      );
    }
  }

  onConfirm = () => {
    if (!this.codeConfirm.getText()) {
      this.codeConfirm.focus();
      return null;
    }
    const data = {
      userId: this.props.userData.id,
      codeConfirm: {
        codeConfirm: this.codeConfirm.getText()
      }
    };

    this.props.confirmCode(data);
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
                this.codeConfirm = ref;
              }}
              isRequired
              validateType="empty"
              errorMessage={'Confirm code is invalid'}
              placeholder={'Confirm Code'}
            />
          </View>
          <View />
          <TouchableButton
            title={'Submit'}
            buttonColor={Colors.primary}
            style={styles.buttonConfirm}
            onPress={this.onConfirm}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.login.forgotPasswordData,
  checkConfirmCode: state.login.confirmCode
});

const mapDispatchToProps = dispatch => ({
  confirmCode: data => dispatch(LoginActions.confirmCode(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCode);

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
  buttonConfirm: {
    width: Metrics.screenWidth - 50,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 50
  }
});
