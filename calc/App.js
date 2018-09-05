import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";

const STATUSBAR_HEIGHT = Platform.OS == "ios" ? 20 : StatusBar.currentHeight;

const CalcButton = props => {
  const flex = props.flex ? props.flex : 1;
  return (
    <TouchableOpacity
      onPress={() => {
        props.btnPress();
      }}
      style={[styles.calcButton, { flex: flex }]}
    >
      <Text style={styles.calcButtonText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const CalcButtons = props => {
  return (
    <React.Fragment>
      {props.buttons.map(button => {
        return (
          <CalcButton
            key={button.label}
            flex={button.flex}
            label={button.label}
            btnPress={button.btnPress}
          />
        );
      })}
    </React.Fragment>
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get("window");
    this.state = {
      results: [],
      current: "0",
      dotInputed: false,
      afterNumButton: false,
      orientation: this.getOrientation(height, width)
    };
  }
  getOrientation = (height, width) => {
    if (height > width) {
      return "portotait";
    } else {
      return "landscape";
    }
  };
  buttons = [
    [
      {
        label: "AC",
        flex: 2,
        btnPress: () => {
          this.btnPressAc;
        }
      },
      {
        label: "C",
        btnPress: () => {
          this.btnPressC;
        }
      },
      {
        label: "+",
        btnPress: () => {
          this.btnPressCalc("+");
        }
      }
    ],
    [
      {
        label: "7",
        btnPress: () => {
          this.btnPress("7");
        }
      },
      {
        label: "8",
        btnPress: () => {
          this.btnPress("8");
        }
      },
      {
        label: "9",
        btnPress: () => {
          this.btnPress("9");
        }
      },
      {
        label: "-",
        btnPress: () => {
          this.btnPressCalc("-");
        }
      }
    ],
    [
      {
        label: "4",
        btnPress: () => {
          this.btnPress("4");
        }
      },
      {
        label: "5",
        btnPress: () => {
          this.btnPress("5");
        }
      },
      {
        label: "6",
        btnPress: () => {
          this.btnPress("6");
        }
      },
      {
        label: "*",
        btnPress: () => {
          this.btnPressCalc("*");
        }
      }
    ],
    [
      {
        label: "1",
        btnPress: () => {
          this.btnPress("1");
        }
      },
      {
        label: "2",
        btnPress: () => {
          this.btnPress("2");
        }
      },
      {
        label: "3",
        btnPress: () => {
          this.btnPress("3");
        }
      }
    ],
    [
      {
        label: "0",
        btnPress: () => {
          this.btnPress("0");
        }
      },
      {
        label: ".",
        btnPress: () => {
          this.btnPress(".");
        }
      },
      {
        label: "/",
        btnPress: () => {
          this.btnPressCalc("/");
        }
      }
    ],
    [
      {
        label: "Enter",
        btnPress: () => {
          this.btnPressEnter();
        }
      }
    ]
  ];
  btnPress(num) {
    console.log("press" + num);
    let currentString = this.state.current;
    const dotInputed = this.state.dotInputed;
    let newDotInputed = dotInputed;
    if (num == ".") {
      currentString = currentString + num;
      newDotInputed = true;
    } else if (currentString == "0") {
      currentString = num;
    } else {
      currentString = currentString + num;
    }
    this.setState({
      current: currentString,
      dotInputed: newDotInputed,
      afterNumButton: true
    });
  }
  btnPressEnter() {
    let newValue = NaN;
    if (this.state.dotInputed) {
      newValue = paresFloat(this.state.current);
    } else {
      newValue = parseInt(this.state.current);
    }
    if (isNaN(newValue)) {
      return;
    }
    let results = this.state.results;
    results.push(newvalue);
    this.setState({
      current: "0",
      dotInputed: false,
      results,
      afterNumButton: false
    });
  }
  btnPressCalc(calc) {
    console.log("press" + calc);
  }
  btnPressAc() {}
  btnPressC() {}
  render() {
    let resultFlex = 3;
    if (this.state.orientation == "landscape") {
      resultFlex = 1;
    }
    return (
      <View style={styles.container}>
        <View style={[styles.results, { flex: resultFlex }]}>
          <View style={styles.resultsLine} />
          <View style={styles.resultsLine} />
          <View style={styles.resultsLine} />
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonsLine}>
            <CalcButtons buttons={this.buttons[0]} />
          </View>
          <View style={styles.buttonsLine}>
            <CalcButtons buttons={this.buttons[1]} />
          </View>
          <View style={styles.buttonsLine}>
            <CalcButtons buttons={this.buttons[2]} />
          </View>
          <View style={styles.lastButtonsLinesContainer}>
            <View style={styles.twoButtonsLines}>
              <View style={styles.buttonsLine}>
                <CalcButtons buttons={this.buttons[3]} />
              </View>
              <View style={styles.buttonsLine}>
                <CalcButtons buttons={this.buttons[4]} />
              </View>
            </View>
            <View style={styles.enterButtonContainer}>
              <CalcButtons buttons={this.buttons[5]} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: STATUSBAR_HEIGHT
  },
  results: {
    flex: 3,
    backgroundColor: "#fff"
  },
  resultsLine: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    borderBottomWidth: 1
  },
  buttons: {
    flex: 5
  },
  buttonsLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1
  },
  lastButtonsLinesContainer: {
    flex: 2,
    flexDirection: "row"
  },
  twoButtonsLines: {
    flex: 3
  },
  enterButtonContainer: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1
  },
  calcButton: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  calcButtonText: {
    fontSize: 30
  }
});
