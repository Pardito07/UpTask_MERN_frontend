import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import FormularioProyecto from "../components/FormularioProyecto"
import Spinner from '../components/Spinner'

const EditarProyecto = () => {

    const { obtenerProyecto, proyecto, cargando, setAlerta, eliminarProyecto } = useProyectos();

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

        obtenerProyecto(params.id);
    }, []);

    const handleClick = () => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar este proyecto?',
            text: "No podrás revertir los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0284c7',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.isConfirmed) {
                eliminarProyecto(params.id);
            }
        });
    }

    if(cargando){
        <div className='flex items-center justify-center min-h-screen'>
            <Spinner/>
        </div>
    }
    
    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className="text-4xl font-black">Editar Proyecto: {proyecto.nombre}</h2>

                <Link
                    onClick={handleClick}
                    className='flex items-center px-3 gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer font-bold uppercase'
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Eliminar</Link>

            </div>
            <div className="md:w-2/3 lg:w-3/4 xl:w-2/5 mx-auto">
                <FormularioProyecto/>
            </div>
        </>
    )
}

export default EditarProyecto