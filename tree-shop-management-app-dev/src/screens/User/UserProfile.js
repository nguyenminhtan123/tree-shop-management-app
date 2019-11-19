import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';

import {
  Container,
  TouchableButton,
  KeyboardAwareScrollView
} from '../../components';

import { iconsMap } from '../../utils/appIcons';
import UpdateActions from '../../redux/UserProfileRedux/actions';
import { Colors } from '../../themes';

class UserProfile extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        animate: true,
        title: {
          text: 'User Profile'
        },
        rightButtons: [
          {
            id: 'editUserProfile',
            icon: iconsMap['ios-create'],
            color: Colors.white
          }
        ]
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      fullName: props.userData.fullname,
      address: props.userData.address,
      phone: props.userData.phone,
      textStyle: 'styles.title'
    };
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
    if (buttonId === 'editUserProfile') {
      this.setState({
        editable: true,
        textStyle: 'styles.text'
      });
    }
  }

  onUpdate = () => {
    const data = {
      userId: this.props.userData.id,
      requestData: {
        fullname: this.state.fullName,
        address: this.state.address,
        phone: this.state.phone
      }
    };
    this.props.update(data);

    this.setState({
      editable: false
    });
    //this.props.fetchUserData(this.props.userData.id);
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.inputContainer}>
            <View style={styles.item}>
              <Text style={styles.title}>Full Name</Text>
              <View style={styles.textContainer}>
                <TextInput
                  editable={this.state.editable}
                  value={this.state.fullName}
                  onChangeText={text => this.setState({ fullName: text })}
                  style={[this.state.textStyle, styles.input]}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Address</Text>

              <View style={[styles.textContainer, styles.address]}>
                <TextInput
                  editable={this.state.editable}
                  value={this.state.address}
                  onChangeText={text => this.setState({ address: text })}
                  style={[this.state.textStyle, styles.input]}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Email</Text>
              <View style={styles.textContainer}>
                <Text style={styles.email}>{this.props.userData.email}</Text>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Phone</Text>
              <View style={styles.textContainer}>
                <TextInput
                  editable={this.state.editable}
                  value={this.state.phone}
                  onChangeText={text => this.setState({ phone: text })}
                  style={[this.state.textStyle, styles.input]}
                />
              </View>
            </View>
          </View>

          {this.state.editable && (
            <TouchableButton
              title="Update"
              buttonColor={Colors.primary}
              style={styles.updateButton}
              onPress={this.onUpdate}
            />
          )}
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.userProfile.data,
  orderData: state.orderHistory.data
});

const mapDispatchToProps = dispatch => ({
  update: data => dispatch(UpdateActions.updateUserProfile(data)),
  fetchUserData: data => dispatch(UpdateActions.fetchUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    marginHorizontal: 20,
    marginTop: 5,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: '#6e6e6e'
  },
  text: {
    fontSize: 18,
    color: '#3b3737'
  },
  email: {
    fontSize: 18,
    color: '#999999'
  },
  textContainer: {
    alignItems: 'flex-start'
  },
  input: {
    fontSize: 18
  },
  updateButton: {
    width: '50%',
    marginTop: 20,
    borderRadius: 50,
    alignSelf: 'center'
  },
  address: {
    marginLeft: 20
  }
});
