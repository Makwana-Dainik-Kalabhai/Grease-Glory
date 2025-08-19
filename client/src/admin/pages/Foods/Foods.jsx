import { CBadge, CButton, CSmartTable, CImage } from '@coreui/react-pro'
import { useAdminStore } from '../../ContextApi/Store';
import { useState } from 'react';
import { EditModal } from './EditModal';
import { DeleteModal } from './DeleteModal';

export const Foods = () => {

    const { allFoods } = useAdminStore();

    //* For Edit Food
    const [currEle, setCurrEle] = useState("");
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const columns = [
        { key: "img", label: "Food", filter: false, sorter: false, _style: { textAlign: "center" } },
        { key: "veg", label: "Veg", filter: false, sorter: false, _style: { textAlign: "center" } },
        { key: 'category', label: "Category", _style: { textAlign: "center" } },
        { key: "name", label: "FoodName", _style: { textAlign: "center" } },
        { key: "description", label: "Description", _style: { textAlign: "center" } },
        { key: "offer_price", label: "Offer Price", _style: { width: "10%", textAlign: "center" } },
        { key: "price", label: "Price", _style: { width: "7.5%", textAlign: "center" } },
        { key: "delete", label: "Edit / Delete", sorter: false, filter: false, _style: { width: "11%", textAlign: "center" } },
    ];



    return (
        <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-full max-w-full px-3">
                <div className="p-4 relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                    <div className="mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                        <h6 className="dark:text-white">Foods List</h6>
                    </div>
                    <hr />
                    <CSmartTable
                        pagination
                        paginationProps={
                            {
                                style: {
                                    position: "relative",
                                    cursor: "pointer"
                                }
                            }
                        }
                        activePage={1}
                        cleaner
                        clickableRows
                        columns={columns}
                        columnFilter
                        columnSorter
                        items={allFoods}
                        itemsPerPageSelect
                        itemsPerPage={5}
                        scopedColumns={{
                            img: (item) => (
                                <td><CImage align="start" rounded src={item.img} width={100} height={100} /></td>
                            ),
                            veg: (item) => (
                                <td className='text-center'>
                                    {(item.veg) ? <CBadge className='border border-success'><i className="fa-solid fa-circle text-success"></i></CBadge> : <CBadge className='border border-danger'><i className="fa-solid fa-circle text-danger"></i></CBadge>}
                                </td>
                            ),
                            category: (item) => (
                                <td className='text-center'><CBadge color="warning" shape="rounded-pill">{item.category}</CBadge></td>
                            ),
                            name: (item) => (
                                <td>{item.name}</td>
                            ),
                            description: (item) => (
                                <td>{item.description}</td>
                            ),
                            offer_price: (item) => (
                                <td className='text-center'><CBadge color="danger">₹ {item.offer_price}</CBadge></td>
                            ),
                            price: (item) => (
                                <td className='text-center' style={{ textDecoration: "line-through" }}>₹ {item.price}</td>
                            ),
                            delete: (item) => (
                                <td>
                                    <CButton color="primary" onClick={() => { setCurrEle(item); setEditModal(true); }}><i className='fa-solid fa-edit'></i></CButton>&ensp;
                                    <CButton color="dark" onClick={() => { setCurrEle(item); setDeleteModal(true); }}><i className='fa-solid fa-trash'></i></CButton>
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


                    <DeleteModal _id={currEle._id} ele={currEle} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                    <EditModal ele={currEle} editModal={editModal} setEditModal={setEditModal} />
                </div>
            </div>
        </div>
    );
}