import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const DigiHomeScreen = () => {
    const [userData, setUserData] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [body, setBody]=useState('')
    const [userId, setUserId]=useState('')
    const [editModal, setEditModal]=useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments')
            const data = await response.json()
            setUserData(data)
            // console.log('data',userData[0].name)
        } catch (error) {
            console.log(error)
        }
    }

    const renderItem = ({ item }:{item:any}) => {
        return (
            <TouchableOpacity style={styles.cardCon} 
             onPress={()=>editUserModal(item.id,item.name,item.email,item.body)}
            >
                <Text style={styles.nameText}>Name - {item.name}</Text>
                <Text style={[styles.nameText, { color: 'green' }]}>Email - {item.email}</Text>
                <Text style={[styles.nameText, { color: 'red' }]}>Body - {item.body}</Text>
            </TouchableOpacity>
        )
    }
     const addModal=()=>{
        setName('')
        setBody('')
        setEmail('')
        setOpenAddModal(true)
     }
    const addNewUser = async() => {
        const data = {
            name:name,
            email:email,
            body:body
        }
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await response.json()
            getData()
            console.log(result)
        }catch(error){
            console.log(error)
        }
       
        setOpenAddModal(false)
    }

    const editUserModal=(id:string,name:string,email:string,body:string)=>{
        setUserId(id)
        setName(name)
        setEmail(email)
        setBody(body)
        setEditModal(true)
    }

    const editUserFunction=async()=>{
        const newData = {
            id:userId,
            name:name,
            email,
            body
        }
        
        console.log('newData',newData)
        const response = await fetch('https://jsonplaceholder.typicode.com/comments'+newData.id,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newData)
        })
        console.log('respo',response)
        const result = await response.json()
        console.log('edit data',result)
        setEditModal(false)
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerCon}>
                <Text style={styles.headerText}>User List</Text>
            </View>
            <FlatList
                data={userData}
                renderItem={renderItem}
            />
            <View style={styles.btnCon}>
                <TouchableOpacity style={styles.btnStyle}
                    onPress={() => addModal()}
                >
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType='slide'
                visible={openAddModal}
                onRequestClose={() => setOpenAddModal(false)}
                transparent={true}
            >
                <View style={styles.modalCon}>
                    <View style={styles.modalCardCon}>
                        <TextInput
                            placeholder='Name'
                            style={styles.inputCon}
                            value={name}
                            onChangeText={(text)=>setName(text)}

                        />
                         <TextInput
                            placeholder='Email'
                            style={styles.inputCon}
                            value={email}
                            onChangeText={(text)=>setEmail(text)}
                        />
                        <TextInput
                            placeholder='body'
                            style={[styles.inputCon,{height:120}]}
                            multiline
                            value={body}
                            onChangeText={(text)=>setBody(text)}
                        />
                        <TouchableOpacity style={styles.modalBtnCon} 
                         onPress={addNewUser}
                        >
                            <Text style={{fontSize:20,fontWeight:'500',color:'#fff'}}>Add User</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType='slide'
                visible={editModal}
                onRequestClose={() => setEditModal(false)}
                transparent={true}
            >
                <View style={styles.modalCon}>
                    <View style={styles.modalCardCon}>
                        <TextInput
                            placeholder='Name'
                            style={styles.inputCon}
                            value={name}
                            onChangeText={(text)=>setName(text)}

                        />
                         <TextInput
                            placeholder='Email'
                            style={styles.inputCon}
                            value={email}
                            onChangeText={(text)=>setEmail(text)}
                        />
                        <TextInput
                            placeholder='body'
                            style={[styles.inputCon,{height:120}]}
                            multiline
                            value={body}
                            onChangeText={(text)=>setBody(text)}
                        />
                        <TouchableOpacity style={styles.modalBtnCon} 
                         onPress={editUserFunction}
                        >
                            <Text style={{fontSize:20,fontWeight:'500',color:'#fff'}}>Edit User</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default DigiHomeScreen

const styles = StyleSheet.create({
    modalBtnCon:{
        height:50,
        backgroundColor:'lightgreen',
        shadowOpacity:0.2,
        shadowOffset:{height:0,width:0},
        borderRadius:10,
        fontSize:20,
        marginTop:20,
        marginHorizontal:'5%',
        alignItems:'center',
        justifyContent:'center'
    },
    inputCon:{
        height:50,
        backgroundColor:'#fff',
        shadowOpacity:0.2,
        shadowOffset:{height:0,width:0},
        borderRadius:10,
        fontSize:20,
        paddingLeft:10,
        marginTop:10,
        marginHorizontal:'5%'
    },
    modalCardCon:{
        height:350,
        width:'90%',
        backgroundColor:'#fff',
        shadowOpacity:0.2,
        shadowOffset:{height:0,width:0},
        borderRadius:10,
        paddingTop:10,
        borderWidth:1.5,
        borderColor:'yellow'
    },
    modalCon: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    btnText: {
        fontSize: 40,
        color: '#fff'
    },
    btnStyle: {
        backgroundColor: 'darkblue',
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    btnCon: {
        position: 'absolute',
        bottom: 80,
        right: 70
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'darkblue'
    },
    cardCon: {
        backgroundColor: '#fff',
        width: '94%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: '5%',
        marginTop: 10,
        paddingVertical: '5%'
    },
    headerText:{
        fontSize:25,
        color:'blue',
        fontWeight:'bold'
    },
    headerCon:{
        backgroundColor:'#fff',
        height:50,
        shadowOpacity:0.2,
        shadowOffset:{height:3,width:0},
        alignItems:'center',
        justifyContent:'center'
    },
})