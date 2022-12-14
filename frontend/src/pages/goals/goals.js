import "./style.scss"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import api from "../../services/api"
import { Button } from "../../components/input/Input"
import Goal, { GoalStatuses } from "../../components/goal/goal.js"
import { GoSignOut } from "react-icons/go"

export default function Goals() {

    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authCookie = Cookies.get("token")
        if (!authCookie) {
            toast.error("You must be logged in order to access this page")
            navigate("/");
            return;
        }

        // get user
        LoadGoals();
    }, [])

    function getDate(date) {
        try {
            date = date.split("T")[0].split("-");
            return `${date[0]}-${date[1]}-${date[2]}`
        } catch (e) {
            return null;
        }
    }

    function checkGoalState(goal) {
        if (goal.completed) {
            return GoalStatuses.done;
        }

        const goalDate = new Date(goal.achievement_time);
        const currentDate = new Date();
        if (goalDate < currentDate) {
            return GoalStatuses.failed;
        }

        return GoalStatuses.pending;
    }

    function handleAddNewGoal() {
        let newGoal = {
            title: "null",
            description: "null",
            value: 0,
            current_value: 0,
            due_date: new Date(),
            status: "Pending",
            edit: 1
        }
        api.post("/goal/create",
            newGoal,
            {
                headers: {
                    token: Cookies.get("token")
                }
            }).then(() => {
                LoadGoals();
            }).catch((err) => {
                toast.error("failed to create new goal, reload page and try again");
            })
    }

    function LoadGoals() {
        api.get("/user/goals", {
            headers: {
                token: Cookies.get("token")
            }
        }).then((res) => {
            setGoals(res.data)
        }).catch(({ response }) => {
            toast.error(response.data);
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
                        <Link to="/"><GoSignOut className="signOutIcon" /></Link>
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
                                    date={getDate(goal.due_date)}
                                    status={checkGoalState(goal)}
                                    edit={goal.edit}
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