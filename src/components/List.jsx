import { useEffect, useState } from "react"
import axios from "axios";

const List = () => {

    const [usarios, setUsuarios] = useState([]);
    const [elimina, setElimina] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [toastSuccess, setToastSuccess] = useState(false);

    const fetchFormulario = async () => {
        
        await axios
            .get("https://endless-bolt-388502-service-zg2tz3mrfq-rj.a.run.app/")
            .then((response) => {
                const users = response.data;
                setUsuarios(users);
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        fetchFormulario()
    }, []);

    const handlerDelete = (id, index) => {
        axios.delete(`https://endless-bolt-388502-service-zg2tz3mrfq-rj.a.run.app/form/${id}`)
            .then(response => {
                const message = response.data.message;
                setSuccess(message);
                setToastSuccess(true)
                fetchFormulario();
            })
        const newElimina = [...elimina];
        newElimina[index] = false;
        setElimina(newElimina);
    }

    return (
        <main className="table_main">
            <div className="toast-body">

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
            </div>
            {
                isLoading ? (
                    <span className="loader"></span>
                ) : (
                    <div className="table_body">

                        <div className="tbl-header">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                    <tr>
                                        <th>Numero</th>
                                        <th>Nombre</th>
                                        <th>Pais</th>
                                        <th>Acción</th>
                                    </tr >
                                </thead >
                            </table >
                        </div >
                        <div className="tbl-content">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <tbody>
                                    {
                                        usarios && usarios.map((event, index) => (
                                            <tr key={event.id}>
                                                <td>{index + 1}</td>
                                                <td>{event.name}</td>
                                                <td>{event.country}</td>
                                                <td>
                                                    <button className="button-delete"
                                                        onClick={() => {
                                                            const newElimina = [...elimina];
                                                            newElimina[index] = true;
                                                            setElimina(newElimina);
                                                        }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" /></svg>
                                                        Eliminar
                                                    </button>
                                                    {
                                                        elimina[index] ? (
                                                            <div className="modal">
                                                                <article className="content-wrapper">
                                                                    <button type="button"
                                                                        onClick={() => {
                                                                            const newElimina = [...elimina];
                                                                            newElimina[index] = false;
                                                                            setElimina(newElimina);
                                                                        }}
                                                                        className="close">X</button>
                                                                    <header className="modal-header">
                                                                        <h2>Esta Seguro de que quiere borrar este dato?</h2>
                                                                    </header>
                                                                    <footer className="modal-footer">
                                                                        <button type="button" onClick={() => handlerDelete(event.id, index)} className="action">Si</button>
                                                                        <button type="button"
                                                                            onClick={() => {
                                                                                const newElimina = [...elimina];
                                                                                newElimina[index] = false;
                                                                                setElimina(newElimina);
                                                                            }}
                                                                            className="action">No</button>
                                                                    </footer>
                                                                </article>
                                                            </div>
                                                        ) : null
                                                    }
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >

                )
            }


        </main >
    )
}

export default List