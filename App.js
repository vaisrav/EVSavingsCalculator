import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [gasPriceFromUI, setGasPriceFromUI] = useState(0)
  const [gasMileageFromUI, setGasMileageFromUI] = useState(0)
  const [utilityCostFromUI, setUtilityCostFromUI] = useState(0)
  const [evMileageFromUI, setEvMileageFromUI] = useState(0)

  const [selectedSegmentValue, setSelectedSegmentValue] = useState(15000)
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0)

  const [gasMileage, setGasMileage] = useState(0)
  const [evMileage, setEvMileage] = useState(0)
  const [theDiff, setTheDiff] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)
 
  const calcSavings = () => {
    // pass mileage to op
    let calcGasMileage = parseFloat(gasMileageFromUI)
    setGasMileage(calcGasMileage)

    //annual cost
    let gasCost = parseFloat(gasPriceFromUI) * (selectedSegmentValue / parseFloat(gasMileageFromUI))

    // calculate kms per 1lt with utilcost and ev mileage
    let calcEvMileage = parseFloat(evMileageFromUI) *  (parseFloat(gasPriceFromUI) /  parseFloat(utilityCostFromUI))
    setEvMileage(calcEvMileage)

    //annual cost
    let evCost = parseFloat(utilityCostFromUI) * (selectedSegmentValue / parseFloat(evMileageFromUI))

    // the difference
    let savingDiff = calcEvMileage - calcGasMileage
    setTheDiff(savingDiff)

    //annual costs
    let calcSavings = gasCost - evCost
    setTotalSavings(calcSavings)
  }
  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-evenly' }} keyboardShouldPersistTaps="handled">
        <View style={{paddingHorizontal: 20, justifyContent: 'space-evenly', flex: 1}}>

          <Text style={{fontSize: 30, fontWeight: 'bold'}}>EV savings calculator</Text>
          
          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic', paddingBottom: 5}}>Gas Vehicle Information</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              {/* two input fields */}
              <TextInput
              style={{borderWidth:0.2, borderRadius: 4, borderColor: '#222', paddingVertical:10, paddingLeft: 5, flex: 1}}
              placeholder="Price per Litre ($/L)"
              value={gasPriceFromUI}
              onChangeText={setGasPriceFromUI}
              />
              <TextInput
              style={{borderWidth:0.2, borderRadius: 4, borderColor: '#222', paddingVertical:10, paddingLeft: 5, flex: 1}}
              placeholder="Gas mileage (km/L)"
              value={gasMileageFromUI}
              onChangeText={setGasMileageFromUI}
              />
            </View>
          </View>

          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic', paddingBottom: 5}}>Electric Vehicle Information</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              {/* two input fields */}
              <TextInput
              style={{ borderWidth:0.2, borderRadius: 4, borderColor: '#222', paddingVertical:10, paddingLeft: 5, flex: 1}}
              placeholder="Utility Cost ($/kwH)"
              value={utilityCostFromUI}
              onChangeText={setUtilityCostFromUI}
              />
              <TextInput
              style={{ borderWidth:0.2, borderRadius: 4, borderColor: '#222', paddingVertical:10, paddingLeft: 5, flex: 1}}
              placeholder="EV mileage (km/L)"
              value={evMileageFromUI}
              onChangeText={setEvMileageFromUI}
              />
            </View>
          </View>

          <View>
            <Text style={{paddingBottom: 5, fontSize: 18}}>How many kms do you drive each year on an average?</Text>
            <SegmentedControl
              values={["15000", "25000", "40000"]}
              selectedIndex={selectedSegmentIndex}
              onChange={(event) => {
              setSelectedSegmentIndex(event.nativeEvent.selectedSegmentIndex)
              }}
              onValueChange={setSelectedSegmentValue}
            />  
          </View>
          {/* convert the button to pressable later */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'lightgrey' : '#545554',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginTop: 20,
                alignItems: 'center'
              },
            ]}
            onPress={calcSavings}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Calculate Savings</Text>
          </Pressable>

          <View style={{flexDirection: 'row', gap: 10}}>

            <View style={{backgroundColor: '#D56F3E', flex:1, alignItems: 'center', borderRadius: 10, borderWidth: 2, paddingVertical: 10}}>
              {/* Gas */}
              <MaterialCommunityIcons name="fuel" size={24} color="black" />
              <Text style={{paddingVertical: 5, fontSize: 30}}> {gasMileage.toFixed(2)} </Text>
              <Text>km</Text>
            </View>

            <View style={{backgroundColor: '#00C0A3', flex:1, alignItems: 'center', borderRadius: 10, borderWidth: 2, paddingVertical: 10}}>
              {/* ev */}
              <MaterialIcons name="electric-car" size={24} color="black" />
              <Text style={{paddingVertical: 5, fontSize: 30}}>{evMileage.toFixed(2)} </Text>
              <Text>km</Text>
            </View>

            <View style={{backgroundColor: '#a9a42c', flex:1, alignItems: 'center', borderRadius: 10, borderWidth: 2, paddingVertical: 10}}>
              {/* diff */}
              <FontAwesome5 name="piggy-bank" size={24} color="black" />
              <Text style={{paddingVertical: 5, fontSize: 30}}>{theDiff.toFixed(2)} </Text>
              <Text>km</Text>
            </View>        
            
          </View>

          <View>
            <Text style={{paddingBottom: 5, fontSize: 18}}>By switching to EV you save:</Text>
            <View style={{borderRadius: 10, borderWidth: 0.2, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 30, flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 45, fontWeight: 'bold'}}>$ {totalSavings.toFixed(2)} </Text>
              <Text> per year</Text>
            </View> 
          </View>  

        </View>
      </ScrollView>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    justifyContent:"space-evenly", 
  },
});
