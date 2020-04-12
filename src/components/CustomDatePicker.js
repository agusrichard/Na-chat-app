import React from 'react'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CustomDatePicker(props) {

  return (
    <DatePicker
        style={{width: '100%', marginTop: 20}}
        date={props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconComponent={
          <Icon 
            name="birthday-cake"
            size={22}
            color="#999"
            style={{  
              position: 'absolute',
              padding: 7,
              alignSelf: 'center',
              left: 0,
              top: 4,
              marginLeft: 0 
            }} 
          />
        }
        onDateChange={props.onDateChange}
      />
  )
}