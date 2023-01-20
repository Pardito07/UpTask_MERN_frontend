import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioProyecto = () => {

    const [ id, setId ] = useState(null);
    const [ nombre, setNombre ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ fechaEntrega, setFechaEntrega ] = useState('');
    const [ cliente, setCliente ] = useState('');
    const params = useParams();

    const { proyecto, proyectoSubmit, alerta, setAlerta } = useProyectos();

    useEffect(() => {
        if(params.id && proyecto.nombre){
            setId(proyecto._id);
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        }
        
    }, [params, proyecto]);

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            return;
        }

        await proyectoSubmit({ id, nombre, descripcion, fechaEntrega, cliente });
        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    }

    const { msg } = alerta;
    
    return (

        <form
            className="bg-white shadow-md p-5 w-full mx-auto mt-10 rounded-lg"
            onSubmit={ handleSubmit }
        >
            {msg && <Alerta alerta={alerta}/>}
            
            <div className="my-5">
                <label
                    htmlFor="nombre"
                    className="block font-bold text-gray-600 uppercase text-sm"
                >Nombre Proyecto</label>
                <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre del Proyecto"
                    className="border p-2 rounded-md w-full mt-3"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="descripcion"
                    className="block font-bold text-gray-600 uppercase text-sm"
                >Descripción</label>
                <textarea
                    id="descripcion"
                    placeholder="Descripción del Proyecto"
                    className="border p-2 rounded-md w-full mt-3"
                    value={descripcion}
                    onChange={ e => setDescripcion(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="fecha-entrega"
                    className="block font-bold text-gray-600 uppercase text-sm"
                >Fecha Entrega</label>
                <input
                    type="date"
                    id="fecha-entrega"
                    className="border p-2 rounded-md w-full mt-3"
                    value={fechaEntrega}
                    onChange={ e => setFechaEntrega(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="cliente"
                    className="block font-bold text-gray-600 uppercase text-sm"
                >Nombre Cliente</label>
                <input
                    type="text"
                    id="cliente"
                    placeholder="Nombre del Cliente"
                    className="border p-2 rounded-md w-full mt-3"
                    value={cliente}
                    onChange={ e => setCliente(e.target.value) }
                />
            </div>

            <input
                type="submit"
                value={`${ id ? 'Actualizar Proyecto' : 'Crear Proyecto' }`}
                className="my-5 bg-sky-600 p-3 rounded-md text-white font-bold uppercase w-full cursor-pointer"
            />
        </form>
    )
}

export default FormularioProyecto