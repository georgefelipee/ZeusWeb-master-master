import './App.css';
import GastosCard from './components/gastosCard';
import Header from './components/header';
import Historico from './components/historico';
import { ComprasProvider } from './periodoContext';


function App() {
  return (
    <ComprasProvider>
        <div className="App">
       <Header></Header>
       <div className='container-geral'>
         <GastosCard></GastosCard>
         <Historico></Historico>
       </div>
     </div>
   
    </ComprasProvider>
      
  
  );
}

export default App;
