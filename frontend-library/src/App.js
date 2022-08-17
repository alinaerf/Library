import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'
import { useQuery, useSubscription } from '@apollo/client/react'
import LoginForm from './components/Login'
import { useApolloClient } from '@apollo/client/react'
import {ME} from './queries'
import Recomendations from './components/Reccomendations'
import { BOOK_ADDED } from './queries'
import RegisterForm from './components/RegisterForm'

export const updateCache = (cache, query, addedBook) => {
  console.log("UPDATE CACHE!")
  const changeAuthors =(a)=>{
    const oldAuth=a.slice(0, a.length-1)
    const newAuth=a[a.length-1]
    const found=oldAuth.filter(item=>item.name===newAuth.name)[0]
    if (found){
      const oldBooks=found.bookCount
      return oldAuth.map(item=>item.name===found.name?{...found, bookCount:oldBooks+1}:item)
    }else{
      return a
    }
  }
  
  cache.updateQuery({query:ALL_BOOKS}, ({allBooks}) => {
    return {
      allBooks: allBooks.concat(addedBook),
    }
  })

  cache.updateQuery({query:ALL_AUTHORS}, ({allAuthors})=>{
    return {
      allAuthors: changeAuthors(allAuthors.concat({...addedBook.author, born:null, bookCount:1}))
    }
  })
}
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken]=useState(null)
  const [filter,setFilter]=useState(undefined)
  const result=useQuery(ALL_AUTHORS)
  const result2=useQuery(ALL_BOOKS,{variables:{filter}})
  const {data, loading, refetch}=useQuery(ME)
  const client=useApolloClient()
  useSubscription(BOOK_ADDED, {
    onSubscriptionData:({subscriptionData})=>{
      const addedBook=subscriptionData.data.bookAdded
      console.log("Added book is:",addedBook)
      window.alert(`Added new book: ${addedBook.title}`)
      updateCache(client.cache, {query:ALL_BOOKS}, addedBook)
    }
  })
  const logout=()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }
  useEffect(()=>{
    refetch()
  })
  if (result.loading|| result2.loading|| loading){
    return <div>loading...</div>
  }
  console.log("USER is:", data.me)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token?<button onClick={() => setPage('add')}>add book</button>:null}
        {token?<button onClick={() => setPage('recomendations')}>recommend</button>:null}
        {!token?<button onClick={()=>setPage('register')}>register</button>:null}
        {!token?<button onClick={()=>setPage('login')}>login</button>:<button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />
      <Books show={page === 'books'} books={result2.data.allBooks} filter={filter} setFilter={setFilter}/>
      <RegisterForm show={page==='register'}/>
      <LoginForm show={page==='login'} setToken={setToken} setPage={setPage} refetch={refetch}/>
      <NewBook show={page === 'add'} />
      {token?<Recomendations show={page==='recomendations'} filter={data.me?data.me.favouriteGenre:null}/>:null}
    </div>
  )
}

export default App
