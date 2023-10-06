import { ComprasProvider } from '../../Context/periodoContext';
import GastosCard from '../../components/gastosCard';
import Header from '../../components/header';
import Historico from '../../components/historico';
import './home.css'
import { AuthProvider } from '../../Context/Authprovider';

function Home() {
  return (
   <AuthProvider>
      <ComprasProvider>
          <div className="App">
            <Header></Header>
            <div className='container-geral'>
              <GastosCard/>
              <Historico/>
            </div>
          </div>
      </ComprasProvider>
   </AuthProvider> 
    
      
  
  );
}

export default Home;
