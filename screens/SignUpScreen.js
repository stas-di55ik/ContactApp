import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { firebaseApp } from '../util/Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, getDocs, addDoc, doc } from 'firebase/firestore/lite';

export default class SignUpScreen extends React.Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
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
                    Sign Up
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
                        secureTextEntry={true}
                        keyboardType='visible-password'
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TextInput
                        mode='outlined'
                        style={{
                            marginTop: 10
                        }}
                        label='Confirm Password'
                        secureTextEntry={true}
                        keyboardType='visible-password'
                        value={this.state.confirmPassword}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                    />

                    <Button
                        onPress={async () => {
                            if (this.state.email !== '' &&
                                this.state.password !== '' &&
                                this.state.confirmPassword !== '' &&
                                this.state.password === this.state.confirmPassword
                            ) {
                                const authentication = getAuth(firebaseApp);
                                const userCredential = await createUserWithEmailAndPassword(authentication, this.state.email, this.state.password);
                                console.log(userCredential.user.uid);
                                const firestore = getFirestore(firebaseApp);
                                try {
                                    const userDocRef = doc(firestore, 'users', userCredential.user.uid);
                                    const contactsCollectionRef = collection(userDocRef, 'contacts');
                                    await addDoc(contactsCollectionRef, {});
                                } catch (error) {
                                    console.log(`Error adding user to database: ${error}`);
                                }
                            } else {
                                alert('Provide correct details');
                            }
                        }}
                        mode='contained'
                        style={{
                            marginTop: 20
                        }}
                    >
                        Registrate Now
                    </Button>

                    <Button
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        mode='text'
                        style={{
                            marginTop: 10
                        }}
                    >
                        Existing user? Sign In Now
                    </Button>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});