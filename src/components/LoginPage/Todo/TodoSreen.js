import classes from './TodoSreen.module.css'
import { useState, useEffect, useContext, useCallback } from 'react'
import TodoCard from './TodoCard'
import UserContext from '../../../store/user-context'
import TodoForm from './TodoForm'

const TodoScreen = (props) => {

    const [counter, setCounter] = useState(0)
    const [taskArray, setTaskArray] = useState([])
    const userCtx = useContext(UserContext);

    let fetchedData;

    const user = userCtx.credential;
    useEffect(() => {
        fetchTask()
    }, [counter])

    const fetchTask = useCallback(
        () => {
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
                // taskArray.map(item =>{
                //     // console.log(item.id);
                // })
        }
    )

    const alterList =()=>{
        setTaskArray([])
        fetchTask()
    }

    return (
        <div className={classes.main}>

            <TodoForm addTask = {alterList}/>

            <div className={classes.todoCardCon}>
                {taskArray.map(item => <TodoCard
                    key={item.id}
                    id={item.id}
                    task={item.task}
                    alterTask = {alterList}
                />)}
            </div>

        </div>
    )
}

export default TodoScreen