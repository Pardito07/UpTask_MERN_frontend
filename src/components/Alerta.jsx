const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600 bg-gradient-to-br' : 'from-sky-400 to-sky-600 bg-gradient-to-br'} font-bold uppercase text-center w-full p-3 my-10 text-sm text-white rounded-xl`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta