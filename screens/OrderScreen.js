import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width:300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      <Pressable style={{width:200, backgroundColor:"#318CE7", padding:10, borderRadius:6, marginTop:50, marginLeft:"auto", marginRight:"auto"}} onPress={()=> navigation.navigate("Home")}>
                <Text style={{fontSize:18, textAlign:"center", color:"white"}}>Home</Text>
            </Pressable>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});