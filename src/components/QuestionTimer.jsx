import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeGong }) {
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    //se il tempo arriva a 0, "suono il gong" e mi sbatte a Summary
    if (timer === 0) {
      onTimeGong();
      return;
    }

    //scaliamo secondo per secondo
    const timerID = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearTimeout(timerID);

    //nelle dipendenze passiamo i valori da aggiornare ad ogni rendering
  }, [timer, onTimeGong]);

  return <progress id="question-time" max={20} value={timer} className="" />;
}
