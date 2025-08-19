import { CImage, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { useStore } from '../../../ContextApi/Store';
import { useAdminStore } from '../../ContextApi/Store';

export const DeleteModal = ({ _id, ele, deleteModal, setDeleteModal }) => {

    const { token, showToast } = useStore();
    const { getAllUsers } = useAdminStore();

    const deleteUser = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/delete`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                    "userId": _id
                }
            });
            const myRes = await res.json();

            if (res.ok) {
                showToast(myRes.message, "success");
                setDeleteModal(false);
                getAllUsers();
            }
            else showToast(myRes.message, "error");
        } catch (err) {
            showToast(err.message, "error");
        }
    }

    return (
        <CModal
            alignment="center"
            visible={deleteModal}
            onClose={() => setDeleteModal(false)}
            aria-labelledby="VerticallyCenteredExample"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Delete Confirmation</CModalTitle>
            </CModalHeader>

            {!!ele && <CModalBody>
                <CImage className='mr-2' align="start" rounded src={`https://ui-avatars.com/api/?name=${ele.username[0]}&background=000&color=fff&size=70`} width={100} height={100} />
                <h6>{ele.username}</h6>
                <h6>+91 {ele.phone}</h6>
                <p>{ele.address && ele.address.houseNo ? ele.address.houseNo + " " + ele.address.apartment + " near " + ele.address.suite + ", " + ele.address.city + " - " + ele.address.pincode : "-"}</p>

                <h6 className='text-danger'>Are you sure to delete ({ele.email}) ?</h6>
            </CModalBody>}
            <CModalFooter>
                <CButton color="secondary" onClick={() => setDeleteModal(false)}>
                    No
                </CButton>
                <CButton color="danger" className='text-white' onClick={deleteUser}>Yes</CButton>
            </CModalFooter>
        </CModal>
    )
}