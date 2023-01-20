import { Navigate, Outlet } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';

const PrivateLayout = () => {

    const { auth, cargando } = useAuth();

    if(cargando){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner/>
            </div>
        )
    }

    return (
        <>
            { auth._id ? 
                (
                    <div className='bg-gray-100'>
                        <Header/>

                        <div className='md:flex md:gap-4 md:min-h-screen'>
                            <Sidebar/>

                            <main className='flex-1 mx-auto py-10 px-5'>
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                ) : <Navigate to="/"/> 
            }
        </>
    )
}

export default PrivateLayout