import * as React from 'react';
import { Modal, Button, Text, View, StyleSheet, Alert, TouchableHighlight, ScrollView } from 'react-native';
import Content from './Content';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        width: 200,
        height: 300,
        margin: 15,
    },
});

export default function Card(props) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => setModalVisible(true)}>
            <View style={styles.container}>
                <Text>{props.type}</Text>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                >
                    <View style={{ marginTop: 22, justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray', padding: 15 }}>
                            <Text>{props.type}</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={{ margin: 5, fontSize: 20 }}>X</Text>
                            </TouchableHighlight>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Content type={props.type} username={props.username} {...{ modalVisible, setModalVisible }} navigation={props.navigation} />
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </TouchableHighlight>
    );
}
