import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import boundActions from '../boundActions';
import { Avatar } from '../common';
import Subheader from './Subheader';
import ReactionList from '../reactions/ReactionList';
import MessageTags from './MessageTags';

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    padding: 8,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
  },
  messageContentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
});

class MessageFull extends React.PureComponent {

  props: {
    avatarUrl: string,
    selfEmail: string,
    timestamp: number,
    reactions: [],
    twentyFourHourTime: bool,
  };

  handleAvatarPress = () =>
    this.props.pushRoute('account-details', this.props.message.sender_email);

  render() {
    const {
      message,
      children,
      avatarUrl,
      twentyFourHourTime,
      selfEmail,
      starred,
      onLongPress,
      realm } = this.props;

    return (
      <View style={styles.message}>
        <Avatar
          avatarUrl={avatarUrl}
          name={message.sender_full_name}
          onPress={this.handleAvatarPress}
          realm={realm}
        />
        <View style={styles.content}>
          <Subheader
            from={message.sender_full_name}
            timestamp={message.timestamp}
            twentyFourHourTime={twentyFourHourTime}
          />
          <View style={styles.messageContentWrapper}>
            <TouchableWithoutFeedback onLongPress={onLongPress}>
              <View>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <ReactionList
            messageId={message.id}
            reactions={message.reactions}
            selfEmail={selfEmail}
          />
          <MessageTags
            timestamp={message.edit_timestamp}
            starred={starred}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  boundActions,
)(MessageFull);
