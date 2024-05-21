import React from "react";
import { View, Text, TextInput } from "react-native";

const CustomInput = ({ value, setValue }) => {
    const handleChange = (text) => {
        // Update the value and pass it back to the parent component
        setValue(text);
    };

    return (
        <View>
            <TextInput
                placeholder="Enter text here"
                value={value}
                onChangeText={handleChange}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
            />
        </View>
    );
};

export default CustomInput;
