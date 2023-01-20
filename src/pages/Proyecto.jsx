import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import useProyectos from "../hooks/useProyectos"
import useAdmin from '../hooks/useAdmin'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from '../components/Tarea'
import Colaborador from '../components/Colaborador';
import Spinner from '../components/Spinner'
import Alerta from '../components/Alerta';

let socket;

const Proyecto = () => {

    const { obtenerProyecto, proyecto, cargando, setAlerta, handleModalTarea, alerta, setColaborador, submitTareaProyecto, submitEliminarTarea, submitEditarTarea, submitEstado, submitColaboradores } = useProyectos();
    const admin = useAdmin();
    
    const params = useParams();
    const navigate = useNavigate();

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
        
        setColaborador({})
        obtenerProyecto(params.id);
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('abrir proyecto', params.id);
    }, []);

    useEffect(() => {
        socket.on('tarea agregada', tareaNueva => {
            if(tareaNueva.proyecto === proyecto._id){
                submitTareaProyecto(tareaNueva);
            }
        });

        socket.on('tarea eliminada', tareaEliminada => {
            if(tareaEliminada.proyecto === proyecto._id){
                submitEliminarTarea(tareaEliminada)
            }
        });

        socket.on('tarea actualizada', tareaActualizada => {
            if(tareaActualizada.proyecto._id === proyecto._id){
                submitEditarTarea(tareaActualizada);
            }
        });

        socket.on('nuevo estado', tarea => {
            if(tarea.proyecto._id === proyecto._id){
                submitEstado(tarea);
            }
        });
    });

    const { nombre } = proyecto

    if(cargando){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner/>
            </div>
        )
    }

    const { msg } = alerta;

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black'>{ nombre }</h2>

                { admin && (
                    <Link
                        to={`/proyectos/editar/${proyecto._id}`}
                        className='flex items-center px-3 gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer font-bold uppercase'
                        >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    Editar</Link>
                )}
            </div>
    
            { msg && (
                <div className='w-full md:w-1/2 mx-auto'>
                    <Alerta alerta={alerta}/>
                </div>
            )}

            { admin && (
                <button
                    onClick={ handleModalTarea }
                    type='button'
                    className='mt-5 bg-sky-500 text-white text-sm px-5 py-3 rounded-lg uppercase flex gap-2 items-center justify-center font-bold w-full md:w-auto'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nueva Tarea
                </button>
            )}

            <p className='text-xl font-bold mt-10'>Tareas del Proyecto</p>

            <div className='mt-10'>
                { proyecto.tareas?.length ? 
                    proyecto.tareas?.map( tarea => (
                        <Tarea key={tarea._id} tarea={tarea}/>
                    ))
                    : 
                    <p className='text-center my-5 p-10 bg-white'>No hay Tareas en este Proyecto</p> 
                }
            </div>

            { admin && (
                <>
                    <div className='flex items-center justify-between mt-10'>
                        <p className='text-xl font-bold'>Colaboradores</p>
                        <Link
                            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                            className="text-gray-400 hover:text-black transition-colors uppercase font-bold"
                        >Añadir</Link>
                    </div>


                    <div className='mt-10'>
                        { proyecto.colaboradores?.length ? 
                            proyecto.colaboradores?.map( colaborador => (
                                <Colaborador
                                    key={colaborador._id}
                                    colaborador={ colaborador }
                                />
                            ))
                            : 
                            <p className='text-center my-5 p-10 bg-white'>No hay Colaboradores en este Proyecto</p> 
                        }
                    </div>
                </>
            )}

            <ModalFormularioTarea/>
            <ModalEliminarTarea/>
            <ModalEliminarColaborador/>
        </>
    )
}

export default Proyecto