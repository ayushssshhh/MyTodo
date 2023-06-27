import classes from './TodoForm.module.css'
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../../store/user-context';

const TodoForm = (props) => {
    const [task, setTask] = useState('');
    const [valid, setValid] = useState(true);
    const [form, setForm] = useState(false);
    const userCtx = useContext(UserContext);


    const user = userCtx.credential;

    useEffect(() => {
        const identifier = setTimeout(() => {
            if (task.trim().length > 0 === true) {
                setForm(true)
            } else {
                setForm(false)
            }
        }, 5)

        return () => {
            clearTimeout(identifier)
        }
    }, [task])

    const taskChangeHandler = (event) => {
        setTask(event.target.value);
    }

    const taskBlurHandler = () => {
        if (task.trim().length > 0) {
            setValid(true)
        } else {
            setValid(false)
        }
    }

    const postTask = async() => {
        const urlPost = 'https://todotask-lbuo.onrender.com/task/' + user + '/' + task;
        setTask('')
        setValid(true)
        console.log(urlPost+' '+task)
        fetch(urlPost)
            .then((response) => {
                // console.log(response);
                props.addTask(task)
                response.json()
                    .then(result => console.log(result))
            })
            .catch(err =>{
                console.log(err)
            })

    }

    const SubmitHandler = (event) => {
        event.preventDefault()
        if (form) {
            postTask()
        }
    }
    return (
        <div className={classes.todo}>
            <form onSubmit={SubmitHandler}>
                <input
                    placeholder='Enter New Task'
                    onBlur={taskBlurHandler}
                    onChange={taskChangeHandler}
                    value={task}
                />

                {!valid && <p className={classes.para}>!!!Cant be empty</p>}
                <button className={classes.btn} type='submit'><i class="fa-solid fa-pencil"></i></button>
            </form>
        </div>

    )
}

export default TodoForm;