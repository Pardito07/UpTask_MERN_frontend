import useProyectos from "../hooks/useProyectos"
import PreviewProyectos from '../components/PreviewProyectos';
import Alerta from "../components/Alerta";
import Spinner from '../components/Spinner'

const Proyectos = () => {

  const { proyectos, alerta, cargando } = useProyectos();

  const { msg } = alerta;

  if(cargando){
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner/>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      { msg && (
        <div className="md:w-2/3 w-full mx-auto">
          <Alerta alerta={alerta}/>
        </div>
      )}

      <div className='rounded-lg shadow mt-10 lg:w-2/3 mx-auto w-full bg-white'>
        { proyectos.length ? 
          proyectos.map( proyecto => <PreviewProyectos key={proyecto._id} proyecto={proyecto}/> ) : 
          <p className='text-center text-gray-600 uppercase p-10'>No hay proyectos aún</p> 
        }
      </div>
    </div>
  )
}

export default Proyectos
