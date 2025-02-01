import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [animation] = useState(new Animated.Value(0));

  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight': return '#FFA07A';
      case 'Normal weight': return '#98FB98';
      case 'Overweight': return '#FFD700';
      case 'Obese': return '#FF6B6B';
      default: return '#fff';
    }
  };

  const calculateBMI = () => {
    Keyboard.dismiss();
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100;
      const bmiValue = weightNum / (heightNum * heightNum);
      setBmi(Math.round(bmiValue * 10) / 10);

      // Determine BMI category
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');

      // Animate result
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.spring(animation, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.title}>BMI Calculator</Text>
      
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter height"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={calculateBMI}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {bmi !== null && (
          <Animated.View 
            style={[
              styles.resultContainer,
              {
                opacity: animation,
                transform: [{
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.result}>Your BMI</Text>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <View style={[styles.categoryContainer, { backgroundColor: getCategoryColor() }]}>
              <Text style={styles.category}>{category}</Text>
            </View>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#4c669f',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
  },
  result: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
  },
  bmiValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4c669f',
    marginBottom: 10,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
