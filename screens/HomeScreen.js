import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Button, FAB, ActivityIndicator } from 'react-native-paper';

import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc } from 'firebase/firestore/lite';

import { firebaseApp } from '../util/Firebase';

export default class HomeScreen extends React.Component {

    state = {
        contacts: [],
        isLoaded: false,
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button
                    icon='logout'
                    onPress={() => {
                        const auth = getAuth();
                        signOut(auth).then(() => {
                            this.props.navigation.replace('LoginScreen');
                        }).catch((error) => {
                            alert(error);
                        });
                    }}
                />
            )
        });

        this.getAllContacts();
    }

    async getAllContacts() {
        const auth = getAuth();
        const user = auth.currentUser;
        const firestore = getFirestore(firebaseApp);
        try {
            const querySnapshot = await getDocs(collection(firestore, 'users', user.uid, 'contacts'));
            const contacts = [];
            querySnapshot.forEach((doc) => {
                if (Object.entries(doc.data()).length !== 0) {
                    contacts.push({
                        id: doc.id,
                        name: doc.data().name,
                        phone: doc.data().name
                    });
                }
            });
            this.setState({ isLoaded: true, contacts });
        } catch (error) {
            console.log(`Error of fetching all items: ${error}`);
        }
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.contacts}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                    <FAB
                        icon='plus'
                        style={styles.fab}
                        onPress={() => {
                            this.props.navigation.navigate('AddScreen');
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#2bdde3',
        right: 0,
        bottom: 0,
        margin: 16
    }
});