/* @flow */
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Popup } from '../common';
import StreamItem from '../streamlist/StreamItem';

class StreamAutocomplete extends Component {

  props: {
    filter: string;
    onAutocomplete: (name: string) => {},
    subscriptions: Object[],
  };

  render() {
    const { filter, subscriptions, onAutocomplete } = this.props;
    const streams = subscriptions
      .filter(x => x.name.toLowerCase().startsWith(filter.toLowerCase()));

    if (streams.length === 0) return null;

    return (
      <Popup>
        <FlatList
          keyboardShouldPersistTaps="always"
          initialNumToRender={streams.length}
          data={streams}
          keyExtractor={item => item.stream_id}
          renderItem={({ item }) => (
            <StreamItem
              key={item.stream_id}
              name={item.name}
              isMuted={!item.in_home_view}
              isPrivate={item.invite_only}
              iconSize={12}
              color={item.color}
              onPress={() => onAutocomplete(item.name)}
            />
          )}
        />
      </Popup>
    );
  }
}

const mapStateToProps = (state) => ({
  subscriptions: state.subscriptions,
});

export default connect(mapStateToProps)(StreamAutocomplete);
