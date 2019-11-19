import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../../components';
import { Colors } from '../../themes';

export default class IntroViewer extends React.PureComponent {
  render() {
    const { data } = this.props;
    const { imageSource, title } = data;
    return (
      <View style={styles.slide}>
        <Image
          source={imageSource}
          style={{
            borderRadius: 100,
            height: 200,
            width: 200
          }}
        />

        <Text
          type="regular"
          color={Colors.black}
          sizeType="xMedium"
          style={styles.text}
        >
          {title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 15,
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'Roboto-Thin',
    fontSize: 19
  }
});
