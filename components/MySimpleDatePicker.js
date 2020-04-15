import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MySimpleDatePicker(props) {

    const { question, setData } = props;
    const [date, setDate] = React.useState();

    const prepearDate = text => {
        setDate(text);
    }

    return (
        <View style={styles.container}>
            <Text>{question}</Text>
            <TextInput placeholder='ДД-ММ-ГГГГ' value={date} onChangeText={text => prepearDate(text)} />
            <Button title='выбрать' onPress={() => setData} />
        </View>
    )
}
