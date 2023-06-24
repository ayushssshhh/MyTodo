import classes from './Input.module.css'




const Input = (props) => {
    return (
    <table>
            <tr>
                <td><label>{props.name}</label></td>
                <td>
                    <input 
                        placeholder={props.placeholder} 
                        name={props.name} 
                        type={props.type}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                    />
                    {!props.valid &&<p className={classes.error}>!!!!{props.mess}</p>}
                </td>
            </tr>

        </table>
    )
}

export default Input