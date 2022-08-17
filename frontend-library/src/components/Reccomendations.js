import { useQuery } from "@apollo/client"
import { ALL_BOOKS} from "../queries"
const Recomendations =(props)=>{
    const filter=props.filter
    const books=useQuery(ALL_BOOKS, {
      variables:{filter}
    })
    if(!props.show){
      return null
  }
    return(
        <div>
            <h2>Book Recommendations</h2>
            <div>Books in your favourite genre <strong>{filter}</strong></div>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!books.loading?books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )):null}
        </tbody>
      </table>
        </div>
    )
}
export default Recomendations