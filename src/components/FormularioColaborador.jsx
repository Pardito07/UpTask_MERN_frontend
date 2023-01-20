import { useState } from 'react'
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioColaborador = () => {

    const [ email, setEmail ] = useState('');

    const { alerta, setAlerta, submitColaborador } = useProyectos();

    const handleSubmit = e => {
        e.preventDefault();

        if(email === ''){
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 4000);

            return;
        }

        submitColaborador(email);
    }

    const { msg } = alerta;

    return (
        <form
            onSubmit={handleSubmit}
            className="md:w-3/4 lg:w-2/5 py-10 px-5 bg-white shadow rounded-lg"
        >
            { msg && <Alerta alerta={alerta}/> }

            <div className='mb-5 w-full'>
                <label
                    htmlFor="email"
                    className='text-gray-700 text-sm uppercase font-bold'
                >
                    Email Colaborador
                </label>
                <input
                    type="email"
                    id='email'
                    placeholder='Email Colaborador'
                    className='w-full p-2 mt-2 border-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />
            </div>

            <input
                type="submit"
                value='Buscar Colaborador'
                className='text-sm uppercase font-bold text-white bg-sky-600 w-full rounded p-3 hover:bg-sky-700 transition-colors cursor-pointer'
            />
        </form>
    )
}

export default FormularioColaborador