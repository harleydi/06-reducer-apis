import { useEffect, useState } from 'react'
import './App.css'
import { useReducer } from 'react'
import ApiEntry from './components/ApiEntry'

const reducer = (state, action) => {
  switch (action.type) {
    case 'new_route':
      return {
        route: action.newRoute,
        number: state.number
      }
    case 'new_number':
      return {
        route: state.route,
        number: parseInt(action.newNum)
      }
    case 'submit':
      return {
        ...state,
        route: state.route,
        number: state.number ,
        data: action.payload
      }
      
    default:
      return state
      
  }
}


function App() {
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    route: "posts",
    number: "",
    data: []
  })
  
  // useEffect(() => {

  //   const getData = async () => {
  //     try {
  //       const response = await fetch(`https://jsonplaceholder.typicode.com/${state.route}/${state.number}`)
  //       const responseData = await response.json()
  //       console.log(responseData)

  
  //       dispatch({
  //         type: 'submit',
  //         payload: responseData
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getData()
  // }, [state.route, state.number])

  
  console.log(state)


  const getData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${state.route}/${state.number}`)
      const responseData = await response.json()
      console.log(responseData)


      dispatch({
        type: 'submit',
        payload: responseData
      })
    } catch (error) {
      console.log(error)
    }
  }
  // getData()

  

  return (
    <>
      <h1>Customize Your Api Call</h1>
      <div id='search-input'>
        <select className='mt-4 mx-6 p-2' onChange={(e) => dispatch({ type: 'new_route', newRoute: e.target.value })}>
          <option value="posts">Posts</option>
          <option value="todos">Todos</option>
          <option value="users">Users</option>
        </select>
        <input
          className='mx-6 p-2' 
          type='text'
          value={state.number}
          onChange={(e) => dispatch({ type: 'new_number', newNum: e.target.value})}
        />
        <button onClick={getData}>Submit</button>
      </div>
      <div id='response' className='border-2 border-green-500 mt-14 h-60 px-4'>
        <p>Post {state.data && state.data.id} by User {state.data && state.data.userId}</p>
        <br />
        <p>{state.data && state.data.title}</p>
        <br />
        <p>{state.data && state.data.body}</p>
      </div>
    </>
  )
}

export default App
