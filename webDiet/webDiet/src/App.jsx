import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouteConfig } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RouteConfig />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
