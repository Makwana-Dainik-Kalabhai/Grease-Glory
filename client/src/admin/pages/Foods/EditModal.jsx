import { CImage, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro'

//* Form Elements
import { CRow, CCol, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import { useStore } from '../../../ContextApi/Store'
import { useAdminStore } from '../../ContextApi/Store'


export const EditModal = ({ ele, editModal, setEditModal }) => {
    const { token, showToast } = useStore();
    const { getAllFoods } = useAdminStore();

    const [foodData, setFoodData] = useState(ele);

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "img") {
            const file = e.target.files[0];
            if (!file || !file.type.startsWith("image/")) {
                showToast("Select an Image", "error");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFoodData((prev) => ({ ...prev, ["img"]: reader.result }));
                e.target.value = "";
            }
            reader.readAsDataURL(file);
        }
        else
            setFoodData((prev) => ({ ...prev, [name]: value }));
    }


    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/food/update`, {
                method: "PATCH",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(foodData)
            });

            const myRes = await res.json();

            if (res.ok) {
                showToast(myRes.message, "success");
                setEditModal(false);
                getAllFoods();
            }
            else showToast(myRes.message, "error");
            //
        }
        catch (err) {
            showToast(err.message, "error");
        }
    }

    useEffect(() => { !!ele && !foodData && setFoodData(ele) }, [ele]);



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
                <CRow className='mb-3'>
                    <CCol className='col-md-3'>
                        <CImage align="start" rounded src={(foodData.img) ? foodData.img : ele.img} width={100} height={100} />
                    </CCol>

                    <CCol>
                        <CFormInput floatingLabel="Food Image" type="file" name='img' onChange={handleInput} />
                    </CCol>
                </CRow>

                <CFormSelect
                    floatingLabel="Veg / Non-Veg ?"
                    floatingClassName="mb-3"
                    name="veg"
                    onChange={handleInput}
                >
                    <option value={true} selected={ele.veg}>Veg</option>
                    <option value={false} selected={!ele.veg}>Non-Veg</option>
                </CFormSelect>

                <CFormInput
                    type="text"
                    floatingClassName="mb-3"
                    floatingLabel="Category"
                    placeholder="Pizza"
                    defaultValue={ele.category && ele.category}
                    required
                    name='category'
                    onChange={handleInput}
                />
                <CFormInput
                    type="text"
                    floatingClassName="mb-3"
                    floatingLabel="Food Name"
                    placeholder="name@example.com"
                    defaultValue={ele.name && ele.name}
                    required
                    name='name'
                    onChange={handleInput}
                />

                <CFormTextarea
                    floatingClassName="mb-3"
                    floatingLabel="Food Description"
                    rows={5}
                    placeholder='Description'
                    defaultValue={ele.description && ele.description}
                    name='description'
                    onChange={handleInput}
                ></CFormTextarea>

                <CFormInput
                    type="number"
                    floatingClassName="mb-3"
                    floatingLabel="Offer Price (₹)"
                    placeholder="Offer Price"
                    defaultValue={ele.offer_price && ele.offer_price}
                    required
                    name='offer_price'
                    onChange={handleInput}
                />

                <CFormInput
                    type="number"
                    floatingClassName="mb-3"
                    floatingLabel="Price (₹)"
                    placeholder="Price"
                    defaultValue={ele.price && ele.price}
                    required
                    name='price'
                    onChange={handleInput}
                />
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