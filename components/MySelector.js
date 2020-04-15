import * as React from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        width: '90%',
    },
    selector: {
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default function MySelector(props) {

    const { question, initValue, values, setInitValue } = props;
    const [modalActiv, setModal] = React.useState(false);

    return (
        <View
            style={styles.container}
        >
            <Text>{question}</Text>
            <View style={styles.selector}>
                <Text>{initValue}</Text>
                <TouchableOpacity onPress={() => setModal(true)} style={styles.arrow}>
                    <Ionicons name="ios-arrow-down" size={32} color="green" />
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalActiv}
                >
                    <BlurView
                        tint="light"
                        intensity={80}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 200, height: 200, backgroundColor: 'gray', color: '#ffffff', borderRadius: 9 }}>
                            {
                                values.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                setInitValue(v);
                                                setModal(false);
                                            }}
                                        >
                                            <View style={{ borderBottomWidth: 2, marginVertical: 3, padding: 5 }}>
                                                <Text>{v}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </BlurView>
                </Modal>
            </View>
        </View>
    );
}
