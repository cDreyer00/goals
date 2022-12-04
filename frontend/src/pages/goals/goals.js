import "./style.scss"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import { Button } from "../../components/input/Input"
import Goal, { GoalStatuses } from "../../components/goal/goal.js"
import {GoSignOut} from "react-icons/go"

export default function Goals() {

    const [user, setUser] = useState({});
    const [goals, setGoals] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token")

        if (!token) {
            toast.error("You must be logged in order to access this page")
            navigate("/");
            return;
        }

        // get user
        axios.get("/user/infos").then((res) => {
            setUser(res.data);
        }).catch((err) => {
            toast.error("An error has ocurred when trying catch informations, try again")
            navigate("/");
        })

        LoadGoals();
    }, [])

    function getDate(date) {
        date = date.split("T")[0].split("-");
        return `${date[0]}-${date[1]}-${date[2]}`
    }

    function checkGoalState(goal) {
        if (goal.completed) {
            return GoalStatuses.completed;
        }

        const goalDate = new Date(goal.achievement_time);
        const currentDate = new Date();
        if (goalDate < currentDate) {
            return GoalStatuses.failed;
        }

        return GoalStatuses.uncompleted;
    }

    function handleAddNewGoal() {
        let newGoal = {
            title: null,
            description: null,
            value: "value",
            achievement_time: new Date(),
            status: false,
            editMode: true
        }

        axios.post("/goal", newGoal).then((res) => {
            setGoals(res.data.all_goals)
        }).catch((err) => {
            toast.error("failed to create new goal, reload page and try again");
        })

    }

    function LoadGoals() {
        axios.get("/user/goals").then((res) => {
            setGoals(res.data)
        }).catch((err) => {
        })
    }

    function handlerLogOut() {
        Cookies.remove("token");
    }


    return (
        <div className="goalsPage">
            <div className="goalsContainer">
                <h1>Goals</h1>
                
                <div className="topButtons">
                    <Button borderColor="yellow" content="Add a new goal" handleClick={handleAddNewGoal} />
                    <button onClick={handlerLogOut} >
                        <Link to="/"><GoSignOut className="signOutIcon"/></Link>
                    </button>
                </div>

                <ul>
                    {Array.from(goals.map((goal) => {
                        return (
                            <li key={goal.id}>
                                <Goal
                                    id={goal.id}
                                    title={goal.title}
                                    description={goal.description}
                                    value={goal.value}
                                    date={getDate(goal.achievement_time)}
                                    status={checkGoalState(goal)}
                                    editMode={goal.title == ""}
                                    onDeleteClick={LoadGoals}
                                />
                            </li>
                        )
                    }).reverse())}
                </ul>
            </div>
        </div>
    )
}