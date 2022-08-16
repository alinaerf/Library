/*import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"*/
const Books = ({books,filter,setFilter, show}) => {
  const allBooks=books
  /*if (allBooks.loading){
    return <div>loading...</div>
  }*/
  if (!show) {
    return null
  }
  const initialBooks=allBooks
  const genres=initialBooks.map(a=>a.genres)
  const genresList=[... new Set(genres.join(',').split(','))]
  const setGenre=(genre)=>{
    if (genre==='all genres'){
      setFilter(null)
    } else{
      setFilter(genre)
    }
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        <select onClick={({target})=>setGenre(target.value)}>
        <option value={'all genres'}>all genres</option>
        {genresList.map(a=><option value={a}>{a}</option>)}
        </select></div>
      <div>{filter?<div>in genre <strong>{filter}</strong></div>:null}</div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books