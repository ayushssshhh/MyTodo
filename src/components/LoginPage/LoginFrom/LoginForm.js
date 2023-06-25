import classes from './LoginForm.module.css'
import Input from '../../UI/Input'
import { useState , useEffect , useContext} from 'react'
import UserContext from '../../../store/user-context'


const LoginForm = (props) => {

    const userCtx = useContext(UserContext);

    const [passwordValidity , setPasswordValidity] = useState(true)
    const [password , setPassword] = useState('')

    const [usernameValidity , setUsernameValidity] = useState(true)
    const [username , setUsername] = useState('')


    const [messageState , setMessageState] = useState(false)

    const [formValidity , setFormValidity] = useState(false)
    const [disable , setDisable] = useState(false)

    const passwordChangeHandler =(event)=>{
        setPassword(event.target.value)
    }

    const userChangeHandler =(event)=>{
        setUsername(event.target.value)
    }

    const passwordBlurHandler = ()=>{
        if(password.trim().length > 6){
            setPasswordValidity(true)
        }   else{
            setPasswordValidity(false)
        }
    }

    const UserBlurHandler = ()=>{
        if(username.trim().length > 0){
            setUsernameValidity(true)
        }   else{
            setUsernameValidity(false)
        }
    }

    useEffect(()=>{
        const identifier = setTimeout(()=>{
            if((username.trim().length > 0 === true) && (password.trim().length > 6 === true)){
                setFormValidity(usernameValidity&&passwordValidity)
            }
        } , 5)

        return()=>{
            clearTimeout(identifier)
        }
    }, [passwordValidity , usernameValidity , password , username])

    const Login = async()=>{
        const url =' https://todouser.onrender.com/login/' + username + '/' + password
        console.log(url)
        fetch(url , {
            method : 'GET'
        })
            .then((response)=>{
                response.json().then((result)=>{
                    console.log(result)
                    if(result.user == 'success'){
                        if(result.pass == 'success'){
                            setMessageState(false)
                            userCtx.setTrue();
                            userCtx.setCredential(username)
                        } else if(result.password == 'fail') {
                            setMessageState(true);
                            userCtx.setFalse();
                            userCtx.setCredential('')
                        }
                    } else{
                        setMessageState(true)
                        userCtx.setFalse();
                        userCtx.setCredential('')
                    }
                    
                })
            })    
        ;

        setDisable(false)
    }
    
    const submitHandler = (event)=>{
        event.preventDefault();
        if(formValidity){
            console.log("valid")
            setDisable(true)
            Login();
        }
    }

    const btn = disable ? 'Login...' : 'Login';

    return (
        <form className={classes.login} onSubmit={submitHandler}>
            <Input 
                type="text" 
                placeholder="userame" 
                name="Username"
                onChange={userChangeHandler}
                onBlur={UserBlurHandler} 
                valid = {usernameValidity}
                mess = 'Username cant be empty'
            />
            <Input 
                type="password" 
                placeholder="password" 
                name="Password"  
                onChange = {passwordChangeHandler}
                onBlur = {passwordBlurHandler}
                valid = {passwordValidity}
                mess = 'Password must have 7 or more character'
            />
            {messageState && <p>Incorect username password</p>}
            <button  type='Submit'>{btn}</button>
        </form>
    )
}

export default LoginForm
