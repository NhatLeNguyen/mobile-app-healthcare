import { ScrollView, TouchableOpacity, View } from "react-native";
import MusicItem from "./MusicItem";
import { musicData } from "./MusicData";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function MusicList({listMusic, onChange, onClose, isChanged}) {
  const handleChooseMusic = (index) => {
    onChange(listMusic[index])
    onClose(false)
    isChanged(true)
  }
  return (
    <ScrollView style={{marginTop: 10}}>
      {listMusic.map((item, index) => (
        <TouchableOpacity key={item.key} onPress={() => handleChooseMusic(index)} activeOpacity={0.8}>
          <MusicItem
            uriMusic={item.thumbnail !== '' ? item.thumbnail :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bDfU2mvxC6CL_CfyW47bd1ga9OWSHxYbNx6EbwzgtA&s'}
            name={capitalizeFirstLetter(item.name)}
            author={item.artists}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default MusicList;
