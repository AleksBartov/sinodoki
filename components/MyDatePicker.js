import * as React from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import Circules from './Circules';

const styles = StyleSheet.create({
    container: {
        width: '90%',
    },
    selector: {
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    screen: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlesHolder: {
        flex: 3,
    }
});

export default function MyDatePicker(props) {

    const { question, setDateOfBirth } = props;
    const [modalActiv, setModal] = React.useState(false);

    return (
        <View
            style={styles.container}
        >
            <Text>{question}</Text>
            <View style={styles.selector}>
                <TextInput placeholder='00-00-0000' onFocus={() => setModal(true)} />
                <Modal
                    animationType="slide"
                    visible={modalActiv}
                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.screen}>
                            <Text style={{ color: '#ffffff', fontSize: 36 }} >00-00-0000</Text>
                        </View>
                        <View style={styles.circlesHolder}>
                            <Circules {...{ setModal }} />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
