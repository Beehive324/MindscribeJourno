import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';

const SECTIONS = [
    {
        header: 'Preferences',
        items: [
            //{ id: 'Language', icon: 'globe', label: 'Language', type: 'select' },
            { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
        ],
    },
    {
        header: 'Help',
        items: [
            { id: 'bug', icon: 'flag', label: 'Report Bug', type: 'link' },
            { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' },
        ],
    },
    {
        header: 'Voice Journals',
        items: [
            { id: 'save', icon: 'star', label: 'Favourites', type: 'link' },
        ],
    },
    {
        header: 'Account',
        items: [
            {id: 'logout', icon: 'user', label: 'Sign out', type: 'link'}
        ]
    }
];

export default function Settings() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>Update your preferences</Text>
                </View>
                {SECTIONS.map(({ header, items }) => (
                    <View style={styles.section} key={header}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{header}</Text>
                        </View>
                        <View style={styles.sectionBody}>
                            {items.map(({ label, id, type, icon }, index) => (
                                <View
                                    style={[styles.rowWrapper, index === 0 && { borderTopWidth: 0 }]}
                                    key={id}
                                >
                                    <TouchableOpacity onPress={() => {
                                        // handle on Press event
                                    }}>
                                        <View style={styles.row}>
                                            <FeatherIcon name={icon} color="#616161" size={22} style={{ marginRight: 12 }} />
                                            <Text style={styles.rowLabel}>{label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        marginBottom: 6,
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    rowWrapper: {
        paddingLeft: 24,
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
        backgroundColor: '#fff', 
    },
    row: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
    },
    rowLabel: {
        fontSize: 16,
        color: '#333',
    },
});
