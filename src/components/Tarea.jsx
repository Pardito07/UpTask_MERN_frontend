import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {

    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea;

    const { handleTarea, handleEliminarTarea, completarTarea } = useProyectos();
    const admin = useAdmin();

    return (
        <div className="border-b p-5 flex justify-between items-center mb-3 rounded-lg shadow bg-white">
            <div className="flex items-start flex-col">
                <p className="mb-2 text-xl">{ nombre }</p>
                <p className="mb-2 text-sm text-gray-500 uppercase">{ descripcion }</p>
                <p className="mb-2 text-sm">Fecha de Entrega: { formatearFecha(fechaEntrega) }</p>
                <p className="mb-2 text-gray-600">Prioridad: { prioridad }</p>
                { estado && <p className="bg-green-500 text-white text-sm font-bold p-1 rounded-lg">Completado por: {tarea.completado.nombre}</p> }
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
                { admin && (
                    <button
                        onClick={ () => handleTarea(tarea) }
                        type="button"
                        className="px-4 py-3 bg-indigo-600 text-white text-sm font-bold uppercase rounded-lg"
                    >
                        Editar
                    </button>
                )}

                <button
                    onClick={ () => completarTarea(_id) }
                    type="button"
                    className={`px-4 py-3 ${ estado ? 'bg-sky-600' : 'bg-gray-600' } text-white text-sm font-bold uppercase rounded-lg`}
                >{ estado ? 'Completa' : 'Incompleta' }
                </button>

                { admin && (
                    <button
                        onClick={ () => handleEliminarTarea(tarea) }
                        type="button"
                        className="px-4 py-3 bg-red-600 text-white text-sm font-bold uppercase rounded-lg"
                    >
                        Eliminar
                    </button>
                )}
            </div>

        </div>
    )
}

export default Tarea