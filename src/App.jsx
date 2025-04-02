import { Provider } from 'react-redux';
import { Routes, Route } from "react-router"
import store from './store/store';
import Chat from './components/Chat';
import { AuthProvider } from './context/Authcontext';
import { ProtectedRoute } from './Route/ProtectedRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './components/Login';


export default function App() {
  return (
    <>
    <AuthProvider>
          <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        </Provider>
      </AuthProvider>
    </>
  );
}
