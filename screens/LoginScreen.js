import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { firebaseApp } from '../util/Firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
        isLoggedIn: false,
    }

    componentDidMount() {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.props.navigation.replace('HomeScreen');
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        marginTop: 50,
                        fontSize: 50,
                        textAlign: 'center'
                    }}
                >
                    Sign In
                </Text>
                <View
                    style={{
                        marginTop: 50,
                        marginHorizontal: 20
                    }}
                >
                    <TextInput
                        mode='outlined'
                        label='Email'
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <TextInput
                        mode='outlined'
                        style={{
                            marginTop: 10
                        }}
                        label='Password'
                        keyboardType='visible-password'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <Button
                        onPress={() => {
                            if (this.state.email !== '' && this.state.password !== '') {
                                const auth = getAuth(firebaseApp);
                                signInWithEmailAndPassword(auth, this.state.email, this.state.password)
                                    .then((userCredential) => {
                                        const user = userCredential.user;
                                        this.props.navigation.replace('HomeScreen');
                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        alert(`${errorCode}: ${errorMessage}`);
                                    });
                            } else {
                                alert('Provide information');
                            }
                        }}
                        mode='contained'
                        style={{
                            marginTop: 20
                        }}
                    >
                        Login Now
                    </Button>

                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SignUpScreen');
                        }}
                        mode='text'
                        style={{
                            marginTop: 10
                        }}
                    >
                        New user? Sign Up Now
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});