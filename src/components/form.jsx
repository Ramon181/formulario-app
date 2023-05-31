import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        country: "",
    });

    const [countries, setCountries] = useState([]);
    const [error, setError] = useState("");
    const [toastError, setToastError] = useState(false);
    const [success, setSuccess] = useState("");
    const [toastSuccess, setToastSuccess] = useState(false);



    useEffect(() => {
        axios
            .get("https://restcountries.com/v2/all")
            .then((response) => {
                setCountries(response.data);
            })
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.firstName) {
            setError("Por favor llene los campos")
            setToastError(true)
        }
        if (!formData.secondName) {
            setError("Por favor llene los campos")
            setToastError(true)
        }
        if (!formData.country) {
            setError("Por favor llene los campos")
            setToastError(true)
        } else {
            const data = {
                name: formData.firstName + " " + formData.secondName,
                country: formData.country
            }
            axios
                .post("http://localhost:3001/form", data)
                .then((response) => {
                    return response.data;
                })
            setError("")
            setToastError(false);
            setSuccess("Los dataos fueron guardados")
            setToastSuccess(true);
            setFormData({
                firstName: "",
                secondName: "",
                country: ""
            })
        }
    };


    return (
        <div className="main_form" >
            <form onSubmit={handleSubmit} className='login-form'>
                {
                    toastError ? (
                        <div className="toast_error">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <g transform="translate(.077 .077)">
                                    <g>
                                        <path
                                            fill="#fff"
                                            d="M10.915 9.98l2.853-2.846a.666.666 0 00-.942-.942L9.979 9.044 7.133 6.191a.666.666 0 00-.942.942L9.044 9.98 6.19 12.826a.666.666 0 10.942.942l2.846-2.853 2.846 2.853a.666.666 0 10.942-.942z"
                                            transform="translate(-2.017 -2.018)"
                                        ></path>
                                    </g>
                                </g>
                            </svg></div>
                            <div className="content">
                                <p >{error}</p>
                            </div>
                            <div onClick={() => {
                                setError("")
                                setToastError(false)
                            }} type="button" className="close" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <g transform="translate(.077 .077)">
                                        <g>
                                            <path
                                                fill="#fff"
                                                d="M10.915 9.98l2.853-2.846a.666.666 0 00-.942-.942L9.979 9.044 7.133 6.191a.666.666 0 00-.942.942L9.044 9.98 6.19 12.826a.666.666 0 10.942.942l2.846-2.853 2.846 2.853a.666.666 0 10.942-.942z"
                                                transform="translate(-2.017 -2.018)"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    ) : null
                }
                {
                    toastSuccess ? (
                        <div className="toast_success">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <g transform="translate(.077 .077)">
                                        <g>
                                            <path
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M3.719 7.884L6.235 10.4l3.032-3.032 2.774-2.774"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="content">
                                <p >{success}</p>
                            </div>
                            <div onClick={() => {
                                setSuccess("")
                                setToastSuccess(false)
                            }} type="button" className="close" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <g transform="translate(.077 .077)">
                                        <g>
                                            <path
                                                fill="#fff"
                                                d="M10.915 9.98l2.853-2.846a.666.666 0 00-.942-.942L9.979 9.044 7.133 6.191a.666.666 0 00-.942.942L9.044 9.98 6.19 12.826a.666.666 0 10.942.942l2.846-2.853 2.846 2.853a.666.666 0 10.942-.942z"
                                                transform="translate(-2.017 -2.018)"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    ) : null
                }

                <div className="flex-row">
                    <label className="lf--label" htmlFor="first_name">
                        Nombre
                    </label>
                    <input id="first_name" value={formData.firstName} onChange={handleChange} name="firstName" className='lf--input' placeholder='Nombre' type='text' />
                </div>
                <div className="flex-row">
                    <label className="lf--label" htmlFor="second_name">
                        Apellido
                    </label>
                    <input id="second_name" value={formData.secondName} onChange={handleChange} name="secondName" className='lf--input' placeholder='Apellido' type='text' />
                </div>
                <div className="flex-row">
                    <label className="lf--label" htmlFor="slct">
                        Pais
                    </label>
                    <label className="select" htmlFor="slct">
                        <select value={formData.country} id="slct" name="country" onChange={handleChange}>
                            <option value="" disabled="disabled">Seleccionar Pais</option>
                            {
                                countries && countries.map((e, index) => (
                                    <option key={index} value={e.name}>{e.name}</option>
                                ))
                            }
                        </select>
                        <svg>
                            <use href="#select-arrow-down"></use>
                        </svg>
                    </label>
                    <svg className="sprites">
                        <symbol id="select-arrow-down" viewBox="0 0 10 6">
                            <polyline points="1 1 5 5 9 1"></polyline>
                        </symbol>
                    </svg>
                </div>
                <input className='lf--submit' type='submit' value='Guardar' />
            </form>
        </div>
    )
}
export default Form