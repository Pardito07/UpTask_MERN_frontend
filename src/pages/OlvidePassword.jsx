import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const OlvidePassword = () => {

    const [ email, setEmail ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if(!email){
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            });
            setTimeout(() => {
                setAlerta({});
            }, 4000);

            return;
        }

        setAlerta({});

        try {
            const { data } = await clienteAxios.post('/usuarios/olvide-password', {email});
            setAlerta({
                msg: data.msg,
                error: false
            });
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

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-6xl text-sky-600 font-black capitalize">Recupera el acceso y no pierdas tus <span className="text-slate-700">proyectos</span></h1>

            { msg && <Alerta alerta={alerta}/> }

            <form
                className="my-10 bg-white p-10 rounded-md shadow"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-700 text-xl font-bold block"
                    >Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email de Registro"
                        className="border w-full p-3 rounded-lg mt-3 bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Enviar Instrucciones"
                    className="mt-5 py-3 bg-sky-600 w-full text-white font-bold rounded-md uppercase hover:bg-sky-700 cursor-pointer transition-colors"
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link
                    to="/"
                    className='text-sm text-slate-500 text-center block my-5'
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                    to="/registrar"
                    className='text-sm text-slate-500 text-center block my-5'
                >¿No tienes una cuenta? Registrate</Link>
            </nav>
        </>
    )
}

export default OlvidePassword