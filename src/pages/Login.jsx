import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            return;
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password });
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/proyectos');
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
            <h1 className="text-6xl text-sky-600 font-black capitalize">Inicia sesión y administra tus <span className="text-slate-700">proyectos</span></h1>

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
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-700 text-xl font-bold block"
                    >Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password de Registro"
                        className="border w-full p-3 rounded-lg mt-3 bg-gray-50"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="mt-5 py-3 bg-sky-600 w-full text-white font-bold rounded-md uppercase hover:bg-sky-700 cursor-pointer transition-colors"
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link
                    to="/registrar"
                    className='text-sm text-slate-500 text-center block my-5'
                >¿No tienes una cuenta? Registrate</Link>
                <Link
                    to="/olvide-password"
                    className='text-sm text-slate-500 text-center block my-5'
                >Olvidé Mi Password</Link>
            </nav>
        </>
    )
}

export default Login