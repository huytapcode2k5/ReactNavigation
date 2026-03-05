import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        🎉 Chào mừng bạn đến Home Screen
      </Text>
    </View>
  );
}



function SignInScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const phoneRegex = /^0[0-9]{9}$/;


  const formatPhone = (number) => {
    if (number.length <= 3) return number;
    if (number.length <= 6)
      return number.slice(0, 3) + ' ' + number.slice(3);
    return number.slice(0, 3) + ' ' + number.slice(3, 6) + ' ' + number.slice(6);
  };

  const handlePhoneChange = (text) => {
    const onlyNumber = text.replace(/[^0-9]/g, '');

    if (onlyNumber.length <= 10) {
      const formatted = formatPhone(onlyNumber);
      setPhone(formatted);

      if (onlyNumber.length === 0) {
        setError('');
      } else if (!phoneRegex.test(onlyNumber)) {
        setError('Số điện thoại không đúng định dạng');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = () => {
    const rawPhone = phone.replace(/\s/g, '');

    if (phoneRegex.test(rawPhone)) {
      Alert.alert('Welcome', 'Chào mừng đến với khóa học lập trình');


      navigation.navigate('Home');
    } else {
      setError('Số điện thoại không đúng định dạng');
      Alert.alert('Lỗi', 'Số điện thoại không đúng định dạng');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <Text style={styles.heading}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null
        ]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handlePhoneChange}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Tiếp tục
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">

        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Đăng nhập' }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  heading: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 6,
  },
  button: {
    marginTop: 30,
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}
);