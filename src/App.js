import React, {useEffect, useState} from 'react';
import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';
import api from './services/api';
import DevItem from './components/Devitem';
import DevForm from './components/DevForm';
//Component: Função ou classe que retorna algum conteudo html, css ou js.
//Propriedade: Atributos do component.
//Estado: Informações mantidas pelo componente. 

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/users');
      setDevs(response.data);    
    }

    loadDevs();

  },[]);

  async function handleSubmitDev(data) {
    
    const response = await api.post('/users', data)

    setDevs([...devs, response.data]);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmitDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;