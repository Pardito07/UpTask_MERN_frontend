import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda';

const Header = () => {

  const { cerrarSesionAuth } = useAuth();
  const { handleBuscador, cerrarSesion } = useProyectos();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesion();
    localStorage.removeItem('token');
  }

  return (
    <header className="px-4 py-5 bg-white boder-b">
      <div className="flex flex-col md:flex-row md:justify-between">
        <Link to="/proyectos">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5">UpTask</h2>
        </Link>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button
            type='button'
            className='font-bold uppercase'
            onClick={handleBuscador}
          >
            Buscar Proyecto
          </button>

          <Link
              to="/proyectos"
              className='font-bold uppercase'
          >Proyectos</Link>

          <button
            onClick={handleCerrarSesion}
            type='button'
            className='bg-sky-600 font-black uppercase text-white p-3 rounded-md text-sm hover:cursor-pointer hover:bg-sky-700'
          >Cerrar Sesión</button>
        </div>

        <Busqueda/>
      </div>
    </header>
  )
}

export default Header
