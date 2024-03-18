import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc } from 'firebase/firestore/lite';

import { firebaseApp } from '../util/Firebase';

export default class AddScreen extends React.Component {

    state = {
        name: '',
        phone: ''
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    mode='outlined'
                    value={this.state.name}
                    label='Name'
                    onChangeText={(text) => this.setState({ name: text })}
                    style={{
                        margin: 10,
                    }}
                >
                </TextInput>

                <TextInput
                    mode='outlined'
                    value={this.state.phone}
                    label='Phone'
                    onChangeText={(text) => this.setState({ phone: text })}
                    keyboardType='number-pad'
                    style={{
                        margin: 10,
                    }}
                >
                </TextInput>

                <Button
                    onPress={async () => {
                        if (this.state.name !== '' && this.state.phone !== '') {
                            const auth = getAuth();
                            const user = auth.currentUser;
                            const firestore = getFirestore(firebaseApp);
                            try {
                                const userDocRef = doc(firestore, 'users', user.uid);
                                const contactsCollectionRef = collection(userDocRef, 'contacts');
                                await addDoc(contactsCollectionRef, {
                                    name: this.state.name,
                                    phone: this.state.phone
                                });
                                this.props.navigation.goBack();
                            } catch (error) {
                                console.log(`Error adding item to database (UID: ${user.uid}): ${error}`);
                            }
                        } else {

                        }
                        // const querySnapshot = await getDocs(collection(firestore, "data"));
                        // console.log(querySnapshot);
                        // querySnapshot.forEach((doc) => {
                        //     // doc.data() is never undefined for query doc snapshots
                        //     console.log(doc.id, " => ", doc.data());
                        // });
                    }}
                    mode='contained'
                    style={{
                        margin: 10,
                    }}
                >
                    Save
                </Button>

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
