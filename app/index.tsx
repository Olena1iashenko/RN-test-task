import { AppRegistry } from "react-native";
import store from "./redux/store";
import App from "./App";
import { expo } from "../app.json";
import { Provider } from "react-redux";

const { name: appName } = expo;

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
