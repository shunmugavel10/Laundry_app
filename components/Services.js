import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id:"0",
            image: "https://cdn-icons-png.flaticon.com/128/3322/3322056.png",
            name: "Washing"
        },
        {
            id:"11",
            image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
            name: "Laundry"
        },
        {
            id:"12",
            image: "https://cdn-icons-png.flaticon.com/128/9215/9215618.png",
            name: "Wash & Iron"
        },
        {
            id:"13",
            image: "https://cdn-icons-png.flaticon.com/128/3899/3899253.png",
            name: "Cleaning"
        },
    ];

  return (
    <View style={{padding:10}}>
    <Text style = {{fontSize:16, fontWeight:"500", marginBottom: 7}}>Our Services</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service,index) => (
            <Pressable key={index} style={{margin:10, backgroundColor:"white", padding:20, borderRadius: 7}}>
                <Image source = {{uri:service.image}} style = {{width:70, height:70}}/>
                <Text style={{textAlign:"center", marginTop:10}}>{service.name}</Text>
            </Pressable>
        ))}
    </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})