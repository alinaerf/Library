import { useState } from "react"
import { useMutation } from "@apollo/client/react/hooks"
import { EDIT_AUTHOR } from "../queries"
import { ALL_AUTHORS } from "../queries"
const Authors = (props) => {
  const [name,setName]=useState('')
  const [birthyear, setBirthyear]=useState('')
  const [editAuthor]=useMutation(EDIT_AUTHOR,
    {refetchQueries:[{query:ALL_AUTHORS}]})
  if (!props.show) {
    return null
  }
  const authors=props.authors
  const authorNames=authors.map(a=>a.name)
  const submit =(event)=>{
    event.preventDefault()
    const born=parseInt(birthyear, 10)
    editAuthor({variables:{name, born}})
    setBirthyear('')
    setName('')
  }


  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3> Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({target})=>setName(target.value)}>
            {authorNames.map(a=><option value={a} key={a}>{a}</option>)}
          </select>
        </div>
        <div> 
          born <input value={birthyear} onChange={({target})=>setBirthyear(target.value)}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
