import React from "react";
import { StyleSheet, View } from "react-native";
import { BarCodeScanner, Permissions } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  _handleBarCodeRead({ type, data }) {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission) {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner style={{ flex: 1 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
