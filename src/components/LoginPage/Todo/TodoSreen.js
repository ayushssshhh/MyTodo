import classes from './TodoSreen.module.css'
import { useState, useEffect, useContext } from 'react'
import TodoCard from './TodoCard'
import UserContext from '../../../store/user-context'

const TodoScreen = (props) => {

    const [task, setTask] = useState('');
    const [valid, setValid] = useState(true);
    const [form, setForm] = useState(false);
    const [counter, setCounter] = useState(0)
    const [taskArray, setTaskArray] = useState([])
    const userCtx = useContext(UserContext);

    let fetchedData;

    userCtx.setCredential('u1');
    const user = userCtx.credential;
    useEffect(() => {
        fetchTask()
    }, [counter])

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

    const SubmitHandler = (event) => {
        event.preventDefault()
        if (form) {
        }
    }

    const fetchTask = () => {
        const urlGet = 'https://todotask-lbuo.onrender.com/task/' + user;
        fetch(urlGet, {
            method: 'GET'
        })
            .then((response) => {
                setCounter(1)
                response.json().then(result => {
                    fetchedData = result.map(item => {
                        return ({ id: item._id, task: item.task });
                    })

                    fetchedData.forEach(item => {
                        setTaskArray(prevState => [...prevState, item])

                    })

                })
            })
    }

    console.log(taskArray)

    return (
        <div className={classes.todo}>
            <form onSubmit={SubmitHandler}>
                <input
                    placeholder='Enter New Task'
                    onBlur={taskBlurHandler}
                    onChange={taskChangeHandler}
                />

                {!valid && <p className={classes.para}>!!!Cant be empty</p>}
                <button className={classes.btn} type='submit'><i class="fa-solid fa-pencil"></i></button>
            </form>

            {taskArray.map(item => <TodoCard>{item.task}</TodoCard>)}

        </div>
    )
}

export default TodoScreen