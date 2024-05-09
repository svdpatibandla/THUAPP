import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

import App from "./App";
import { name as appName } from "./app.json";
import { store } from './redux/store';
export default function Main() {

  return (
    <PaperProvider>
       <Provider store={store}>
      <App />
    </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main)