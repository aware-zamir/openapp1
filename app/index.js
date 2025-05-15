import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function App() {
    const [currentNumber, setCurrentNumber] = useState('0');
    const [lastNumber, setLastNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const handleNumberPress = (number) => {
        if (currentNumber === '0') {
            setCurrentNumber(number);
        } else {
            setCurrentNumber(currentNumber + number);
        }
    };

    const handleOperatorPress = (op) => {
        setOperator(op);
        setLastNumber(currentNumber);
        setCurrentNumber('0');
    };

    const handleEqual = () => {
        const num1 = parseFloat(lastNumber);
        const num2 = parseFloat(currentNumber);
        let result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return;
        }

        setCurrentNumber(result.toString());
        setOperator('');
        setLastNumber('');
    };

    const handleClear = () => {
        setCurrentNumber('0');
        setLastNumber('');
        setOperator('');
    };

    const handleExit = () => {
        Alert.alert(
            "Exit Calculator",
            "Are you sure you want to exit?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Exit",
                    onPress: () => {
                        // In a real app, you would use BackHandler.exitApp() for Android
                        // For web, you might want to close the window or navigate away
                        console.log("App would exit here");
                    }
                }
            ]
        );
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const CalculatorButton = ({ text, onPress, style }) => (
        <TouchableOpacity 
            style={[
                styles.button, 
                style,
                isDarkMode && styles.darkButton
            ]} 
            onPress={onPress}
        >
            <Text style={[
                styles.buttonText,
                isDarkMode && styles.darkButtonText
            ]}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[
            styles.container,
            isDarkMode && styles.darkContainer
        ]}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={() => setShowSettings(!showSettings)}
                >
                    <Ionicons 
                        name="settings-outline" 
                        size={24} 
                        color={isDarkMode ? '#fff' : '#000'} 
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={handleExit}
                >
                    <Ionicons 
                        name="close" 
                        size={24} 
                        color={isDarkMode ? '#fff' : '#000'} 
                    />
                </TouchableOpacity>
            </View>

            {showSettings && (
                <View style={[
                    styles.settingsPanel,
                    isDarkMode && styles.darkSettingsPanel
                ]}>
                    <TouchableOpacity 
                        style={styles.settingItem}
                        onPress={toggleDarkMode}
                    >
                        <Text style={[
                            styles.settingText,
                            isDarkMode && styles.darkSettingText
                        ]}>
                            Dark Mode
                        </Text>
                        <Ionicons 
                            name={isDarkMode ? "moon" : "moon-outline"} 
                            size={24} 
                            color={isDarkMode ? '#fff' : '#000'} 
                        />
                    </TouchableOpacity>
                </View>
            )}

            <View style={[
                styles.display,
                isDarkMode && styles.darkDisplay
            ]}>
                <Text style={[
                    styles.displayText,
                    isDarkMode && styles.darkDisplayText
                ]}>{currentNumber}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.row}>
                    <CalculatorButton text="7" onPress={() => handleNumberPress('7')} />
                    <CalculatorButton text="8" onPress={() => handleNumberPress('8')} />
                    <CalculatorButton text="9" onPress={() => handleNumberPress('9')} />
                    <CalculatorButton text="/" onPress={() => handleOperatorPress('/')} style={styles.operatorButton} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="4" onPress={() => handleNumberPress('4')} />
                    <CalculatorButton text="5" onPress={() => handleNumberPress('5')} />
                    <CalculatorButton text="6" onPress={() => handleNumberPress('6')} />
                    <CalculatorButton text="*" onPress={() => handleOperatorPress('*')} style={styles.operatorButton} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="1" onPress={() => handleNumberPress('1')} />
                    <CalculatorButton text="2" onPress={() => handleNumberPress('2')} />
                    <CalculatorButton text="3" onPress={() => handleNumberPress('3')} />
                    <CalculatorButton text="-" onPress={() => handleOperatorPress('-')} style={styles.operatorButton} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="0" onPress={() => handleNumberPress('0')} />
                    <CalculatorButton text="C" onPress={handleClear} style={styles.clearButton} />
                    <CalculatorButton text="=" onPress={handleEqual} style={styles.equalButton} />
                    <CalculatorButton text="+" onPress={() => handleOperatorPress('+')} style={styles.operatorButton} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    headerButton: {
        padding: 10,
    },
    settingsPanel: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    darkSettingsPanel: {
        backgroundColor: '#1e1e1e',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingText: {
        fontSize: 16,
        color: '#000',
    },
    darkSettingText: {
        color: '#fff',
    },
    display: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: '#fff',
    },
    darkDisplay: {
        backgroundColor: '#1e1e1e',
    },
    displayText: {
        fontSize: 48,
        color: '#000',
    },
    darkDisplayText: {
        color: '#fff',
    },
    buttonContainer: {
        flex: 2,
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    darkButton: {
        backgroundColor: '#2d2d2d',
    },
    buttonText: {
        fontSize: 24,
        color: '#000',
    },
    darkButtonText: {
        color: '#fff',
    },
    operatorButton: {
        backgroundColor: '#ff9500',
    },
    clearButton: {
        backgroundColor: '#ff3b30',
    },
    equalButton: {
        backgroundColor: '#4cd964',
    },
});