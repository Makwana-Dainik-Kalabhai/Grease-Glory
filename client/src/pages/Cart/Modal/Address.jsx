import { useStore } from "../../../ContextApi/Store";
import { useState } from "react";
import "./Address.css";

export const Address = ({ oldAddress, setAddressModal }) => {

    const { isLogin, isLoading, showLoader, setIsLoading, showToast, userData, getUserData } = useStore();

    const [address, setAddress] = useState({
        houseNo: oldAddress.houseNo,
        apartment: oldAddress.apartment,
        suite: oldAddress.suite,
        city: oldAddress.city,
        pincode: oldAddress.pincode
    });


    //! Handle Input
    const handleInput = (e) => {
        const { name, value } = e.target;

        setAddress((prev) => ({ ...prev, [name]: value }));
    }



    //! Handle Form
    const handleForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const myUser = { ...userData, address };

            const res = await fetch("http://localhost:3001/user/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myUser)
            });
            console.log(res);
            const myRes = await res.json();
            console.log(myRes);

            if (res.ok) {
                getUserData();
                setAddressModal(false);
            }
            else showToast(myRes.message, "error");
            //
        }
        //
        catch (err) {
            showToast(err.message, "error");
        }
        setIsLoading(false);
    }



    return (
        <div className="modal-container">
            <div className="address-form">
                <i className="fa-solid fa-xmark close-modal" onClick={() => { setAddressModal(false); }}></i>

                <h1 className="heading">GreaseGlory <span>Delivery</span></h1>

                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <label htmlFor="">House No. / Block</label>
                        <input type="text" name="houseNo" value={address.houseNo} onChange={handleInput} placeholder="A/101" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Apartment Name / Society</label>
                        <input type="text" name="apartment" value={address.apartment} onChange={handleInput} placeholder="Dev Prime Residency" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Apartment Suite (Optional)</label>
                        <input type="text" name="suite" value={address.suite} onChange={handleInput} placeholder="KB Royal Homes" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" value={address.city} onChange={handleInput} placeholder="Ahmedabad" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pincode</label>
                        <input type="number" name="pincode" value={address.pincode} onChange={handleInput} min="0" minLength="6" maxLength="6" placeholder="380001" required />
                    </div>

                    <div className="form-btns">
                        <button onClick={() => setAddressModal(false)}>Cancel</button>
                        <button type="submit">{isLoading ? showLoader(20, 20, "white") : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}