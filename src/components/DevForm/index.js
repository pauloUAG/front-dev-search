import React, {useState, useEffect} from 'react';



function DevForm({onSubmit}) {

    //Guardando o estado dos valores de latitude e longitude para serem passados para o component
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

      //useEffect: Executa uma função cada vez que um evento ocorrer. Por exemplo, quando o render é realizado
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        },
        (err) => {
            console.log(err);
        },
        {
            timeout: 30000,
        }
        )
    },[]);

    async function handleAddDev(e) {
        e.preventDefault();
        await onSubmit(
            {
                github_username,
                techs,
                latitude,
                longitude,
            }
        );

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAddDev}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          {/* onChange: Sempre que um valor for passado no input, o evento "e" chama a função 
          que altera o valor no estado--> */}
          <input 
            name="github_username" 
            id="github_username" 
            required 
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
            />
        </div>
        
        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          {/* onChange: Sempre que um valor for passado no input, o evento "e" chama a função 
          que altera o valor no estado--> */}
          <input 
            name="techs" 
            id="techs" 
            required 
            value={techs}
            onChange={e => setTechs(e.target.value)}
            />
        </div>

        <div className="input-group">
          {/* onChange: Sempre que um valor for passado no input, o evento "e" chama a função 
          que altera o valor no estado--> */}
          <div className="input-block">
            <label htmlFor="latitude">latitude</label>
            <input 
              
              name="latitude" 
              id="latitude" 
              required 
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          {/* onChange: Sempre que um valor for passado no input, o evento "e" chama a função 
          que altera o valor no estado--> */}
          <div className="input-block">
            <label htmlFor="longitude">longitude</label>
            <input 
               
              name="longitude" 
              id="longitude" 
              required 
              value={longitude} 
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Salvar</button>          
        
      </form>
    );
}

export default DevForm;