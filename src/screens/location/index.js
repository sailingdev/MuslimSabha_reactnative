import React,{Component} from 'react';
import {View,Text, ImageBackground, StatusBar,Image, TouchableOpacity} from 'react-native';

class Location extends Component{
    render (){
        return(
            <ImageBackground
            source={require('../../assets/images/location.png')}
            style={{
                height:'100%',
                width:'100%',
                flex:1
            }}
            >
            <StatusBar translucent backgroundColor="transparent"/>
            <View
            style={{
                height:'40%',
                width:'100%',
                // backgroundColor:'#fff',
                alignItems:'center',
                justifyContent:'flex-end'
            }}
            >
                <Image
                    source={require('../../assets/images/locationicon.png')}
                    style={{
                        height:'60%',
                        width:'60%',
                        resizeMode:'contain'
                    }}
                />
            </View>
            <View
            style={{
                height:'7%',
                width:'100%',
                // backgroundColor:'#fff',
                marginTop:'10%',
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                <Text style={{fontSize:25,color:'#fff'}}>Set Your Location</Text>
            </View>
            <View
            style={{
                height:'4%',
                width:'100%',
                // backgroundColor:'#fff',
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                <Text style={{fontSize:18,color:'#fff'}}>Get accurate prayer times of</Text>
                <Text style={{fontSize:18,color:'#fff'}}>your location</Text>
            </View>
            <View
            style={{
                height:'8%',
                width:'100%',
                // backgroundColor:'#fff'
            }}
            ></View>
            <View
            style={{
                height:'8%',
                width:'100%',
                // backgroundColor:'#fff',
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                <TouchableOpacity
                style={{
                height:'80%',
                width:'80%',
                backgroundColor:'#fff',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:10
                }}
                >
                    <Text style={{color:'#000'}}>Set youe Location</Text>
                </TouchableOpacity>
            </View>
            <View
            style={{
                height:'25%',
                width:'100%',
                // backgroundColor:'#fff'
                alignItems:'center',
                justifyContent:'center',
                marginTop:'5%'
            }}
            >
                <Image
                source={require('../../assets/images/locationmosque.png')}
                    style={{
                        height:'100%',
                        width:'94%'
                    }}
                />
            </View>
            </ImageBackground>
        );
    }
};

export default Location;