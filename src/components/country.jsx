import { useEffect, useState } from "react"
import axios from "axios";

const Country = () => {

    const [usarios, setUsuarios] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/form")
            .then((response) => {
                const users = response.data;
                setUsuarios(users);
            })
            .catch((error) => {
                console.error("Error al obtener los usuarios:", error);
            });
    }, []);

    return (
        <div className="tablass">

            <div class="table">
                <div class="table-header">
                    <div class="header__item">
                        <span id="name" class="filter__link" href="#">
                            Numero
                        </span>
                    </div>
                    <div class="header__item">
                        <span id="wins" class="filter__link filter__link--number" href="#">
                            Nombre
                        </span>
                    </div>
                    <div class="header__item">
                        <span id="draws" class="filter__link filter__link--number" href="#">
                            Pais
                        </span>
                    </div>
                   
                    
                </div>
                <div class="table-content">
                    {
                       usarios && usarios.map((event, index) => (
                            <div key={event.id} class="table-row">
                                <div class="table-data">{index + 1}</div>
                                <div class="table-data">{event.name}</div>
                                <div class="table-data">{event.country}</div>
                            </div>

                        ))
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Country