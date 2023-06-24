import React from "react";
import classes from './Card.module.css'

const Card = (props) => {

    const toggle = props.tog

    return (
        <div className={classes.card}>
            <div className={classes.toggle}>
                <div className={`${classes.sig} ${toggle && classes.active}`} onClick={props.onSig}>Sign In</div>
                <div className={`${classes.log} ${!toggle && classes.active}`} onClick={props.onLog}>Log In</div>
            </div>

            {props.children}
        </div>
    )
}

export default Card