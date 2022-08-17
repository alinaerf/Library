import { gql } from "@apollo/client";
const BOOK_DETAILS= gql`
    fragment BookDetails on Book{
        title
        author{
            name
        }
        published
        genres
        id
    }
`
export const BOOK_ADDED= gql`
    subscription{
        bookAdded{
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`
export const ALL_BOOKS_FILTER=gql`
    query {
        allBooks{
            title
            author{
                name
            }
            published
            genres
        }
    }
`
export const ALL_BOOKS=gql`
    query allBooks($filter:String){
        allBooks (genre: $filter) {
            title
            author{
                name
            }
            published
            genres
            id
        }
    }
`

export const ALL_AUTHORS=gql`
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`
export const ADD_BOOK=gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author{
                name
                born
                id
                bookCount
            }
            published
            genres
            id
        }
    }
`
export const EDIT_AUTHOR= gql`
    mutation EditAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, born: $born) {
        name
        born
        id
        bookCount
        }
    }
`
export const LOGIN=gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
        value
        }
    }
`
export const ME=gql`
    query{
        me{
            username
            favouriteGenre
            id
        }
    }
`
export const REGISTER =gql`
    mutation Register($username: String!, $favouriteGenre: String!) {
        createUser(username: $username, favouriteGenre: $favouriteGenre) {
          username
          favouriteGenre
          id
        }
      }
`