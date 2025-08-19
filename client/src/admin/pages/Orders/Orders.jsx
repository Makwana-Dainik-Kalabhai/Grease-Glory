import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CBadge, CButton, CCol, CDatePicker, CRow } from '@coreui/react-pro';
import { CAccordion } from '@coreui/react-pro'
import { useAdminStore } from '../../ContextApi/Store';
import { useEffect, useState } from 'react';
import { OrderCard } from './OrderCard';

export const Orders = () => {

    const { allOrders } = useAdminStore();
    const [status, setStatus] = useState("All");
    const [filterOrders, setFilterOrders] = useState({
        Processing: 0,
        Completed: 0,
        Cancelled: 0
    });
    const [filterDate, setFilterDate] = useState("All");

    useEffect(() => {

        setFilterOrders({ Processing: 0, Completed: 0, Cancelled: 0 });

        !!allOrders && allOrders.map((ele) => {
            setFilterOrders((prev) => ({ ...prev, [ele.status]: prev[ele.status] + 1 }));
        });
    }, [allOrders]);

    return (
        <CCard style={{ width: "100%" }}>
            <CCardHeader>
                <CNav variant="pills" className="card-header-pills">
                    <CNavItem className='cursor-pointer'>
                        <CNavLink active={status === "All"} onClick={() => setStatus("All")}>All <CBadge color='dark'>{allOrders.length}</CBadge></CNavLink>
                    </CNavItem>

                    <CNavItem className='cursor-pointer'>
                        <CNavLink active={status === "Processing"} onClick={() => setStatus("Processing")}>Processing <CBadge color='warning'>{filterOrders.Processing}</CBadge></CNavLink>
                    </CNavItem>

                    <CNavItem className='cursor-pointer'>
                        <CNavLink active={status === "Completed"} onClick={() => setStatus("Completed")}>Completed <CBadge color='success'>{filterOrders.Completed}</CBadge></CNavLink>
                    </CNavItem>

                    <CNavItem className='cursor-pointer mr-6'>
                        <CNavLink active={status === "Cancelled"} onClick={() => setStatus("Cancelled")}>Cancelled <CBadge color='danger'>{filterOrders.Cancelled}</CBadge></CNavLink>
                    </CNavItem>

                    <CDatePicker className='ml-6' locale="en-US" placeholder="MM/DD/YYYY" onChange={(e) => { alert("Date:   ", e.target.value); }} onDateChange={(date) => setFilterDate(date.toLocaleDateString())} />
                </CNav>
            </CCardHeader>
            <CCardBody>
                <CAccordion>
                    {/* //! Orders */}
                    {allOrders && allOrders.map((ele, ind) => {
                        return (status === "All" || ele.status === status) && (filterDate === "All" || filterDate == ele.date) && <OrderCard ele={ele} ind={ind} key={ele._id} />
                    })}
                </CAccordion>
            </CCardBody>
        </CCard>
    );
}