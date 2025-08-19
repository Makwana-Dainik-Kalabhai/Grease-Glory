import { CCardBody, CCardText, CCardTitle } from '@coreui/react-pro';

export const UserDetails = ({ ele }) => {
    return (
        <CCardBody>
            <h6>User Details</h6>
            <hr />
            <CCardTitle className='text-danger'>{ele.user.username}</CCardTitle>
            <CCardText>{ele.user.address && ele.user.address.houseNo ? ele.user.address.houseNo + " " + ele.user.address.apartment + " near " + ele.user.address.suite + ", " + ele.user.address.city + " - " + ele.user.address.pincode : "-"}</CCardText>
            <CCardText>
                <small className="text-body-secondary">+91 {ele.user.phone}</small>
            </CCardText>
        </CCardBody>
    );
}