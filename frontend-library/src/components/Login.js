import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN, ME } from "../queries"
const LoginForm =({setToken, setError, show, setPage,refetch})=>{
    const [username,setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [login,result]=useMutation(LOGIN, {
        onError:(error)=>{
            setError(error.graphQLErrors[0].message)
        },
        refetchQueries:[{query:ME}]
    })

    const submit =(event)=>{
        event.preventDefault()
        login({variables:{username, password}})
        setPage('authors')
        refetch()
    }   

    useEffect(()=>{
        if (result.data){
            const token=result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            refetch()
        }
    }, [result.data])// eslint-disable-line

    if (!show) {
        return null
      }
    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input value={username} onChange={({target})=>setUsername(target.value)}/>
                </div>
                <div>
                    password <input type='password' value={password} onChange={({target})=>setPassword(target.value)}/>
                </div>
                <button type='submits'>login</button>
            </form>
        </div>
    )

}
export default LoginForm