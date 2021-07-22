import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { startGoogleLogin, startLoignEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.ui)

    const [ values, handleInputChange ] = useForm({
        email:'',
        password: ''
    });

    const { email, password } = values;
    
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoignEmailPassword(email, password) )
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className='auth__title mb-5'>Login</h3>
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate_faster">

                <input 
                    type='text'
                    placeholder='email'
                    name='email'  
                    autoComplete='off'
                    className="auth__input"  
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type='password'
                    placeholder='password'
                    name='password' 
                    className="auth__input"  
                    value={ password } 
                    onChange={ handleInputChange }
                />
                
                <button 
                    type='submit'
                    disabled={ loading }
                    className='btn btn-primary pointer btn-block'
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                </div>
                
                <div 
                    className="google-btn mb-5 "
                    onClick={ handleGoogleLogin }
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>

                <Link 
                    to='/auth/register'
                    className='link'
                >
                    Create new acount
                </Link>

            </form>
        </>
    )
}
