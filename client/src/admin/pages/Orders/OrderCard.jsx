import { CCard, CCardImage, CCol, CRow, CBadge, CButton } from '@coreui/react-pro';
import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react-pro'
import { UserDetails } from './UserDetails';
import { BillDetails } from './BillDetails';
import { FoodCard } from './FoodCard';


export const OrderCard = ({ ele, ind }) => {
    return (
        <CCard className="mb-5 position-relative">

            {/* //* Order Status */}
            <CBadge color={`${(ele.status === "Completed") ? "success" : ((ele.status === "Processing") ? "warning" : "danger")}`} className='position-absolute top-0 left-0'>{ele.status}</CBadge>

            <small className="position-absolute top-3 right-0 pr-3 text-body-secondary">{new Date(Number.parseInt(ele.time)).toISOString().replace('T', ' ').replace(/\..+/, '')}</small>

            <CRow className="g-0 justify-content-between">
                <CCol md={2}>
                    <CCardImage src={`https://ui-avatars.com/api/?name=${ele.user.username[0]}&background=000&color=fff`} />
                </CCol>
                <CCol md={4}>
                    <UserDetails ele={ele} />
                </CCol>
                <CCol md={5}>
                    <BillDetails ele={ele} />
                </CCol>
            </CRow>


            <CAccordionItem className='border rounded' itemKey={ind}>
                <CAccordionHeader>Ordered Items ({ele.items.length})</CAccordionHeader>
                <CAccordionBody>
                    {ele.items.map((item) => (
                        <FoodCard item={item} key={item.productId._id} />
                    ))}
                </CAccordionBody>
            </CAccordionItem>

            <CButton color='dark' className='mt-4'>Update Status</CButton>
        </CCard>
    )
}