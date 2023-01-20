import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from '../hooks/useProyectos'
import Spinner from '../components/Spinner'

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador } = useProyectos();
    const params = useParams();

    useEffect(() => {
        if(params.id.length < 24 || params.id.length > 24){
            setAlerta({
                msg: 'Proyecto no encontrado',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            navigate('/proyectos');
            return;
        }
        
        obtenerProyecto(params.id);
    }, []);

    if(cargando){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner/>
            </div>
        )
    }

    return (
        <>
            <h2 className="text-4xl font-black">Añadir Colaborador(a) al proyecto: {proyecto.nombre}</h2>
            
            <div className="mt-10 flex justify-center">
                <FormularioColaborador/>
            </div>

            { cargando ? <div className='flex justify-center items-center min-h-screen'>
                            <Spinner/>
                         </div> 
                       :
              colaborador?._id && <div className='flex justify-center mt-10'>
                                    <div className='px-10 py-5 bg-white shadow rounded-lg md:w-3/4 lg:w-2/5'>
                                        <h2 className='text-center mb-10 text-2xl font-bold'>Resultados:</h2>

                                        <div className='flex justify-between items-center'>
                                            <p>{ colaborador.nombre }</p>
                                            <button
                                                onClick={() => agregarColaborador({
                                                    email: colaborador.email
                                                })}
                                                type='button'
                                                className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                                            >
                                                Agregar Colaborador
                                            </button>
                                        </div>
                                    </div>
                                  </div>
            }
        </>
    )
}

export default NuevoColaborador