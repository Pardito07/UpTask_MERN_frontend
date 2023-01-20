import useProyectos from "../hooks/useProyectos"

const Colaborador = ({ colaborador }) => {

    const { nombre, email } = colaborador;

    const { handleEliminarColaborador } = useProyectos();

    return (
        <div className="border-b p-5 flex justify-between items-center mb-3 rounded-lg shadow bg-white">
            <div>
                <p>{ nombre }</p>
                <p className="text-sm text-gray-700">{ email }</p>
            </div>

            <div>
                <button
                    type="button"
                    className="px-4 py-3 bg-red-600 text-white text-sm font-bold uppercase rounded-lg"
                    onClick={ () => handleEliminarColaborador(colaborador) }
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Colaborador