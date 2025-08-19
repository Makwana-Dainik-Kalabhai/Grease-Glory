import { useAdminStore } from "../ContextApi/Store";
import { useEffect, useState } from "react";
import { ScatterChart } from "./charts/ScatterChart";
import { AreaChart } from "./charts/AreaChart";
import { BarChart } from "./charts/BarChart";
import { DoughnutChart } from "./charts/DoughnutChart";

export const Analytics = () => {

    const { allOrders } = useAdminStore();

    const [monthOrders, setMonthOrders] = useState([]);
    const [monthWiseOrders, setMonthWiseOrders] = useState({ Completed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], Cancelled: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

    const [doughnut, setDoughnut] = useState([0, 0, 0, 0]);  // Completed Orders, Total Cost, Total sales, Total profit

    let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    useEffect(() => {
        setMonthOrders([]);
        setMonthWiseOrders({ Completed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], Cancelled: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });

        !!allOrders && allOrders.map((ele) => {

            //* Current month orders (ScatterChart)
            if ((new Date(Number.parseInt(ele.time)).getMonth() === new Date().getMonth()) && (new Date(Number.parseInt(ele.time)).getFullYear() === new Date().getFullYear())) {
                setMonthOrders(prev => ([...prev, ele]));
            }

            if (new Date(Number.parseInt(ele.time)).getFullYear() === new Date().getFullYear()) {
                //* Month Wise orders (AreaChart)
                setMonthWiseOrders(prev => ({
                    ...prev,
                    ["Completed"]: prev["Completed"].map((item, i) =>
                        (ele.status === "Completed") && (i === Number.parseInt(new Date(Number.parseInt(ele.time)).getMonth())) ? item + 1 : item
                    ),
                    ["Cancelled"]: prev["Cancelled"].map((item, i) =>
                        (ele.status === "Cancelled") && (i === Number.parseInt(new Date(Number.parseInt(ele.time)).getMonth())) ? item + 1 : item
                    )
                }));

                //* DoughnutChart
                setDoughnut(prev =>
                    prev.map((item, ind) =>
                    ((ele.status === "Completed" && ind === 0) ?
                        (item + 1) : ((ind === 1) ?
                            (item + ele.bill.totCost) : ((ele.status === "Completed" && ind === 2) ?
                                (item + ele.bill.totOffPrice) : item)))
                    )
                );

                setDoughnut(prev => ([...prev, doughnut[3] = (doughnut[2] - doughnut[1])]));
            }
        });
        console.log(doughnut);

    }, [allOrders]);


    return (
        <div className="flex flex-wrap mt-6 -mx-3">

            {/* //! Scatter Chart */}
            <div className="w-full max-w-full px-3 mt-0">
                <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                        <h6 className="capitalize dark:text-white">Sales overview ({months[(new Date()).getMonth()]})</h6>
                        <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                            <i className="fa fa-arrow-up text-emerald-500"></i>
                            <span className="font-semibold">4% more</span> in 2021
                        </p>
                    </div>
                    <div className="flex-auto p-4">
                        {ScatterChart(
                            monthOrders && monthOrders.map((ele) => ({
                                x: new Date(Number.parseInt(ele.time)).getDate(),
                                y: new Date(Number.parseInt(ele.time)).getHours()
                            })
                            ))}
                    </div>
                </div>
            </div>


            {/* //! Area Chart */}
            <div className="w-full max-w-full px-3 mt-5">
                <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                        <h6 className="capitalize dark:text-white">Sales overview ({months[(new Date()).getMonth()]})</h6>
                        <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                            <i className="fa fa-arrow-up text-emerald-500"></i>
                            <span className="font-semibold">4% more</span> in 2021
                        </p>
                    </div>
                    <div className="flex-auto p-4">
                        {AreaChart(months, monthWiseOrders)}
                    </div>
                </div>
            </div>



            {/* //! Bar Chart */}
            <div className="w-full max-w-full px-3 mt-5">
                <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                        <h6 className="capitalize dark:text-white">Sales overview ({months[(new Date()).getMonth()]})</h6>
                        <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                            <i className="fa fa-arrow-up text-emerald-500"></i>
                            <span className="font-semibold">4% more</span> in 2021
                        </p>
                    </div>
                    <div className="flex-auto p-4">
                        {BarChart(months, monthWiseOrders)}
                    </div>
                </div>
            </div>


            {/* //! Doughnut Chart */}
            <div className="w-full max-w-full px-3 mt-5">
                <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                        <h6 className="capitalize dark:text-white">Sales overview ({months[(new Date()).getMonth()]})</h6>
                        <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                            <i className="fa fa-arrow-up text-emerald-500"></i>
                            <span className="font-semibold">4% more</span> in 2021
                        </p>
                    </div>
                    <div className="flex-auto p-4">
                        {DoughnutChart(months, monthWiseOrders)}
                    </div>
                </div>
            </div>
        </div>
    );
}