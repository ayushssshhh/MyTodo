import classes from './SignForm.module.css'
import Input from '../../UI/Input'
import { useState, useEffect , useContext} from 'react'
import UserContext from '../../../store/user-context'

const SignForm = (props) => {

    const userCtx = useContext(UserContext);
    
    const [passwordValidity, setPasswordValidity] = useState(true)
    const [password, setPassword] = useState('')

    const [usernameValidity, setUsernameValidity] = useState(true)
    const [username, setUsername] = useState('')

    const [nameValidity, setNameValidity] = useState(true)
    const [name, setName] = useState('')

    const [formValidity, setFormValidity] = useState(false)

    const [messageState, setMessageState] = useState(false)
    const [disable, setDisable] = useState(false)


    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const passwordBlurHandler = () => {
        if (password.trim().length > 6) {
            setPasswordValidity(true)
        } else {
            setPasswordValidity(false)
        }
    }

    const userChangeHandler = (event) => {
        setUsername(event.target.value)
    }

    const UserBlurHandler = () => {
        if (username.trim().length > 0) {
            setUsernameValidity(true)
        } else {
            setUsernameValidity(false)
        }
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const nameBlurHandler = () => {
        if (username.trim().length > 0) {
            setNameValidity(true)
        } else {
            setNameValidity(false)
        }
    }

    useEffect(() => {
        const identifier = setTimeout(() => {
            if ((username.trim().length > 0 === true) && (password.trim().length > 6 === true) && (name.trim().length > 0 === true)) {
                setFormValidity(usernameValidity && passwordValidity)
            }
        }, 5)

        return () => {
            clearTimeout(identifier)
        }
    }, [passwordValidity, usernameValidity, nameValidity, name, password, username])

    const btn = disable ? 'Siging In...' : 'Sign In';

    const sign = async () => {
        const url = ' https://todouser.onrender.com/sign/'
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                name: name
            }),
            headers: {
                'Content-Type': 'application/json',
            }

        })
            .then((response) => {
                response.json().then((result) => {
                    if (result.result == 'success') {
                        setMessageState(false)
                        userCtx.setTrue();
                        userCtx.setCredential(username)
                    } else {
                        setMessageState(true)
                    }

                })
            })
            ;

        setDisable(false)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (formValidity) {
            setDisable(true)
            console.log('valid')
            sign()
        }
    }

    return (
        <form className={classes.sign} onSubmit={submitHandler}>
            <Input
                type="text"
                placeholder="userame"
                name="Username"
                onChange={userChangeHandler}
                onBlur={UserBlurHandler}
                valid={usernameValidity}
                mess='Username cannot be empty'
            />
            <Input
                type="text"
                placeholder="name"
                name="Name"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                valid={nameValidity}
                mess='name cannot be empty'
            />
            <Input
                type="password"
                placeholder="password"
                name="Password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                valid={passwordValidity}
                mess='password must have 7 or more character'
            />

            {messageState && <p>Username already exist!!</p>}
            <button type='Submit'>{btn}</button>
        </form>
    )

}

export default SignForm