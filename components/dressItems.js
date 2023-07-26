import { Pressable, StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreamentQuantity, increamentQuantity } from '../CartReducer';
import { decreamentQty, increamentQty } from '../ProductReducer';

const DressItems = ({item}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)
  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(increamentQty(item))
  }
  return (
    <View>
    <Pressable style={{backgroundColor:"#F8F8F8", borderRadius: 8, padding: 10, flexDirection:"row", alignItems:"center", justifyContent: "space-between", margin:14}}>
      <View>
        <Image style={{width:70, height:70}} source={{uri: item.image}}/>
      </View>
      <View>
        <Text style={{width:83, fontSize:17, fontWeight:"500", marginBottom:7}}>
            {item.name}
        </Text>
        <Text style={{width:60, color:"grey", fontSize:14}}>
            ${item.price}
        </Text>
      </View> 
      {cart.some((c) => c.id === item.id)? (
        <Pressable style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:5}}>
        <Pressable onPress={() => {
        dispatch(decreamentQuantity(item));
        dispatch(decreamentQty(item))

        }} style={{width: 26, height: 26, borderRadius: 13, borderColor:"#BEBEBE", backgroundColor:"#E0E0E0", justifyContent: "center", alignContent:"center"}}>
        <Text style={{fontSize:20, color: "#088F8F", paddingHorizontal: 6, fontWeight: "600", textAlign:"center"}}>
        -</Text>
        </Pressable>
        <Pressable>
          <Text style={{fontSize:19, color:"#088F8F", paddingHorizontal:8, fontWeight:"600"}}>
            {item.quantity}
          </Text>
        </Pressable>
        <Pressable onPress={()=>{
          dispatch(increamentQuantity(item));
          dispatch(increamentQty(item))
        }} style={{width: 26, height: 26, borderRadius: 13, borderColor:"#BEBEBE", backgroundColor:"#E0E0E0", justifyContent: "center", alignContent:"center"}}>
        <Text style={{fontSize:20, color: "#088F8F", paddingHorizontal: 6, fontWeight: "600", textAlign:"center"}}>
        +</Text>
        </Pressable>
        </Pressable>
      ): (
        <Pressable onPress={addItemToCart} style={{width:80}}>
            <Text style={{borderColor:"grey",borderRadius:5 ,borderWidth:0.8, marginVertical:10, color: "#088F8F",textAlign:"center", padding:5, fontSize:17, fontWeight: "bold" }}>Add</Text>
      </Pressable>
      )}

      </Pressable>
    </View>
  )
}

export default DressItems

const styles = StyleSheet.create({})