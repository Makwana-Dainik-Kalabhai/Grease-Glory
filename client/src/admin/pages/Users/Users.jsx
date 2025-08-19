import { useAdminStore } from "../../ContextApi/Store";
import { CAvatar, CBadge, CButton, CSmartTable } from '@coreui/react-pro'
import { EditModal } from "./EditModal";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";


export const Users = () => {

    const { allUsers } = useAdminStore();

    //* For Edit user
    const [editModal, setEditModal] = useState(false);
    const [currEle, setCurrEle] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    const columns = [
        { key: "avatar", filter: false, sorter: false, },
        { key: 'active', label: "Active", _style: { width: '1%' }, filter: false, sorter: false, },
        "username",
        "email",
        "phone",
        { key: 'isAdmin', label: "Admin", _style: { width: '8%' }, filter: false },
        { key: "address", filter: false, },
        { key: 'editDelete', label: "Edit / Delete", _style: { width: '10%' }, filter: false, sorter: false, },
    ];


    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-full max-w-full px-3">
                    <div className="p-4 relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                        <div className="mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                            <h6 className="dark:text-white">Users List</h6>
                        </div>
                        <hr />
                        <CSmartTable
                            pagination
                            paginationProps={
                                {
                                    style: {
                                        position: "relative",
                                    }
                                }
                            }
                            activePage={1}
                            cleaner
                            clickableRows
                            columns={columns}
                            columnFilter
                            columnSorter
                            items={allUsers}
                            itemsPerPageSelect
                            itemsPerPage={5}
                            scopedColumns={{
                                avatar: (item) => (
                                    <td>
                                        <CAvatar src={`https://ui-avatars.com/api/?name=${item.username[0]}&background=000&color=fff&size=70`} />
                                    </td>
                                ),
                                active: (item) => (
                                    <td>
                                        {item.active ? <CBadge color="success" shape="rounded-pill">Active</CBadge> : <CBadge color="danger" shape="rounded-pill">Blocked</CBadge>}
                                    </td>
                                ),
                                username: (item) => (
                                    <td>{item.username}</td>
                                ),
                                email: (item) => (
                                    <td>{item.email}</td>
                                ),
                                phone: (item) => (
                                    <td>+91 {item.phone}</td>
                                ),
                                isAdmin: (item) => (
                                    <td>
                                        {item.isAdmin ? <CBadge color="success">YES</CBadge> : <CBadge color="dark">NO</CBadge>}</td>
                                ),
                                address: (item) => (
                                    <td>{item.address && item.address.houseNo ? item.address.houseNo + " " + item.address.apartment + " near " + item.address.suite + ", " + item.address.city + " - " + item.address.pincode : "-"}</td>
                                ),
                                editDelete: (item) => (
                                    <td>
                                        <CButton color="primary" onClick={() => { setEditModal(true); setCurrEle(item) }}><i className='fa-solid fa-edit'></i></CButton>&ensp;
                                        <CButton color="dark" onClick={() => { setDeleteModal(true); setCurrEle(item) }}><i className='fa-solid fa-trash'></i></CButton>

                                        <EditModal ele={currEle} editModal={editModal} setEditModal={setEditModal} />
                                        <DeleteModal _id={currEle._id} ele={currEle} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                                    </td>
                                ),
                            }}
                            tableFilter
                            tableProps={{
                                responsive: true,
                                striped: true,
                                hover: true,
                            }}
                        />
                    </div>
                </div>
            </div>



            {/* <!-- card 2 --> */}

            <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-full max-w-full px-3">
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                        <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                            <h6 className="dark:text-white">Projects table</h6>
                        </div>
                        <div className="flex-auto px-0 pt-0 pb-2">
                            <div className="p-0 overflow-x-auto">
                                <table className="items-center justify-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                                    <thead className="align-bottom">
                                        <tr>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Project</th>
                                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Budget</th>
                                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                                            <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Completion</th>
                                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-solid shadow-none dark:border-white/40 dark:text-white tracking-none whitespace-nowrap"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-t">
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-spotify.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9" alt="spotify" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm leading-normal dark:text-white">Spotify</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">$2,500</p>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">working</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex items-center justify-center">
                                                    <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">60%</span>
                                                    <div>
                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                            <div className="flex flex-col justify-center w-3/5 h-auto overflow-hidden text-center text-white transition-all bg-blue-500 rounded duration-600 ease bg-gradient-to-tl from-blue-700 to-cyan-500 whitespace-nowrap" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400">
                                                    <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-invision.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9" alt="invision" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm leading-normal dark:text-white">Invision</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">$5,000</p>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">done</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex items-center justify-center">
                                                    <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">100%</span>
                                                    <div>
                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                            <div className="flex flex-col justify-center w-full h-auto overflow-hidden text-center text-white transition-all bg-blue-500 rounded duration-600 ease bg-gradient-to-tl from-emerald-500 to-teal-400 whitespace-nowrap" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                    <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-jira.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9" alt="jira" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm leading-normal dark:text-white">Jira</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">$3,400</p>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">canceled</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex items-center justify-center">
                                                    <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">30%</span>
                                                    <div>
                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                            <div className="flex flex-col justify-center h-auto overflow-hidden text-center text-white transition-all bg-blue-500 rounded duration-600 ease bg-gradient-to-tl from-red-600 to-orange-600 w-3/10 whitespace-nowrap" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="30"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                    <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-slack.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9" alt="slack" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm leading-normal dark:text-white">Slack</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">$1,000</p>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">canceled</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex items-center justify-center">
                                                    <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">0%</span>
                                                    <div>
                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                            <div className="flex flex-col justify-center w-0 h-auto overflow-hidden text-center text-white transition-all bg-blue-500 rounded duration-600 ease bg-gradient-to-tl from-emerald-500 to-teal-400 whitespace-nowrap" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                    <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-webdev.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9" alt="webdev" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm leading-normal dark:text-white">Webdev</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">$14,000</p>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">working</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <div className="flex items-center justify-center">
                                                    <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">80%</span>
                                                    <div>
                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                            <div className="flex flex-col justify-center w-4/5 h-auto overflow-hidden text-center text-white transition-all bg-blue-500 rounded duration-600 ease bg-gradient-to-tl from-blue-700 to-cyan-500 whitespace-nowrap" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="80"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                                                <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                    <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-xd.svg" className="inline-flex items-center justify-center mr-2 text-sm text-white transition-all duration-200 ease-in-out rounded-full h-9 w-9" alt="xd" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm leading-normal dark:text-white">Adobe XD</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">$2,300</p>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">done</span>
                                            </td>
                                            <td className="p-2 text-center align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                <div className="flex items-center justify-center">
                                                    <span className="mr-2 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">100%</span>
                                                    <div>
                                                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                                                            <div className="flex flex-col justify-center w-full h-auto overflow-hidden text-center text-white transition-all bg-blue-500 rounded duration-600 ease bg-gradient-to-tl from-green-600 to-lime-400 whitespace-nowrap" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                                                <button className="inline-block px-5 py-2.5 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400" aria-haspopup="true" aria-expanded="false">
                                                    <i className="text-xs leading-tight fa fa-ellipsis-v dark:text-white dark:opacity-60"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}