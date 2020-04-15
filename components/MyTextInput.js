import * as React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

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

export default function MyTextInput(props) {

    const { question, initValue, setInitValue, placeholder } = props;

    return (
        <View
            style={styles.container}
        >
            <Text>{question}</Text>
            <View style={styles.selector}>
                <TextInput {...{ placeholder }} value={initValue} onChangeText={text => setInitValue(text)} />
            </View>
        </View>
    );
}
