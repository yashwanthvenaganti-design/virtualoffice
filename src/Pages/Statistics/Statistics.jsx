import { useEffect } from "react";
import { getData } from "../../Axios/Axios";




export default function Statistics() {


    const fetchData = async () => {
        try {
            const response = await getData("/statistics/viewStatistics");
            console.log("Statistics Data:", response);

        } catch (error) {
            console.error("Error fetching statistics data:", error);
        }       
    };

    useEffect(() => {
        fetchData();
    }, []);





  return <div>Statistics Page</div>;
}