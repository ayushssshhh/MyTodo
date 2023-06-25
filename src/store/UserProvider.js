import UserContext from "./user-context";
import { useState } from "react";

const UserProvider = (props) => {
    const [login, setLogin] = useState(false);
    const [credential, setCredential] = useState('');


    const falseHandler = () => {
        setLogin(false);
    }

    const trueHandler = () => {
        setLogin(true);
    }

    const credentialHandler = (user) => {
        setCredential(user);
    }

    const UserCtx = {
        login: login,
        credential: credential,
        setTrue: trueHandler,
        setFalse: falseHandler,
        setCredential: credentialHandler
    }

    return (
        <UserContext.Provider value={UserCtx}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
