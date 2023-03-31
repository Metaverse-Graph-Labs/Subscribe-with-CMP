// imports to add:
import styles from '/styles/Shared.module.css'
import { useState, useEffect } from 'react'
import { useAuth, useSession, useUser } from '@clerk/nextjs'
import { supabaseClient } from '@/lib/supapase-client'

// ... rest of code ...

const TodoList = ({ todos, setTodos }) => {
	const { session } = useSession()
	const [loading, setLoading] = useState(true)

	// on first load, fetch and set todos
	useEffect(() => {
		const loadTodos = async () => {
			try {
				setLoading(true)
				const supabaseAccessToken = await session!.getToken({
					template: 'supabase',
				})

				const supabase = await supabaseClient(supabaseAccessToken!)
				const { data: todos } = await supabase.from('todo').select('*')
				setTodos(todos)
			} catch (e) {
				alert(e)
			} finally {
				setLoading(false)
			}
		}
		loadTodos()
	}, [])

	// if loading, just show basic message
	if (loading) {
		return <div className={styles.container}>Loading...</div>
	}

	// display all the todos
	return (
		<>
			{todos?.length > 0 ? (
				<div className={styles.todoList}>
					<ol>
						{todos.map(todo => (
							<li key={todo.id}>{todo.name}</li>
						))}
					</ol>
				</div>
			) : (
				<div className={styles.label}>You don't have any todos!</div>
			)}
		</>
	)
}

function AddTodoForm({ todos, setTodos }) {
	const { getToken, userId } = useAuth()
	const [newTodo, setNewTodo] = useState('')
	const handleSubmit = async e => {
		e.preventDefault()
		if (newTodo === '') {
			return
		}

		const supabaseAccessToken = await getToken({
			template: 'supabase',
		})
		const supabase = await supabaseClient(supabaseAccessToken!)
		const { data } = await supabase.from('todo').insert({ name: newTodo, user_id: userId }).select()

		setTodos([...todos, data![0]])
		setNewTodo('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input onChange={e => setNewTodo(e.target.value)} value={newTodo} />
			&nbsp;<button>Add Todo</button>
		</form>
	)
}

export default function Home2() {
	const { isSignedIn, isLoaded, user } = useUser()
	// Manage todos state here!
	const [todos, setTodos] = useState(null)

	return (
		<>
			{!isLoaded ? (
				<></>
			) : (
				<main className={styles.main}>
					<div className={styles.container}>
						{isSignedIn ? (
							<>
								<span className={styles.label}>Welcome {user.firstName}!</span>
								<AddTodoForm todos={todos} setTodos={setTodos} />
								<TodoList todos={todos} setTodos={setTodos} />
							</>
						) : (
							<div className={styles.label}>Sign in to create your todo list!</div>
						)}
					</div>
				</main>
			)}
		</>
	)
}
