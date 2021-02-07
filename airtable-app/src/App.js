import React, { useEffect, useState } from "react";
import Airtable from "airtable"
import Goal from "./components/Goal"

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appkH0Y2QYlFzgkYB')

function App() {
  const [goals, setGoals] = useState([])
  const [updates, setUpdates] = useState([])
  
  useEffect(() => {
    base("goals")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setGoals(records)
        fetchNextPage();
    });
    base("updates")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setUpdates(records)
        fetchNextPage();
    })
  }, [])
  return (
    <>
      <h1>header</h1>
        {goals.map((goal) => (
          <Goal
            key={goal.id}
            goal={goal}
            updates={updates.filter(
              (update) => update.fields.goalId[0] === goal.id)}
          />
        ))}
   </>
 )
}
                          
export default App;