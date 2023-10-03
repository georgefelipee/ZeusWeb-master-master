import { ComprasProvider } from '../../Context/periodoContext';
import GastosCard from '../../components/gastosCard';
import Header from '../../components/header';
import Historico from '../../components/historico';
import './home.css'

function Home() {
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

export default Home;
