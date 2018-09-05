import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  FlatList,
  StatusBar,
  Platform,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";

const STATUSBAR_HEIGHT = Platform.OS == "ios" ? 20 : StatusBar.currentHeight;
const TODO = "@todoapp.todo";

const TodoItem = props => {
  return (
    <TouchableOpacity onPress={props.onTapTodoItem}>
      <Text
        style={[
          styles.todoItem,
          (() => {
            if (props.done) {
              return styles.todoItemDone;
            }
          })()
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [
        { index: 1, title: "aa", done: false },
        { index: 2, title: "bb", done: true },
        { index: 3, title: "cc", done: false }
      ],
      currentIndex: 2,
      inputText: "",
      filterText: ""
    };
  }

  componentDidMount() {
    this.loadTodo();
  }

  loadTodo = async () => {
    try {
      const todoString = await AsyncStorage.getItem(TODO);
      if (todoString) {
        const todo = JSON.parse(todoString);
        const currentIndex = todo.length;
        this.setState({
          todo,
          currentIndex
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  saveTodo = async todo => {
    try {
      const todoString = JSON.stringify(todo);
      await AsyncStorage.setItem(TODO, todoString);
    } catch (err) {
      console.log(err);
    }
  };

  onAddItem = () => {
    const title = this.state.inputText;
    if (!title) {
      return;
    }
    const index = this.state.currentIndex + 1;
    const newTodo = {
      index,
      title,
      dome: false
    };
    const todo = [...this.state.todo, newTodo];
    this.setState({
      todo,
      currentIndex: index,
      inputText: ""
    });

    this.saveTodo(todo);
  };

  onTapTodoItem = todoItem => {
    console.log(todoItem);
    const todo = this.state.todo;
    const index = todo.indexOf(todoItem);
    todoItem.done = !todoItem.done;
    todo[index] = todoItem;
    this.setState({ todo });
    this.saveTodo(todo);
  };

  render() {
    const filterText = this.state.filterText;
    let todo = this.state.todo;
    if (filterText) {
      todo = todo.filter(todo => {
        return todo.title.includes(filterText);
      });
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.filter}>
          <TextInput
            onChangeText={filterText => {
              this.setState({
                filterText
              });
            }}
            value={this.state.filterText}
            style={styles.inputText}
            placeholder="type filter text"
          />
        </View>
        <ScrollView style={styles.todolist}>
          <FlatList
            data={todo}
            extraData={this.state}
            renderItem={({ item }) => (
              <TodoItem
                title={item.title}
                done={item.done}
                onTapTodoItem={() => {
                  this.onTapTodoItem(item);
                }}
              />
            )}
            keyExtractor={(item, index) => "todo_" + index}
          />
        </ScrollView>
        <View style={styles.input}>
          <TextInput
            onChangeText={inputText => {
              this.setState({
                inputText
              });
            }}
            value={this.state.inputText}
            style={styles.inputText}
          />
          <Button
            onPress={this.onAddItem}
            title="add"
            color="#841584"
            style={styles.inputButton}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: STATUSBAR_HEIGHT
  },
  filter: {
    height: 50
  },
  todolist: {
    flex: 1
  },
  todoItem: {
    fontSize: 20,
    backgroundColor: "#fff"
  },
  todoItemDone: {
    backgroundColor: "#f99"
  },
  input: {
    height: 30,
    flexDirection: "row"
  },
  inputText: {
    flex: 1
  },
  inputButton: {
    width: 100
  }
});
