import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MySelector from '../components/MySelector';
import MyDoubleSelector from '../components/MyDoubleSelector';
import MyTextInput from '../components/MyTextInput';
import MyDatePicker from '../components/MyDatePicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default function AddingScreen({navigation}) {

  const sinodikTypes = [
    'о здравии',
    'о упокоении',
  ];
  const [ sinodikInitValue, setSinodikInitValue ] = React.useState(sinodikTypes[0]);

  const sex = [
    'мужской',
    'женский',
  ];
  const [ sexInitValue, setSexInitValue ] = React.useState(sex[0]);
  const [ nameInitValue, setNameInitValue ] = React.useState();
  const [ surnameInitValue, setSurnameInitValue ] = React.useState();
  const [ fathernameInitValue, setFathernameInitValue ] = React.useState();
  const [ dateOfBirth, setDateOfBirth ] = React.useState();
  const [ dateOfBapt, setDateOfBapt ] = React.useState();

  const types = ['О ЗДРАВИИ', 'О УПОКОЕНИИ'];
  const [ active, setActive ] = React.useState([true, false]);

  return (
    <View 
      style={styles.container}
      >
      <MyDoubleSelector question='тип синодика' {...{ types, active, setActive }} />
      <MySelector question='тип синодика' values={sinodikTypes} setInitValue={setSinodikInitValue} initValue={sinodikInitValue} />
      <MySelector question='пол' values={sex} setInitValue={setSexInitValue} initValue={sexInitValue} />
      <MyTextInput question='имя' initValue={nameInitValue} setInitValue={setNameInitValue} placeholder='введите имя' />
      <MyTextInput question='фамилия' initValue={surnameInitValue} setInitValue={setSurnameInitValue} placeholder='введите фамилию' />
      <MyTextInput question='отчество' initValue={fathernameInitValue} setInitValue={setFathernameInitValue} placeholder='введите отчество' />
      <MyDatePicker question='дата рождения' {...{ setDateOfBirth }} />
      <MyDatePicker question='дата крещения' {...{ setDateOfBapt }} />
    </View>
  );
}

/* 
    "dateOfBapt": "30.07.2019",
    "dateOfSaint": "30.07.",
    "dateDeath": "",
    "dateOfVows": "",
    "dateOfOrdinationDiak": "",
    "dateOfOrdinationPriest": "",
    "dateOfOrdinationBish": "",
    "dateOfEnthron": "",
    "comment": [
        "Дочь племянника Маргариты Сафоновой. Родители Иоанн и Иоанна"
    ],
    "other": [
        "мл.",
        ""
    ],
    "count": 1564488898133,
    "group": [
        "Крещенные мной"
    ]
}
     */