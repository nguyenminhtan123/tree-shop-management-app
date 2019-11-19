import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Colors, Metrics, Images } from '../../themes';
import IntroViewer from './IntroViewer';
import { Text, Swiper, TouchableButton } from '../../components';
import { pushScreen } from '../../navigation/navigationConfig/serviceActions';

class Intro extends Component {
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
    this.state = {};
  }

  goToSignIn = () => {
    pushScreen(
      this.props.componentId,
      'app.login',
      {},
      { topBarTitle: 'Sign In' }
    );
  };

  goToSignUp = () => {
    pushScreen(
      this.props.componentId,
      'app.signup',
      {},
      { topBarTitle: 'Sign Up' }
    );
  };

  render() {
    const INTROS = [
      {
        id: 1,
        imageSource: Images.logo,
        title:
          'Top-quality products in Vietnam, secure payment by cash or credit card'
      },
      {
        id: 2,
        imageSource: Images.logoHouse,
        title: 'Tree make your house become fresh and natural'
      },
      {
        id: 3,
        imageSource: Images.logo,
        title:
          'Top-quality products in Vietnam, secure payment by cash or credit card'
      }
    ];
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Swiper
            style={styles.wrapper}
            activeDotColor={Colors.primary}
            autoplay
          >
            {INTROS.map(item => {
              return <IntroViewer data={item} key={item.id} />;
            })}
          </Swiper>
        </View>
        <View style={styles.bottomContainer}>
          <Text
            type="light"
            color={Colors.black}
            sizeType="xMedium"
            style={styles.txtContinue}
          >
            {'Continue with'}
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableButton
              title={'Sign In'}
              style={styles.button}
              buttonColor={Colors.primary}
              onPress={this.goToSignIn}
            />
            <TouchableButton
              title={'Sign Up'}
              style={styles.button}
              buttonColor={Colors.primary}
              isOutlineMode
              onPress={this.goToSignUp}
            />
          </View>
          <Text
            type="light"
            color={Colors.black}
            sizeType="xMedium"
            style={styles.txtContinue}
            underline
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);

const styles = StyleSheet.create({
  wrapper: {},
  txtContinue: {
    textAlign: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    width: (Metrics.screenWidth - 30) / 2,
    borderRadius: 50
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'space-around'
  },
  topContainer: {
    flex: 2,
    backgroundColor: Colors.white
  }
});
