import { View, Text, Image, StyleSheet } from "react-native";
function MusicItem({uriMusic, name, author}) {
    // console.log(uriMusic);
    return ( 
    <View style={styles.container}>
        <Image 
            source={{uri: uriMusic}}
            style={{height: 45, width: 45, borderRadius: 10}}
        />
        <View style={{marginLeft: 10}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.author}>{author}</Text>
        </View>
    </View>
    );
}

export default MusicItem;

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    author: {
        color: 'gray',
        fontSize: 12
    }
})