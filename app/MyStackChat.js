import React from 'react';
import ScreenChat from './Screen/Chat/ScreenChat';
import { createStackNavigator } from '@react-navigation/stack';

const ChatStack = createStackNavigator();

export default function MyStackChat() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="chat" component={ScreenChat} options={{ headerShown: true, title: 'Chat' }} />
    </ChatStack.Navigator>
  );
}
