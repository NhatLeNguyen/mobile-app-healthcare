import { View } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import imagePath from '../../constants/imagePath';
import { Image } from 'react-native';

function Route({ posList }) {
    const firstPoint = posList.length > 0 ? posList[0] : 0;
    var curPoint = posList.length > 0 ? posList[0] : 0;
    // console.log('Running');
    return (
        <View>
            {posList.length > 0 && (
                <Marker coordinate={{ ...firstPoint }}>
                    <Image source={imagePath.icCurloc} style={{ width: 40, height: 40 }} />
                </Marker>
            )}
            {posList.length > 1 &&
                posList.map((item, index) => {
                    let lastPoint = curPoint;
                    curPoint = item;
                    return (
                        <MapViewDirections
                            key={index}
                            origin={lastPoint}
                            destination={curPoint}
                            apikey={GOOGLE_MAP_KEY}
                            strokeColor="#4a80f5"
                            strokeWidth={4}
                        />
                    );
                })}
            {/* {posList.length > 1 && (
                <Marker coordinate={posList[posList.length - 1]}>
                    <Icon 
                        name='locate'
                        type='ionicon'
                        color='red'
                    />
                </Marker>
            )} */}
        </View>
    );
}

export default Route;
