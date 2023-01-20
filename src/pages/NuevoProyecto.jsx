import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
        <h2 className="text-4xl font-black">Crear Proyecto</h2>
        <div className="md:w-2/3 lg:w-3/4 xl:w-2/5 mx-auto">
            <FormularioProyecto/>
        </div>
    </>
  )
}

export default NuevoProyecto
