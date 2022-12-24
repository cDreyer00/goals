import "./goal.scss"
import Check from "../../assets/check.svg"
import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { BsCheckLg } from "react-icons/bs"
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai"
import { GiConfirmed } from "react-icons/gi"
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md"

export default function Goal(props) {

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(Date);
    const [value, setValue] = useState(0);
    const [current_value, setCurrentValue] = useState(0);
    const [status, setStatus] = useState(GoalStatuses);

    const [editMode, setEditMode] = useState(props.editMode);


    useEffect(() => {
        const { id, title, description, date, value, current_value, status } = props;
        //console.log("ID:", id);
        setId(id)
        setTitle(title)
        setDescription(description)
        setDate(date)
        setValue(value)
        setCurrentValue(current_value)
        setStatus(status)
    }, [])


    function handleCheckClick() {
        const s = status != GoalStatuses.done;

        api.put("/goal/edit", {
            id: id,
            title: title,
            description: description,
            date: date,
            value: value,
            current_value: current_value,
            status: s
        })

        if (status == GoalStatuses.done) {
            setStatus(GoalStatuses.pending);

            return;
        }

        setStatus(GoalStatuses.done);
    }

    function handleEditClick() {

        if (editMode == true) {
            api.put("/goal/edit", {
                id: id,
                title: title,
                description: description,
                value: value,
                current_value: current_value,
                achievement_time: date,
                status: status

            }).then((res) => {
                toast.success("Goal Edited successfuly");
            }).catch((err) => {
                toast.error(err.response.data)
            })
        }

        setEditMode(!editMode);
    }

    function handleDeleteClick() {
        api.delete("/goal/delete", {
            data: {
                id: id
            }
        }).then((res) => {
            toast.success(res.data);
            props.onDeleteClick();
        }).catch((err) => {
            toast.error(err.response.data);
        })
    }


    return (
        <div className="goalContainer">
            <section className="goalInformations">
                <input className="goalTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!editMode} />
                <textarea className="goalDescription" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!editMode} />
                <p className="goalValue">$<input type="number" placeholder="0" value={value} onChange={(e) => setValue(e.target.value)} disabled={!editMode} /></p>
                <input className="goalDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={!editMode} />
                <button></button>
            </section>

            <section className="goalStatusBackground">
                <button className="goalCheckButton" onClick={handleCheckClick}>
                    {status == GoalStatuses.done &&
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
            <button className="goalDeleteButton" onClick={handleDeleteClick}>
                <MdDeleteForever className="goalDeleteIcon" />
            </button>
        </div>
    )

}

export const GoalStatuses = {
    pending: "Pending",
    done: "Done",
    failed: "Failed"
}