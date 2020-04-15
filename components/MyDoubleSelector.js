import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const SIZE = Dimensions.get('window').width / 3;

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: '#ecf0f3',
        marginBottom: 15
    },
    title: {
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE,
        height: SIZE,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginVertical: 10,
    },
});

export default function MySelector(props) {


    return (
        <View
            style={styles.container}
        ><Text style={styles.title}>{props.question}</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Text>{props.types[0]}</Text>
                </View>
                <View style={styles.button}>
                    <Text>{props.types[1]}</Text>
                </View>
            </View>
        </View>
    );
}