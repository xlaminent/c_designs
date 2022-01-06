import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AccessContext from "../../context/AccessContext";
import generateLongId from "../../assets/GenerateLong";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const emptyAccount = {
    email: "",
    password: "",    
    token: "",
};

const STATUS = {
    START: "START",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    CONFIRMED: "CONFIRMED",
};

export default function Register() {
    const [account, setAccount] = useState(emptyAccount);
    const [status, setStatus] = useState(STATUS.START);
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({}); 
    const [auth, setAuth] = useContext(AccessContext);
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("users")) ?? null;
        } catch {
            console.error("Could not get user.");
            return [];
        }
    });

    const navigate = useNavigate();
    const errors = getErrors(account);
    const isValid = Object.keys(errors).length === 0;

    function handleBlur(event) {
        setTouched((current) => {
            return {...current, [event.target.id] : true}
        });
    }

    function handleChange(event) {
        event.persist(); 
        setAccount ((currentAccount) => {
            return {
                ...currentAccount, [event.target.id] : event.target.value,
            }
        })
    }

    function saveAccount(account) {
        return fetch(baseUrl + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
        },
            body: JSON.stringify(account),
        });
    }

    useEffect(() => {
            localStorage.setItem("users", JSON.stringify(user));
        }, [user]
    );

    function registerUser(account) {
        setUser(() => {
            return account;
        });
    }

  async function handleSubmit(event) {
        event.preventDefault(); 
        setStatus(status.SUBMITTING);

        if (isValid) {
            try {
                await saveAccount(account);
                setStatus(STATUS.CONFIRMED);
            } catch (e) {
                setError(e);
            }
        } else {
            setStatus(STATUS.SUBMITTED)
        }
    }

    function getErrors(account) {
        const result = {};
        if (!account.email) result.email = "Email is required.";
        if (!account.password) result.password = "Password is required.";

        return result;
    } 

    if (error) throw error;

    if (status === STATUS.CONFIRMED) {
        navigate("/account");
        setAuth(account.token);
    }

    return (
        <section className="form">
        <h1>Register Account</h1>
        {!auth ? (
            <form onSubmit={handleSubmit}>
                <div className="form__container">
                    <div className="form__part">
                        <h2>Fill our form to complete the registration.</h2>
                        <div className="form__part__fields">
                            <div>
                                <label htmlFor="email">Email Address<span title="Required field">*</span></label>
                                <input id="email" type="email" defaultValue={account.email} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.email || status === STATUS.SUBMITTED) && errors.email}</p>
                            </div>

                            <div>
                                <label htmlFor="password">Password <span title="Required field">*</span></label>
                                <input id="password" type="password" defaultValue={account.password} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.password || status === STATUS.SUBMITTED) && errors.password}</p>
                            </div>

                            <input id="token" type="hidden" name="token" defaultValue={account.token = generateLongId()} />
                        </div>
                    </div>
                </div>
                <div className="form__end">
                    <button disabled={status === STATUS.SUBMITTING} type="submit" className="button button__primary" onClick={() => registerUser(account)} title="Create Account">Create Account</button>
                </div>
            </form>
            ) : (<p>You are already logged in with an account. Log out and try again.</p>)
        }
        </section>
    )
}
