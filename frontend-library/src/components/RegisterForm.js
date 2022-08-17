import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import { REGISTER } from "../queries"
const RegisterForm =(props)=>{
    const [username, setUsername]=useState("")
    const [favouriteGenre,setGenre]=useState("")
    const [register]=useMutation(REGISTER)
    if (!props.show){
        return null
    }
    const submit =(event)=>{
        event.preventDefault()
        register({variables:{username,favouriteGenre}})
        setUsername("")
        setGenre("")
    }
    return(
        <div>
            <form onSubmit={submit}>
                <div>username <input value={username} onChange={({target})=>setUsername(target.value)}/></div>
                <div> favourite genre: <input value={favouriteGenre} onChange={({target})=>setGenre(target.value)}/></div>
                <button type='submit'>register</button>
            </form>
        </div>
    )
}
export default RegisterForm