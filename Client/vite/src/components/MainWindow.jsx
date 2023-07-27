import { useState, useEffect } from 'react'
import axios from 'axios'

const MainWindow = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editTodoID, setEditTodoID] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`https://vercel-test-again-amber.vercel.app/todos`)
      setTodos(response.data)
    }
    catch (error) {
      console.error('Error fetching TODOS:', error)
    }
  }

  const addTodo = async () => {
    try {
      if (inputValue.trim() !== '') {
        await axios.post(`https://vercel-test-again-amber.vercel.app/todos`, { todo: inputValue.trim() })
        setInputValue('')
        fetchTodos()
      }
    }
    catch (error) {
      console.error('Error adding TODO:', error)
    }
  }

  const editTodo = (todo) => {
    setIsEditing(true)
    setEditTodoID(todo._id)
    setInputValue(todo.todo)
    
  }
  const handleEditTodo = async () => {
    try {
      if (inputValue.trim() !== '') {
        await axios.put(`https://vercel-test-again-amber.vercel.app/todos/${editTodoID}`, { todo: inputValue.trim() })
        setInputValue('')
        fetchTodos()
      }
    }
    catch (error) {
      console.error('Error editing TODOS:,', error)
    }
    finally {
      setIsEditing(false)
      setEditTodoID(null)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://vercel-test-again-amber.vercel.app/todos/${id}`)
      fetchTodos()
    }
    catch (error) {
      console.error('Error deleting TODO:', error)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      handleEditTodo()
    }
    else {
      addTodo()
    }
  }
  
  return (
    <div>
      <h1>TODO List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Add a new todo'
        />
        <button type='submit'>{isEditing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.todo}
          <button onClick={() => editTodo(todo)}>Edit</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
          
        ))}
      </ul>
    </div>
  )
}

export default MainWindow