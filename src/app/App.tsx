import Router from '../routes';
import { Provider } from 'react-redux';
import { store } from '../store';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
