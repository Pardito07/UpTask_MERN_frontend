import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/clienteAxios';

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const { auth } = useAuth();

    const [ proyectos, setProyectos ] = useState([]);
    const [ proyecto, setProyecto ] = useState({});
    const [ cargando, setCargando ] = useState(true);
    const [ alerta, setAlerta ] = useState({});
    const [ modalFormularioTarea, setModalFormularioTarea ] = useState(false);
    const [ modalEliminarTarea, setModalEliminarTarea ] = useState(false);
    const [ modalEliminarColaborador, setModalEliminarColaborador ] = useState(false);
    const [ tarea, setTarea ] = useState({});
    const [ colaborador, setColaborador ] = useState({});
    const [ buscador, setBuscador ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/proyectos', config);
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerProyectos();
    }, [auth]);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, []);

    const proyectoSubmit = async proyecto => {
        proyecto.id ? await editarProyecto(proyecto) : await crearProyecto(proyecto);
    }

    const crearProyecto = async proyecto => {

        const { nombre, descripcion, fechaEntrega, cliente } = proyecto;

        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', { nombre, descripcion, fechaEntrega, cliente }, config);
            setProyectos([...proyectos, data]);
            setAlerta({
                msg: "Proyecto Creado",
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 4000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const editarProyecto = async proyecto => {
        const { nombre, descripcion, fechaEntrega, cliente, id } = proyecto;

        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${id}`, { nombre, descripcion, fechaEntrega, cliente, id }, config);

            const proyectosActualizados = proyectos.map( registro => registro._id !== id ? registro : data );
            setProyectos(proyectosActualizados);
            
            setAlerta({
                msg: 'Proyecto actualizado',
                error: false
            });
            
            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 4000);
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
            
            const proyectosEliminados = proyectos.filter( registro =>  registro._id !== id);
            setProyectos(proyectosEliminados);

            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 4000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);
        } catch (error) {
            navigate('/proyectos');
            setAlerta({
                msg: 'Proyecto no encontrado',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }

        setCargando(false);
    }

    const submitTarea = async tarea => {
        if(tarea.id){
            editarTarea(tarea);
        }else {
            crearTarea(tarea)
        }
    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas', tarea, config);
        
            setAlerta({});
            setModalFormularioTarea(false);

            socket.emit('nueva tarea', data);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

            socket.emit('actualizar tarea', data);
            setAlerta({});
            setModalFormularioTarea(false);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const eliminarTarea = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tareas/${id}`, config);

            socket.emit('eliminar tarea', tarea);
            setModalEliminarTarea(false);
            setAlerta({
                msg: data.msg,
                error: false
            });
            setTimeout(() => {
                setAlerta({})
            }, 4000);
        } catch (error) {
            
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    }

    const handleModalEliminarTarea = () => {
        setModalEliminarTarea(!modalEliminarTarea);
        setTarea({});
    }

    const handleModalEliminarColaborador = () => {
        setModalEliminarColaborador(!modalEliminarColaborador);
        setColaborador({});
    }

    const handleTarea = tarea => {
        setTarea(tarea);
        setModalFormularioTarea(true);
    }

    const handleEliminarTarea = tarea => {
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }

    const handleEliminarColaborador = colab => {
        setColaborador(colab);
        setModalEliminarColaborador(!modalEliminarColaborador);
    }

    const handleBuscador = () => {
        setBuscador(!buscador);
    }

    const submitColaborador = async email => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config);
            setColaborador(data);
            setAlerta({});

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            setColaborador({});
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config );
            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                setColaborador({});
                navigate(`/proyectos/${proyecto._id}`);
            }, 4000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config );

            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            const proyectoActualizado = { ...proyecto };
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter( colaboradorState => colaboradorState._id !== colaborador._id );

            setProyecto(proyectoActualizado);
            setColaborador({});
            setModalEliminarColaborador(false);
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
        }
    }

    const completarTarea = async id  => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config);
            
            socket.emit('cambiar estado', data);
            setAlerta({});
            setTarea({});
        } catch (error) {
            console.log(error);
        }
    }

    const submitTareaProyecto = tarea => {
        const proyectosActualizado = { ...proyecto };
        proyectosActualizado.tareas = [...proyectosActualizado.tareas, tarea];
        setProyecto(proyectosActualizado);
    }

    const submitEliminarTarea = tarea => {
        const tareasActualizadas = { ...proyecto };
        tareasActualizadas.tareas = tareasActualizadas.tareas.filter( tareaState => tareaState._id !== tarea._id );
        setProyecto(tareasActualizadas);
    }

    const submitEditarTarea = tarea => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActualizado);
    }

    const submitEstado = tarea => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState );
        setProyecto(proyectoActualizado);
    }

    const cerrarSesion = () => {
        setProyectos([]);
        setProyecto({});
        setAlerta({});
    }

    return (
        <ProyectosContext.Provider
            value={{
                setProyectos,
                proyectos,
                obtenerProyecto,
                proyecto,
                cargando,
                proyectoSubmit,
                crearProyecto,
                editarProyecto,
                eliminarProyecto,
                alerta,
                setAlerta,
                modalFormularioTarea,
                handleModalTarea,
                setProyecto,
                submitTarea,
                tarea,
                handleTarea,
                handleModalEliminarTarea,
                modalEliminarTarea,
                handleEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                setColaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                handleEliminarColaborador,
                eliminarColaborador,
                modalEliminarColaborador,
                completarTarea,
                handleBuscador,
                buscador,
                submitTareaProyecto,
                submitEliminarTarea,
                submitEditarTarea,
                submitEstado,
                cerrarSesion
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext