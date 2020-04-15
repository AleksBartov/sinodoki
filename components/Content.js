import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Modal, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function Content(props) {

    const myKey = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
    // const myCollection = 'iereiAleksandrBartov';

    const [names, setNames] = React.useState([]);
    const [haveAnyRecord, setHaveAnyRecord] = React.useState(false);

    React.useEffect(() => {
        fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${props.username}?${myKey}`)
            .then(data => data.json())
            .then(allNamesArr => {
                if (allNamesArr.length < 1) {
                    setHaveAnyRecord(true);
                    setNames([{ name: '' }]);
                    return;
                }
                const deceaseds = allNamesArr.filter(p => p.live === props.type);
                setNames(deceaseds);
            });
    }, []);

    return (
        <View style={styles.container}>{
            names.length < 1 ? <ActivityIndicator color='red' size='large' /> : names.map((p, i) => <Text key={i}>{p.name}</Text>)
        }
            <Modal
                animationType="slide"
                transparent={true}
                visible={haveAnyRecord}
            >
                <View style={{ marginTop: 22, justifyContent: 'flex-start', width: 200, height: 200, backgroundColor: 'red' }}>
                    <Text>в вашем синодике пока нет ни одной записи</Text>
                    <Button title="X" onPress={() => setHaveAnyRecord(false)} />
                    <Button title="ДОБАВИТЬ ПОМИНОВЕНИЕ" onPress={() => {
                        setHaveAnyRecord(false);
                        props.setModalVisible(!props.modalVisible);
                        props.navigation.navigate('Adding');
                    }} />
                </View>
            </Modal>
        </View>
    );
}
