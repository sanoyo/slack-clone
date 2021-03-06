import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messagesLoading: true,
    messages: [],
    numUniqueUsers: ''
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id)
    }
  }

  addListeners = (channelId) => {
    this.addMessageListner(channelId)
  }

  addMessageListner = (channelId) => {
    let loadMessages = []
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadMessages.push(snap.val());
      this.setState({ 
        messages: loadMessages,
        messagesLoading: false
      });
      this.countUserNumber(loadMessages)
    })
  }

  countUserNumber = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers })
  }

  displayMessages = (messages) => (
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))
  )

  displayChannel = (channel) => channel ? `# ${channel.name}` : '';

  render() {
    const { messagesRef, channel, user, messages, numUniqueUsers } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannel(channel)}
          numUniqueUsers={numUniqueUsers}
        />
        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
