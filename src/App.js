
import './App.css';
import AddProduct from './Components/AddProduct';
import NavSideBar from './Components/NavSideBar';
import ProductTable from './Components/ProductTable';


function App() {
  return (
    
    <div className='h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-[#f1f5f9]  outline-none'>
       <NavSideBar></NavSideBar>    
       <ProductTable></ProductTable>
    </div>
    
  );
}

export default App;


