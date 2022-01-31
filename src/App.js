import { Provider } from "react-redux";
import { store } from "./store/mergeReducers";
import { Navigator } from "./Navigator";

function App() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}

export default App;
