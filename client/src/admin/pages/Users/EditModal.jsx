import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro'

//* Form Elements
import { CFormInput, CFormSelect, CRow, CCol } from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import { useStore } from '../../../ContextApi/Store'
import { useAdminStore } from '../../ContextApi/Store'


export const EditModal = ({ ele, editModal, setEditModal }) => {
    const { showToast } = useStore();
    const { getAllUsers } = useAdminStore();

    const [userData, setUserData] = useState(ele);

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "houseNo" || name === "apartment" || name === "suite" || name === "city" || name === "pincode")
            setUserData((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
        else
            setUserData((prev) => ({ ...prev, [name]: value }));
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}user/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const myRes = await res.json();

            if (res.ok) {
                showToast(myRes.message, "success");
                setEditModal(false);
                getAllUsers();
            }
            else showToast(myRes.message, "error");
            //
        }
        catch (err) {
            showToast(err.message, "error");
        }
    }

    useEffect(() => {
        !!ele && !userData && setUserData(ele);
    }, [ele]);



    return (
        <CModal
            alignment="center"
            scrollable
            visible={editModal}
            onClose={() => setEditModal(false)}
            aria-labelledby="VerticallyCenteredScrollableExample2"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample2">Edit User</CModalTitle>
            </CModalHeader>

            {!!ele && <CModalBody>
                <CFormSelect
                    floatingLabel="Active / Blocked ?"
                    floatingClassName="mb-3"
                    name="active"
                    onChange={handleInput}
                >
                    <option value={true} selected={ele.active}>Active</option>
                    <option value={false} selected={!ele.active}>Blocked</option>
                </CFormSelect>

                <CFormInput
                    type="text"
                    floatingClassName="mb-3"
                    floatingLabel="Username"
                    placeholder="Example123"
                    defaultValue={ele.username && ele.username}
                    required
                    name='username'
                    onChange={handleInput}
                />
                <CFormInput
                    type="email"
                    floatingClassName="mb-3"
                    floatingLabel="Email ID"
                    placeholder="name@example.com"
                    defaultValue={ele.email && ele.email}
                    required
                    name='email'
                    onChange={handleInput}
                />
                <CFormInput
                    type="text"
                    floatingClassName="mb-3"
                    floatingLabel="Phone No."
                    minLength={10}
                    maxLength={10}
                    placeholder="98989 89898"
                    defaultValue={ele.phone && ele.phone}
                    required
                    name='phone'
                    onChange={handleInput}
                />
                <CFormSelect
                    floatingLabel="Is Admin?"
                    name='isAdmin'
                    onChange={handleInput}
                >
                    <option value={false} selected={!ele.isAdmin}>No</option>
                    <option value={true} selected={ele.isAdmin}>YES</option>
                </CFormSelect>

                <h6 htmlFor="basic-url" className='mt-4 text-primary' style={{ display: "block", textAlign: "center" }}>Enter Address</h6>
                <CRow>
                    <CCol>
                        <CFormInput
                            type="text"
                            floatingClassName="mb-3"
                            floatingLabel="House No."
                            placeholder="A/202"
                            defaultValue={ele.address && ele.address.houseNo}
                            required
                            name='houseNo'
                            onChange={handleInput}
                        />
                    </CCol>
                    <CCol>
                        <CFormInput
                            type="text"
                            floatingClassName="mb-3"
                            floatingLabel="Apartment"
                            placeholder="P & T Colony"
                            defaultValue={ele.address && ele.address.apartment}
                            required
                            name='apartment'
                            onChange={handleInput}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormInput
                            type="text"
                            floatingClassName="mb-3"
                            floatingLabel="Suite (Optional)"
                            placeholder="KB Royal"
                            defaultValue={ele.address && ele.address.suite}
                            name='suite'
                            onChange={handleInput}
                        />
                    </CCol>
                    <CCol>
                        <CFormInput
                            type="text"
                            floatingClassName="mb-3"
                            floatingLabel="City"
                            placeholder="Ahmedabad"
                            defaultValue={ele.address && ele.address.city}
                            required
                            name='city'
                            onChange={handleInput}
                        />
                    </CCol>
                    <CCol>
                        <CFormInput
                            type="number"
                            floatingClassName="mb-3"
                            floatingLabel="Pincode"
                            placeholder="382400"
                            defaultValue={ele.address && ele.address.pincode}
                            required
                            name='pincode'
                            onChange={handleInput}
                        />
                    </CCol>
                </CRow>
            </CModalBody>}

            <CModalFooter>
                <CButton color="secondary" onClick={() => setEditModal(false)}>
                    Close
                </CButton>
                <CButton color="primary" onClick={submitForm}>Save changes</CButton>
            </CModalFooter>
        </CModal>
    )
}