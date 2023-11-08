import { createContext, useState, useEffect } from "react";

export const store = createContext();

function DataStore(props) {
    const [data, setData] = useState([]);
    const fetchdata = () => {
        return fetch("http://localhost:5008/api/findProduct")
            .then((response) => response.json())
            .then((user) => setData(user))
    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <div>
            <store.Provider value={[data, setData]}>
                {props.children}
            </store.Provider>
        </div>
    )
};

export default DataStore;