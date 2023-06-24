import React, { useState } from "react";
import classes from './Screen.module.css'
import Card from "../UI/Card";
import SignForm from "./SignForm/SignForm";
import LoginForm from "./LoginFrom/LoginForm";

const Screen = (props) => {

    const [toggle, setToggle] = useState(true);

    const handleLog = ()=>{
        setToggle(false)
    }

    const handleSig = ()=>{
        setToggle(true)
    }

    const form = toggle ? <SignForm/> : <LoginForm/>; 
    // const form = <SignForm/>
    return (
        <div className={classes.con}>
            <Card onLog = {handleLog} onSig={handleSig} tog = {toggle}>
                {form}
            </Card>
        </div>
    );
}

export default Screen;