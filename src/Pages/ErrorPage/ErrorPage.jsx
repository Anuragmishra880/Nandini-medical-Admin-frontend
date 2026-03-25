import './ErrorPage.css'
import { NavLink } from 'react-router-dom'
const ErrorPage = () => {
    return (
        <>
            <div className='container'>
                <div>
                    <h2>404</h2>
                    <h3>UH OH! You're lost.</h3>
                    <p>The page you are looking for does not exists. How you got here is a mystery. But you can click the button below to go back to the home page</p>
                    <NavLink className='backHome' to='/'>
                        <button>
                            Go Back To HOME
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
