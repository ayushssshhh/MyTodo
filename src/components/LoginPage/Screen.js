import React, { useState , useContext} from "react";
import classes from './Screen.module.css'
import Card from "../UI/Card";
import SignForm from "./SignForm/SignForm";
import LoginForm from "./LoginFrom/LoginForm";
import UserContext from "../../store/user-context";
import TodoScreen from "./Todo/TodoSreen";
import TodoForm from "./Todo/TodoForm";

const Screen = (props) => {

    const userCtx = useContext(UserContext)

    const [toggle, setToggle] = useState(true);

    const handleLog = () => {
        setToggle(false)
    }

    const handleSig = () => {
        setToggle(true)
    }

    const form = toggle ? <SignForm /> : <LoginForm />;

    const card = <Card onLog={handleLog} onSig={handleSig} tog={toggle}>{form}</Card>
    // const form = <SignForm/>

    return (
        <div className={classes.con}>
            {!userCtx.login && card}
            {userCtx.login && <TodoScreen/>}
            {/* <TodoScreen/> */}
        </div>
    );
}

export default Screen;