import './App.scss';
import './config/firebase'

import 'bootstrap/dist/js/bootstrap.bundle'

import Routes from './pages/Routes';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './contexts/AuthContext';
import ListProductProvider from './contexts/ListProduct';
import ProductContextProvider from './contexts/ProductContext';
import FilterContextProvider from './contexts/FilterContext';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#ECECEC' }}>

      <ProductContextProvider>
        <FilterContextProvider>
          <AuthContextProvider>
            <ListProductProvider>
              <CartContextProvider>
                <Routes />
              </CartContextProvider>
            </ListProductProvider>
          </AuthContextProvider>
        </FilterContextProvider>
      </ProductContextProvider>

      <ToastContainer />

    </div>
  );
}

export default App;
