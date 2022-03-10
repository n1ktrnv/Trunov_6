import * as React from 'react';
import { 
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  Easing 
} from 'react-native';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  render() {
      return (
        <Animated.View style={[styles.container, {opacity: this.state.opacity}]}>
          <Image
        source={{
          uri:
            'https://camo.githubusercontent.com/78022ea01bb4fb55dae42a89840c920a70f43a427a2cb3c916b9e49f26c0e907/68747470733a2f2f73756e392d31322e757365726170692e636f6d2f696d70662f3262304f424b3873425f753445443859456d56566e4a694b6e36624d782d4e476a70686739772f334634454536336770716b2e6a70673f73697a653d307830267175616c6974793d39302670726f78793d31267369676e3d626430393137356662353866633865663037313063653332353863303666376426635f756e69715f7461673d337745764c6d6975714b36706945764644552d4d6d47587339636b6d5364513951424b75717a476961477726747970653d766964656f5f7468756d62',
        }}
        style={{ width: 300, height: 100 }}
      />
        </Animated.View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 8,
  }
});

export default SplashScreen;
