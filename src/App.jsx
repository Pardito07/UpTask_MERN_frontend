import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProyectosProvider } from './context/ProyectosProvider' 

import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Proyectos from './pages/Proyectos'
import NuevoProyecto from './pages/NuevoProyecto'
import Proyecto from './pages/Proyecto'
import EditarProyecto from './pages/EditarProyecto'
import NuevoColaborador from './pages/NuevoColaborador'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path='/' element={<PublicLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:token" element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path="/proyectos" element={<PrivateLayout/>}>
              <Route index element={<Proyectos/>}/>
              <Route path="crear-proyecto" element={<NuevoProyecto/>}/>
              <Route path="editar/:id" element={<EditarProyecto/>}/>
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>}/>
              <Route path=":id" element={ <Proyecto/> }/>
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
