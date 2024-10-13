import { StyleSheet, View, Text, TextInput, FlatList,TouchableOpacity, Image } from "react-native";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function MasterPortrait(){
    const [donut, setDonuts] = useState([]);
    const [filteredDonuts, setFilteredDonuts] = useState([]);
    const [selectedDonut, setSelectedDonut] = useState(null)
    const selectButton = ['Donut', 'Pink Donut', 'Floating'];
    const [selectedCategory, setSelectedCategory] = useState('Donut');

    useEffect(() => {
        axios
            .get("https://654325f301b5e279de1ff315.mockapi.io/api/v1/Donut")
            .then((response) => {
                setDonuts(response.data);
                setFilteredDonuts(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const renderDonut = ({ item }) => (
        <TouchableOpacity onPress={() => setSelectedDonut(item)}>
            <View style={styles.product}>
                <Image
                source={{ uri: item.image }}
                style={styles.image}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{fontSize: 20, fontWeight: 700, paddingBottom: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 15, fontWeight: 700, color:'#0000008A',paddingBottom: 10}}>{item.description}</Text>
                    <Text style={{fontSize: 20, fontWeight: 700}}>${item.price}.00</Text>
                </View>
            </View>
        </TouchableOpacity>
      );

    return(
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.textWelcome}>Wellcome, Nhựt Hào!</Text>
                <Text style={styles.textChoice}>Choice you Best food</Text>
            </View>

            <View style={styles.searchInput}>
                <TextInput placeholder="Search food" style={styles.textSearch}/>
            </View>

            <View style={styles.containerButton}>
                {selectButton.map((button) => (
                    <TouchableOpacity
                        key={button}
                        onPress={() => setSelectedCategory(button)}
                        style={[
                            styles.button,
                            { backgroundColor: selectedCategory === button ? '#F1B000' : 'white' }
                        ]}
                    >
                        <Text style={styles.textButton}>{button}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredDonuts}
                renderItem={renderDonut}
                keyExtractor={(item) => item.id.toString()}
            />

            {selectedDonut && (
                <View
                    style={{
                        padding: 20,
                        borderColor: "gray",
                        borderWidth: 1,
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {selectedDonut.name}
                    </Text>
                    <Image
                        source={{ uri: selectedDonut.image }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text>{selectedDonut.description}</Text>
                    <Text>Price: ${selectedDonut.price}</Text>
                    <Text>Delivery: 30 min</Text>
                </View>
            )}
        </View>
    )   
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginLeft:15
    },
    containerHeader: {
        marginBottom: 20,
        marginTop: 15
    },
    textWelcome:{
        fontSize: 16,
        fontWeight: 700,
        color: '#000000A6'
    },
    textChoice:{
        fontSize: 20,
        fontWeight: 700,
        color: '#000000'
    },
    searchInput:{
        borderWidth: 1,
        borderColor: '#C4C4C4',
        width: 240,
        height: 40,
        borderRadius: 3,
        justifyContent: 'center',
        marginBottom: 20
    },
    textSearch:{
        fontSize: 16, 
        fontWeight: 700,
         marginLeft: 10, 
         color: '#C4C4C4'
    },
    containerButton:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15
    },
    button:{
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        width: 100,
        alignItems: 'center',
        marginRight: 25
    },
    textButton:{
        fontSize: 14,
        fontWeight: 700
    },
    product: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 120,
        width: 350,
        borderRadius: 15,
        marginBottom: 20,
        backgroundColor: '#FFE4E1',
        borderColor: 'white',
        alignItems: 'center'
    },
    image: {
        marginLeft: 10,
        width: 110,
        height: 100,
        borderRadius: 10,
    }
})