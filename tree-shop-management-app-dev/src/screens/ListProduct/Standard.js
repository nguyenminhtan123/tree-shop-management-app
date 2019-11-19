import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Standard extends React.Component {
  static options(passProps) {
    return {
      topBar: {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Standard);

const styles = StyleSheet.create({});
