import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";
 
const images = [
  'https://upload.wikimedia.org/wikipedia/commons/a/a1/Finuniver_mainbuilding.jpg',
  'https://www.securitymedia.ru/pic/publication/14.20.2020-7.jpg',
  'https://avatars.mds.yandex.net/get-altay/467304/2a0000015eb38955821922ee7fc414de23f0/XXL',
  'https://avatars.mds.yandex.net/get-altay/787110/2a000001619b0c33e3fbce90846cfe936fe8/XXL',
  'http://ooo-merkury.ru/wp-content/uploads/2016/07/1-2-1170x777.jpg',
  'https://avatars.mds.yandex.net/get-altay/367512/2a0000015b3b7fa513c15165f0507666ec64/XXL'
];
 
const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current 
 
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }, [fadeAnim])

 
  return (
      <Animated.View style={[styles.scrollContainer, {opacity: fadeAnim}]}>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={[{flex: 1, }, { width: windowWidth, height: 250 }]}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                </ImageBackground>
                <View style={{paddingHorizontal: 16, paddingTop: 5}}>
                  <Button
                    title="Подробнее"
                    color="#436367"
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </Animated.View>
  );
}
 
const styles = StyleSheet.create({
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
});
 
export default Slider;
