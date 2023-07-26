import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Carousal from '../components/carousal';
import Services from '../components/Services';
import DressItems from '../components/dressItems';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0)
    const navigation = useNavigation();
    console.log(cart) 

    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("We are loading");
    const [locationServiceEnabled, setlocationServiceEnabled] = useState(false) 
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    },[]);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if(!enabled){
            Alert.alert('Location service not available', 'Please enable location service', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
          
        }else{
            setlocationServiceEnabled(enabled)
        }
    }
    const getCurrentLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert('Permission Denied', 'Allow the app to use the location service', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        };
        const {coords} = await Location.getCurrentPositionAsync();
        console.log(coords);
        if (coords){
            const {latitude, longitude} = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude, longitude
            });
            console.log(response)
            for (let item of response){
              let address ='${item.name} ${item.city} ${item.postalCode}';
              setdisplayCurrentAddress(address);
            }
        }
    };
    const product = useSelector((state) => state.product.product);
    console.log("product array", product);
    const dispatch = useDispatch();
    useEffect(() => {
      if(product.length > 0) return;

      const fetchProducts = () => {
        services.map((service)=>dispatch(getProducts(service)));

      };
      fetchProducts();
    }, [])
    const services = [
      {
          id:"0",
          image: "https://cdn-icons-png.flaticon.com/128/2957/2957379.png",
          name: "Shirt",
          quantity: 0,
          price:10, 
      },
      {
          id:"11",
          image: "https://cdn-icons-png.flaticon.com/128/3121/3121219.png",
          name: "T-Shirt",
          quantity: 0,
          price:7, 
      },
      {
          id:"12",
          image: "https://cdn-icons-png.flaticon.com/128/4170/4170885.png",
          name: "Saree",
          quantity: 0,
          price:25, 
      },
      {
          id:"13",
          image: "https://cdn-icons-png.flaticon.com/128/2122/2122483.png",
          name: "Pant",
          quantity: 0,
          price:10, 
      },
      {
        id:"14",
        image: "https://cdn-icons-png.flaticon.com/128/4134/4134666.png",
        name: "Tops",
        quantity: 0,
        price:10, 
    },
    {
      id:"15",
      image: "https://cdn-icons-png.flaticon.com/128/3837/3837744.png",
      name: "Bed",
      quantity: 0,
      price:30, 
  },
  {
    id:"16",
    image: "https://cdn-icons-png.flaticon.com/128/2122/2122621.png",
    name: "jeans",
    quantity:0,
    price:15, 
  },
  ];
 
  return (
    <>
    <ScrollView style={{backgroundColor: "#F0F0F0", flex:1, marginTop:50}}>
    <View style ={{flexDirection: "row", alignItems: "center", padding: 10}}>
    <MaterialIcons name="location-on" size={24} color="#fd5c63" />
    <View>
    <Text style={{fontSize:18, fontWeight: "600"}}>Home</Text>
    <Text>
        {displayCurrentAddress}
      </Text>
    </View>
    <Pressable style={{marginLeft: "auto" , marginRight: 7}}>
      <Image style={{width:40, height:40, borderRadius:20}} source= {{uri:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}}></Image>
    </Pressable>
    </View>
    <View style = {{padding: 10,margin:10, flexDirection: "row", alignItems:"center", justifyContent:"space-between", borderWidth:0.8,borderColor:"#c0c0c0", borderRadius:7}}>
      <TextInput placeholder='search'></TextInput>
      <Feather name="search" size={24} color="#fd5c63" />
    </View>
    <Carousal/>
    <Services/>
    {product.map((item,index)=>(
      <DressItems item = {item} key={index}/>
    ))}
    </ScrollView>
    {total === 0 ? (
      null
    ):(
      <Pressable  style={{backgroundColor:"#088F8F", padding:10, marginBottom:40, margin:15, borderRadius:8, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <View>
        <Text style={{fontSize:17, fontWeight:"600", color:"white"}}>{cart.length} items | ${total}</Text>
        <Text style={{fontSize:13, fontWeight:"500", color:"white", marginVertical:6}}>Extra Charges might apply</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Pickup")}>
          <Text style={{fontSize:16, fontWeight:"700", color:"white"}}>
            Proceed to Pickup
          </Text>
        </Pressable>
      </Pressable> 
    )}
    </>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})