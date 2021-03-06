import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { isTopicNarrow } from '../../utils/narrow';

const styles = StyleSheet.create({
  streamInputWrapper: {
    flexDirection: 'row', alignItems: 'center', flex: 1
  },
  topicInput: {
    flex: 0.8,
    margin: 2
  }
});

export default class StreamBox extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.narrow !== nextProps.narrow) {
      if (nextProps.narrow[0].operator !== 'pm-with') {
        const { setTopic } = this.props;
        if (isTopicNarrow(nextProps.narrow)) {
          setTopic(nextProps.narrow[1].operand);
        } else {
          setTopic(nextProps.lastTopic);
        }
      }
    }
  }

  render() {
    const { operator, setTopic } = this.props;
    return (
      <View style={styles.streamInputWrapper}>
        <TextInput
          ref={component => { this.operandInput = component; }}
          style={styles.topicInput}
          placeholder={'Topic'}
          onChange={(event) => setTopic(
            event.nativeEvent.text
          )}
          value={operator}
        />
      </View>
    );
  }
}
