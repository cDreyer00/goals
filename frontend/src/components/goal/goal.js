import "./goal.scss"
import Check from "../../assets/check.svg"
import { useState } from "react";
import axios from "axios";

export default function Goal(props) {
    const { id, title, description, date, price } = props;

    const [status, setStatus] = useState(GoalStatuses);

    function handleCheckClick(newStatus) {

        const completed = status != GoalStatuses.completed;
        
        axios.put("/goal/check", {
            id: id,
            completed: completed
        })
        
        if (status == GoalStatuses.completed) {
            setStatus(GoalStatuses.uncompleted);

            return;
        }

        setStatus(GoalStatuses.completed);
    }

    return (
        <div className="goalContainer">
            <section className="goalInformations">
                <p className="goalDate">{date}</p>
                <section className="goalMainInfos">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </section>
                <p className="goalPrice">R${price}</p>
            </section>

            <section className="goalStatusBackground">
                <button className="goalCheckButton" onClick={handleCheckClick}>
                    {status == GoalStatuses.completed &&
                        <img className="goalCheck" src={Check} />
                    }
                </button>
            </section>
        </div>
    )

}

export const GoalStatuses = {
    uncompleted: "uncompleted",
    completed: "completed",
    failed: "failed"
}