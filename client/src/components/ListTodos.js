import React, { useState, useEffect } from 'react';

import EditTodo from './EditTodo';

function ListTodo() {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const response = await fetch('http://localhost:5000/todos');
			const jsonData = await response.json();

			setTodos(jsonData);
		} catch (err) {
			console.log(err.message);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const response = await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'DELETE',
			});

			setTodos(
				todos.filter((todo) => {
					return todo.todo_id !== id;
				}),
			);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			{todos.map((todo) => (
				<div
					key={todo.todo_id}
					className='h-100 w-full flex items-center justify-center bg-teal-lightest font-sans'>
					<div className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
						<div>
							<div className='flex mb-4 items-center'>
								<p className='w-full text-grey-darkest'>
									{todo.description}
								</p>
								<button className='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green'>
									<EditTodo todo={todo} />
								</button>
								<button
									className='flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red'
									onClick={() => deleteTodo(todo.todo_id)}>
									Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ListTodo;
