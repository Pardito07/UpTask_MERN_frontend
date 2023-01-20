import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'

const PreviewProyectos = ({ proyecto }) => {
    
    const { auth } = useAuth();
    const { nombre, cliente, _id, creador } = proyecto;
    
    return (
        <div className="border-b p-5 flex flex-col lg:flex-row gap-2 justify-between">
            
            <div className="flex items-center gap-2">
                <p className="flex-1">
                    { nombre }
                    <span className="text-sm text-gray-500 uppercase"> { cliente }</span>
                </p>

                { auth._id !== creador && (
                    <p className="bg-green-500 p-1 text-white text-sm font-bold uppercase rounded-lg">Colaborador</p>
                )}
            </div>

            <Link
                to={`${_id}`}
                className="uppercase text-gray-500 font-bold"
            >Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyectos