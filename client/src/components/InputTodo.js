import React, {useState} from 'react'

function InputTodo() {

    const [description, setDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            console.log(body);
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            window.location = '/';
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='text-3xl text-center font-serif mt-7'>
            PERN todo list!
            <form onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className='border-2 mr-3 mt-5'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button 
                    className='bg-green-400 rounded p-1 px-2'
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default InputTodo
