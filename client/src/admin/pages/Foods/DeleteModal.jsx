import { CImage, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { useStore } from '../../../ContextApi/Store';
import { useAdminStore } from '../../ContextApi/Store';

export const DeleteModal = ({ _id, ele, deleteModal, setDeleteModal }) => {

    const { token, showToast } = useStore();
    const { getAllFoods } = useAdminStore();

    const deleteFood = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/food/delete`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                    "_id": _id
                }
            });

            if (res.ok) {
                const myRes = await res.json();

                showToast(myRes.message, "success");
                getAllFoods();
            }
            else showToast(res.message, "error");
            //
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
                <CImage className='mr-2' align="start" rounded src={ele.img} width={120} height={120} />
                <h6>{ele.name}</h6>
                <p>{ele.description}</p>&ensp;
                <h6 className='text-danger'>Are you sure to delete ({ele.name}) ?</h6>
            </CModalBody>}
            <CModalFooter>
                <CButton color="secondary" onClick={() => setDeleteModal(false)}>
                    No
                </CButton>
                <CButton color="danger" className='text-white' onClick={deleteFood}>Yes</CButton>
            </CModalFooter>
        </CModal>
    )
}