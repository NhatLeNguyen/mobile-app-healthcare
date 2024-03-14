import { ScrollView, TouchableOpacity, View } from "react-native";
import MusicItem from "./MusicItem";
import { musicData } from "./MusicData";

function MusicList({onChange, onClose, isChanged}) {
  const handleChooseMusic = (index) => {
    onChange(musicData[index])
    onClose(false)
    isChanged(true)
  }
  return (
    <ScrollView style={{marginTop: 10}}>
      {musicData.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleChooseMusic(index)} activeOpacity={0.8}>
          <MusicItem
            uriMusic={item.img_url}
            name={item.name}
            author={item.author}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default MusicList;
