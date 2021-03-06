import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import globalStyles from '../../styles';
import { Touchable } from '../../common';
import TopicMessageHeader from './TopicMessageHeader';
import { streamNarrow } from '../../utils/narrow';
import { foregroundColorFromBackground } from '../../utils/color';
import StreamIcon from '../../streamlist/StreamIcon';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 32,
  },
  stream: {
    padding: 8,
    fontSize: 16,
    lineHeight: 16,
  },
  icon: {
    paddingLeft: 8,
  },
  triangle: {
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: 'rgba(127, 127, 127, 0.25)',
    borderRightColor: 'rgba(127, 127, 127, 0.25)',
    borderBottomColor: 'rgba(127, 127, 127, 0.25)',
  }
});

export default class StreamMessageHeader extends React.PureComponent {

  props: {
    itemId: number,
    stream: string,
    color: string,
    isPrivate: boolean,
  }

  performStreamNarrow = () => {
    const { itemId, doNarrow, stream } = this.props;
    doNarrow(streamNarrow(stream), itemId);
  }

  render() {
    const { stream, isPrivate, isMuted, topic, color, itemId, doNarrow, style } = this.props;
    const textColor = foregroundColorFromBackground(color);
    const iconType = isPrivate ? 'lock' : 'hashtag';

    return (
      <View style={[styles.header, style, globalStyles.background]}>
        <Touchable onPress={this.performStreamNarrow}>
          <View style={[styles.header, { backgroundColor: color }]}>
            <StreamIcon
              name={iconType}
              color={textColor}
              isPrivate={isPrivate}
              isMuted={isMuted}
              size={16}
              style={styles.icon}
            />
            <Text style={[styles.stream, { color: textColor }]}>
              {stream}
            </Text>
          </View>
        </Touchable>
        <View style={[styles.triangle, { borderLeftColor: color }]} />
        <TopicMessageHeader
          itemId={itemId}
          stream={stream}
          topic={topic}
          doNarrow={doNarrow}
        />
      </View>
    );
  }
}
