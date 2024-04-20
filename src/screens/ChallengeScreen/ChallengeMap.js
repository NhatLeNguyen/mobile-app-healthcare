import { Image, View, Text, StyleSheet } from "react-native";

const LINE_HEIGHT = 20

const LINE_MAP = [
    {width: 270, height: LINE_HEIGHT, top:40 , left: 0 },
    {width: LINE_HEIGHT, height: 100, top: 40, left: 270, borderTopRightRadius: 30},
    {width: 200, height: LINE_HEIGHT, top: 140, left: 70 + LINE_HEIGHT, borderBottomRightRadius: 30},
    {width: LINE_HEIGHT, height: 250, top: 140, left: 70, borderTopLeftRadius: 30},
    {width: 100, height: LINE_HEIGHT, top: 390, left: 70, borderBottomLeftRadius: 30},
    {width: LINE_HEIGHT, height: 120, top: 390 - 120 + LINE_HEIGHT, left: 170, borderBottomRightRadius: 30},
    {width: 250, height: LINE_HEIGHT, top: 390 - 119, left: 170, borderTopLeftRadius: 30}
]
const PROCESS_LINE_MAP = [

]

function ChallengeMap() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ marginTop: 100 }}>
        <Image
          source={{
            uri: "https://png.pngtree.com/background/20230401/original/pngtree-cactus-mountains-desert-moon-cartoon-illustration-background-picture-image_2249539.jpg",
          }}
          style={{ width: "100%", height: 450, borderRadius: 30 }}
        />
        {LINE_MAP.map((props, index) => (
          <View key={index} style={[styles.line, props]}></View>
        ))}
        {/* <View style={[styles.line, {width: 270, height: LINE_HEIGHT, top: 40, left: 0}]}></View>
        <View style={[styles.line, {width: LINE_HEIGHT, height: 100, top: 40, left: 270, borderTopRightRadius: 30}]}></View>
        <View style={[styles.line, {width: 200, height: LINE_HEIGHT, top: 140, left: 70 + LINE_HEIGHT, borderBottomRightRadius: 30}]}></View>
        <View style={[styles.line, {width: LINE_HEIGHT, height: 250, top: 140, left: 70, borderTopLeftRadius: 30}]}></View>
        <View style={[styles.line, {width: 100, height: LINE_HEIGHT, top: 390, left: 70, borderBottomLeftRadius: 30}]}></View>
        <View style={[styles.line, {width: LINE_HEIGHT, height: 120, top: 390 - 120 + LINE_HEIGHT, left: 170, borderBottomRightRadius: 30}]}></View>
        <View style={[styles.line, {width: 250, height: LINE_HEIGHT, top: 390 - 119, left: 170, borderTopLeftRadius: 30}]}></View> */}

        <View style={[styles.process_line, {width: 200, height: LINE_HEIGHT, top: 40, left: 50, borderLeftWidth: 2}]}></View>
        <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3228/3228655.png",
            }}
            style={{position:'absolute', top: 40 - 50 + LINE_HEIGHT / 2, left: 50 + 200 - 50/2,width: 50, height: 50 }}

          />
        <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR3o2rWt7aqbvnqfxT2wIYMWpNmChMiqqT7zcSFE1-H6haAuUjcSTtOrwXU_aem_AYgCBlL7V5Yj8JtbMdVPXAtPRB_rM3J_ugGCDgziCKVTwuP6L5qynx-n8aIMj1nydXinq8c9fzHNtW-BZIGaOwkp",
            }}
            style={{position:'absolute', top: 40 - 50 + LINE_HEIGHT / 2 + 4, left: 50 + 200 - 50/2 + 9,width: 33, height: 33, borderRadius: 90}}
          />
        {/* https://cdn-icons-png.flaticon.com/512/3228/3228655.png */}
        {/* https://cdn-icons-png.flaticon.com/512/1607/1607158.png */}
        {/* https://cdn-icons-png.flaticon.com/512/2282/2282432.png */}
      </View>
      <View
        style={{
          backgroundColor: "#171719",
          flex: 1,
          marginTop: 20,
          borderRadius: 30,
          flexDirection: "row",
        }}
      >
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Thành tích</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1246/1246381.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ color: "gray" }}>Tổng số bước</Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
            }}
          >
            7.618
          </Text>
        </View>
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Xếp hạng</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/6020/6020401.png",
            }}
            style={{ width: 50, height: 50 }}
          />

          <Text style={{ color: "gray" }}>Thứ hạng của bạn</Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
            }}
          >
            7.618
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ChallengeMap;

const styles = StyleSheet.create({
    line: {
        backgroundColor: '#fafcfb',
        position: 'absolute'
    },
    process_line: {
        backgroundColor: '#ffcd2c',
        position: 'absolute'
    }
})