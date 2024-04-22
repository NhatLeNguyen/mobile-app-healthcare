import { Image, View } from "react-native";
const LINE_HEIGHT = 20;

function DrawAvatar({ topAvatar, leftAvatar, avatar, isOddStop }) {
  return (
    <View style={{ position: "absolute" }}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3228/3228655.png",
        }}
        style={{
          position: "absolute",
          top:
            isOddStop === 1 ? topAvatar - 50 : topAvatar - 50 + LINE_HEIGHT / 2,
          // top: 40 - 50 + LINE_HEIGHT / 2,
          // left: 50 + 200 - 50 / 2,
          left:
            isOddStop === 1
              ? leftAvatar - 25 + LINE_HEIGHT / 2
              : leftAvatar - 25,
          width: 50,
          height: 50,
        }}
      />
      <Image
        source={{
          uri:avatar ? avatar : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR3o2rWt7aqbvnqfxT2wIYMWpNmChMiqqT7zcSFE1-H6haAuUjcSTtOrwXU_aem_AYgCBlL7V5Yj8JtbMdVPXAtPRB_rM3J_ugGCDgziCKVTwuP6L5qynx-n8aIMj1nydXinq8c9fzHNtW-BZIGaOwkp",
        }}
        style={{
          position: "absolute",
          top:
            isOddStop === 1
              ? topAvatar - 50 + 4
              : topAvatar - 50 + LINE_HEIGHT / 2 + 4,
          left:
            isOddStop === 1
              ? leftAvatar - 25 + LINE_HEIGHT / 2 + 8
              : leftAvatar - 25 + 8,
          width: 33,
          height: 33,
          borderRadius: 90,
        }}
      />
    </View>
  );
}

export default DrawAvatar;
