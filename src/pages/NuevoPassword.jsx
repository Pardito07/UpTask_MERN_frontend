import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const NuevoPassword = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const [ tokenValido, setTokenValido ] = useState(false);

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${params.token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });

                setTimeout(() => {
                    setAlerta({});
                }, 4000);

                setTokenValido(false);
            }
        }

        comprobarToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(password === '' || password.length < 6){
            setAlerta({
                msg: 'El password debe contener al menos 6 caracteres',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            return;
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password/${params.token}`, { password });
            setAlerta({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/');
            }, 4000);
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-6xl text-sky-600 font-black capitalize">Reestablece tu password y no pierdas acceso a tus <span className="text-slate-700">proyectos</span></h1>

            { msg && <Alerta alerta={alerta}/> }

            { tokenValido && (

                <form
                    className="my-10 bg-white p-10 rounded-md shadow"
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-700 text-xl font-bold block"
                        >Nuevo Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Nuevo Password"
                            className="border w-full p-3 rounded-lg mt-3 bg-gray-50"
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </div>

                    <input
                        type="submit"
                        value="Reestablecer Password"
                        className="mt-5 py-3 bg-sky-600 w-full text-white font-bold rounded-md uppercase hover:bg-sky-700 cursor-pointer transition-colors"
                    />
                </form>
            )}
        </>
    )
}

export default NuevoPassword