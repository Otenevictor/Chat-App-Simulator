import { Provider } from 'react-redux';
import store from './store/store';
import Chat from './components/Chat';

export default function App() {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
}
