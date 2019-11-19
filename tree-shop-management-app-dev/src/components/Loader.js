import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { isIOS } from '../utils/functions';
import { Colors } from '../themes';

const Loader = props => {
  const { loading, loadingColor, ...attributes } = props;

  return (
    <Modal
      transparent
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={loadingColor}
          />
        </View>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  loadingColor: PropTypes.string
};

Loader.defaultProps = {
  loading: false,
  loadingColor: Colors.primary
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: isIOS ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;
