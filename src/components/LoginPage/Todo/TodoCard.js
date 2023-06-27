import classes from './TodoCard.module.css'
import UserContext from '../../../store/user-context'
import { useContext, useEffect, useState } from 'react'

const TodoCard = (props) => {
    const userCtx = useContext(UserContext)

    const [text, setText] = useState(props.task)
    const [counter , setCounter] = useState(false)

    const toggle = ()=>{
        setCounter(prevState => {
            return !prevState
        })

        console.log(counter)
    }

    const user = userCtx.credential

    const handleBlur = () => {
        toggle()
    }

    const onEdit = () => {
        // toggle()

        const urlDelete = 'https://todotask-lbuo.onrender.com/alter/' + user + '/' + props.task + '/' + text
        console.log(urlDelete)
        fetch(urlDelete ,{
            method : 'PUT'
        })
            .then((response) => {
                console.log(response);
                // props.alterTask();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(()=>{
        setText(document.querySelector('p').innerText)
    },[counter , text , onEdit])

    const onDelete = () => {
        const urlDelete = 'https://todotask-lbuo.onrender.com/delete/' + user + '/' + props.task
        console.log(urlDelete)
        fetch(urlDelete)
            .then((response) => {
                console.log(response);
                props.alterTask();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={classes.todoCard} >
            <div className={classes.edit}>
                <button className={classes.btn} onClick={onEdit} ><i class="fa-solid fa-file-pen"></i></button>
                <button className={classes.btn} onClick={onDelete}><i class="fa-solid fa-trash"></i></button>
            </div>
            <div className={classes.con}>
                <p contenteditable="true" onBlur={handleBlur}>{props.task}</p>
            </div>

        </div>
    )
}

export default TodoCard