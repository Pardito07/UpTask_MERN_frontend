import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [ alerta, setAlerta ] = useState({});

    useEffect( () => {
        const comprobarToken = async () => {
            try {
                const { data } = await clienteAxios.get(`/usuarios/confirmar/${params.token}`);
                setAlerta({
                    msg: data.msg,
                    error: false
                });

                setTimeout(() => {
                    navigate('/');
                }, 4000);
                
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }

        comprobarToken();
    }, []);

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-6xl text-sky-600 font-black capitalize">Confirma tu cuenta y comienza a crear tus <span className="text-slate-700">proyectos</span></h1>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { msg && <Alerta alerta={alerta}/> }
            </div>
        </>
    )
}

export default ConfirmarCuenta