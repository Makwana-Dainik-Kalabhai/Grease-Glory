import { AreaChart } from "./charts/AreaChart";
import { BarChart } from "./charts/BarChart";
import { DoughnutChart } from "./charts/DoughnutChart";
import { PieChart } from "./charts/PieChart";
import { ScatterChart } from "./charts/ScatterChart";

export const Chart = () => {

    return (
        <div className="container-scroller">
            {/* <!-- partial --> */}
            <div className="container-fluid page-body-wrapper">
                {/* <!-- partial --> */}
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title"> Chart-js </h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Charts</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Chart-js</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Line chart</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Bar chart</h4>
                                        <BarChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Area chart</h4>
                                        <AreaChart />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Doughnut chart</h4>
                                        <div className="doughnutjs-wrapper d-flex justify-content-center" style={{width: "fit-content",margin: "auto",height: "500px"}}>
                                            <DoughnutChart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Pie chart</h4>
                                        <div className="doughnutjs-wrapper d-flex justify-content-center" style={{width: "fit-content",margin: "auto",height: "500px"}}>
                                            <PieChart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Scatter chart</h4>
                                        <ScatterChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- main-panel ends --> */}
            </div>
            {/* <!-- page-body-wrapper ends --> */}
        </div>
    );
}