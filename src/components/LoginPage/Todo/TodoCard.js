import classes from './TodoCard.module.css'

const TodoCard = (props)=>{
    return(

        
        <div className={classes.todoCard} >
            <div className={classes.edit}>
                <button className={classes.btn}><i class="fa-solid fa-file-pen"></i></button>
                <button className={classes.btn}><i class="fa-solid fa-trash"></i></button>  
            </div>
            {props.children}
        </div>
    )
}

export default TodoCard