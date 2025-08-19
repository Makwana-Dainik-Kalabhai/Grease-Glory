import { CCard, CCardBody, CCardText, CCardImage, CCol, CRow, CBadge } from '@coreui/react-pro';

export const FoodCard = ({ item }) => {
    return (
        <CCard className="mb-3 position-relative" key={item.productId._id}>
            {(item.productId.veg) ? <CBadge className='position-absolute right-0 me-3 border border-success'><i className="fa-solid fa-circle text-success"></i></CBadge> : <CBadge className='position-absolute right-0 me-3 border border-danger'><i className="fa-solid fa-circle text-danger"></i></CBadge>}

            <CBadge color='success' className='position-absolute'>{item.productId.category}</CBadge>
            <CRow className="g-0">
                <CCol md={4}>
                    <CCardImage src={item.productId.img} />
                </CCol>

                <CCol md={8}>
                    <CCardBody>
                        <h6 className='text-primary'>{item.productId.name}</h6>
                        <CCardText className='mb-0'>{(item.productId.description.length > 160) ? item.productId.description.substring(0, 160) + " ..." : item.productId.description}</CCardText>

                        <small className="text-danger">₹{item.productId.offer_price}</small>&ensp;
                        <small className="text-body-secondary" style={{ textDecoration: "line-through" }}>₹{item.productId.price}</small>
                    </CCardBody>
                </CCol>
            </CRow>
        </CCard>
    );
}