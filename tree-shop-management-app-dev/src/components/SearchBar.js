import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/rnstandard';
import { Colors } from '../themes';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: Colors.darkGray
      // value: ''
    };
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }

  getText() {
    return this.input._lastNativeText ? this.input._lastNativeText : null;
  }

  onFocus() {
    const { onFocus } = this.props;
    this.setState({
      borderColor: Colors.primary
    });
    onFocus && onFocus();
  }

  onBlur = () => {
    const { onBlur } = this.props;
    onBlur && onBlur();

    this.setState({ borderColor: Colors.darkGray });
  };

  renderInput() {
    const { textInputStyle, onChangeText, onSearch } = this.props;

    const { borderColor } = this.state;

    return (
      <TextInput
        {...this.props}
        ref={ref => {
          this.input = ref;
        }}
        style={[
          styles.textInput,
          {
            borderColor: borderColor
          },
          textInputStyle
        ]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        keyboardAppearance="dark"
        selectTextOnFocus
        placeholder={'Search something'}
        onChange={event => {
          this.setState({ value: event.nativeEvent.text });
          onChangeText && onChangeText(event.nativeEvent.text);
        }}
        onSubmitEditing={onSearch}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    );
  }

  renderTextInput() {
    return (
      <View style={styles.containerInputStyle}>
        <View style={styles.iconSearch}>
          <Icon name="ic-search" color={this.state.borderColor} size={22} />
        </View>
        {this.renderInput()}
      </View>
    );
  }

  render() {
    const { containerStyle } = this.props;
    return <View style={containerStyle}>{this.renderTextInput()}</View>;
  }
}

SearchBar.propTypes = {
  containerStyle: PropTypes.any,
  textInputStyle: PropTypes.any,
  onChangeText: PropTypes.func,
  onSearch: PropTypes.func
};

SearchBar.defaultProps = {
  containerStyle: { marginVertical: 8 },
  textInputStyle: {}
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 48,
    paddingLeft: 42,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
    fontSize: 16
  },
  iconSearch: {
    position: 'absolute',
    top: 5,
    left: 10,
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInputStyle: {
    flexDirection: 'row'
  }
});
