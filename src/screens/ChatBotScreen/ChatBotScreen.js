import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const PALM_API_KEY = 'AIzaSyAjp0SdIx30mtcO3WY5Km98qgGykuqFue0'; // Replace with your actual API key
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [context, setContext] = useState('');

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const chatHistory = await AsyncStorage.getItem('chatHistory');
      if (chatHistory !== null) {
        setMessages(JSON.parse(chatHistory));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveChatHistory = async (updatedMessages) => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const generateText = async () => {
    if (inputText.trim() === '') {
      return;
    }
    setLoading(true);
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${PALM_API_KEY}`;

    const requestData = {
      prompt: {
        context,
        examples: [],
        messages: [{ content: inputText }],
      },
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers,
      });

      if (response.status === 200) {
        if (
          response.data &&
          response.data.candidates &&
          response.data.candidates.length > 0
        ) {
          let botResponse = response.data.candidates[0].content;

          // Truncate the response intelligently
          const maxCharacters = 200; // Maximum characters to show
          if (botResponse.length > maxCharacters) {
            botResponse = botResponse.substring(0, maxCharacters); // Truncate response
            const lastPeriodIndex = botResponse.lastIndexOf('.'); // Find the last period in the truncated response
            if (lastPeriodIndex !== -1) {
              botResponse = botResponse.substring(0, lastPeriodIndex + 1); // Trim to the last complete sentence
            }
          }

          const newUserMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            timestamp: new Date().getTime(),
          };

          const newBotMessage = {
            id: messages.length + 2,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date().getTime(),
          };

          setMessages([...messages, newUserMessage, newBotMessage]);
          setInputText('');
          saveChatHistory([...messages, newUserMessage, newBotMessage]);
          setContext(botResponse); // Update context for next response
          flatListRef.current.scrollToEnd({ animated: true });
        } else {
          console.error('Response structure is not as expected!!');
        }
      } else {
        console.error(
          'Google Cloud API Response Failed with status:',
          response.status
        );
      }
    } catch (error) {
      console.error(
        'An error occurred while making the Google Cloud API request',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      generateText();
      Keyboard.dismiss();
    }
  };

  const handleSendButtonPress = () => {
    generateText();
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={33} color="black" />
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PraBot</Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                {
                  alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                },
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: item.sender === 'user' ? '#4CAF50' : '#FFEB3B',
                  },
                ]}
              >
                <Text
                  style={{
                    color: item.sender === 'user' ? 'white' : 'black',
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />
        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#4CAF50" />
        ) : null}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ask your agricultural questions..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            autoCorrect={false}
            onSubmitEditing={() => {
              generateText();
              Keyboard.dismiss();
            }}
            onKeyPress={handleKeyPress}
          />
          <TouchableOpacity onPress={handleSendButtonPress} style={styles.sendButton}>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 31,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 17.5,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
  },
  messageContainer: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 235, 59, 0.2)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#8D6E63',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#8D6E63',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});

export default ChatBotScreen;
