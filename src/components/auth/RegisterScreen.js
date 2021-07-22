import React from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {

    const {msgError} = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = values;

    const handleRegister = e => {
        e.preventDefault();
        if (ifFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    };

    const ifFormValid = () => {

        if (name.trim().length === 0 || !name) {
            dispatch(setError('name is required'));
            return false
        } else if ( !validator.isEmail( email ) ) {
            dispatch(setError('email is required'));
            return false
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('password should be at least 5 characters and match'));
            return false
        }

        dispatch(removeError());
        return true
    }

    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>
            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate_faster">


                {
                    msgError && 
                    (
                        <div className='auth__alert-error'> 
                            <p>{msgError}</p>
                        </div>
                    )
                }


                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="auth__input"
                />

                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <button
                    type="submit"
                    className="btn btn-primary pointer btn-block mb-5"
                >
                    Register
                </button>

                <Link to="/auth/login" className="link ">
                    Alredy register?
                </Link>
            </form>
        </>
    );
};
