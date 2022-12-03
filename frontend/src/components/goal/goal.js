import "./goal.scss"
import Check from "../../assets/check.svg"
import { useEffect, useState } from "react";
import axios from "axios";

import { BsCheckLg } from "react-icons/bs"
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai"
import { GiConfirmed } from "react-icons/gi"
import { toast } from "react-toastify";

export default function Goal(props) {

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState(GoalStatuses);

    const [editMode, setEditMode] = useState(true);


    useEffect(() => {
        const { id, title, description, date, price, status } = props;
        setId(id)
        setTitle(title)
        setDescription(description)
        setDate(date)
        setPrice(price)
        setStatus(status)
    }, [])

    function handleCheckClick() {
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

    function handleEditClick() {
        console.log(id);
        if (editMode == true) {
            axios.put("/goal", {
                id: id,
                title: title,
                description: description,
                value: price,
                achievement_time: new Date(date),
                completed: status == GoalStatuses.completed

            }).then((res) => {
                console.log(res);
                toast.success("Goal Edited successfuly");
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data)
            })
        }

        setEditMode(!editMode);
    }


    return (
        <div className="goalContainer">
            <section className="goalInformations">
                <input className="goalTitle" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!editMode} />
                <textarea className="goalDescription" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!editMode} />
                <p className="goalPrice">$<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} disabled={!editMode} /></p>
                <input className="goalDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={!editMode} />
                <button></button>
            </section>

            <section className="goalStatusBackground">
                <button className="goalCheckButton" onClick={handleCheckClick}>
                    {status == GoalStatuses.completed &&
                        <BsCheckLg className='goalCheck' />
                    }
                </button>
            </section>

            <button className="goalEditButton" onClick={handleEditClick}>
                {editMode == false &&
                    <AiFillEdit className="goalEditIcon" />
                }{editMode == true &&
                    <GiConfirmed className="goalEditIcon" />
                }
            </button>
        </div>
    )

}

export const GoalStatuses = {
    uncompleted: "uncompleted",
    completed: "completed",
    failed: "failed"
}