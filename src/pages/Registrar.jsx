import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const Registrar = () => {

    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
            return;
        }

        if(password !== repetirPassword){
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
            return;
        }

        if(password.length < 6){
            setAlerta({
                msg: 'El password debe contener al menos 6 caracteres',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);
            return;
        }

        setAlerta({});

        try {
            const { data } = await clienteAxios.post(`/usuarios`, { nombre, password, email });

            setAlerta({
                msg: data.msg,
                error: false
            });

            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-6xl text-sky-600 font-black capitalize">Crea una cuenta y administra tus <span className="text-slate-700">proyectos</span></h1>

            { msg && <Alerta alerta={alerta}/> }

            <form
                className="my-10 bg-white p-10 rounded-md shadow"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        htmlFor="nombre"
                        className="uppercase text-gray-700 text-xl font-bold block"
                    >Nombre</label>
                    <input
                        type="nombre"
                        id="nombre"
                        placeholder="Tu Nombre"
                        className="border w-full p-3 rounded-lg mt-3 bg-gray-50"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value) }
                    />
                </div>

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

                <div className="my-5">
                    <label
                        htmlFor="password2"
                        className="uppercase text-gray-700 text-xl font-bold block"
                    >Repetir Password</label>
                    <input
                        type="password"
                        id="password2"
                        placeholder="Repite tu Password"
                        className="border w-full p-3 rounded-lg mt-3 bg-gray-50"
                        value={repetirPassword}
                        onChange={ e => setRepetirPassword(e.target.value) }
                    />
                </div>

                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="mt-5 py-3 bg-sky-600 w-full text-white font-bold rounded-md uppercase hover:bg-sky-700 cursor-pointer transition-colors"
                />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link
                    to="/"
                    className='text-sm text-slate-500 text-center block my-5'
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                    to="/olvide-password"
                    className='text-sm text-slate-500 text-center block my-5'
                >Olvidé Mi Password</Link>
            </nav>
        </>
    )
}

export default Registrar