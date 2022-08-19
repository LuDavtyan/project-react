import React, { useEffect, useState } from "react";
import { API_URL } from "../../core/urls";
import Pagination from "../common/pagination";
import Loading from "../loading/loading";
import Table from "./table";
import './table.css'
export const Context = React.createContext();

const List = () =>{
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
  

  const fetchCurrencies = () =>{
      const url = `${API_URL}page=${page}&per_page=20`
      setIsLoading(true)
      fetch(url)
      .then((response) =>{
          if(response.status === 200 || response.ok){
              return response.json()
          }
          throw new Error();
      }).then(result =>{
        setIsLoading(false);
        setCurrencies(result)  
      }).catch((err)=>{
        setIsLoading(false);
        setError(err.message)
      })
    }

    useEffect(() =>{
        fetchCurrencies()
    },[page])

   const handleChangePagination = (direction) =>{
        const nextPage = direction === 'next' ? page + 1 : page - 1;
        setPage(nextPage);
    }
     
        if(error){
            return <div>{error}</div>
        }
        if(isLoading){
            return <div className="loading-container">
                <Loading/>
                </div>
        }
        return (

          <>
           <Context.Provider value={{
               handleChangePagination,
                  page,
                  totalPages,
                  currencies
           }}>
           <Table/>
           <Pagination/>  
           </Context.Provider>      
          </>
        )
    }
export default List;