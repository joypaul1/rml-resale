import React, { Component } from 'react';
import { CustomChat, FacebookProvider } from 'react-facebook';

export default class FacebookMessenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChat: false // State to control when to show the chat
    };
  }

  componentDidMount() {
    // Introduce a delay before showing the chat
    setTimeout(() => {
      this.setState({ showChat: true }); // Set showChat to true after the delay
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  render() {
    const { showChat } = this.state;

    return (
      <FacebookProvider  appId={process.env.REACT_APP_FACEBOOK_APP_ID} chatSupport>
        {showChat && (
          <CustomChat pageId={process.env.REACT_APP_FACEBOOK_PAGE_ID} minimized={false}/>
        )}
      </FacebookProvider>   
    );
  }
}
