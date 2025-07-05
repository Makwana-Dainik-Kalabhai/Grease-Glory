import "./Profile.css";
import { useStore } from "../../ContextApi/Store";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Profile = () => {

    const navigate = useNavigate();

    const { isLogin, userData, showToast } = useStore();

    if (!isLogin) navigate(-1);

    const [myUser, setMyUser] = useState();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        !!userData && setMyUser(userData) && console.log(userData);
    }, [userData]);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setMyUser((prev) => ({ ...prev, [name]: value }));
    }
    const handleAddress = (e) => {
        const { name, value } = e.target;

        setMyUser((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
    }

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/user/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(myUser)
            });

            const myRes = await res.json();

            if (res.ok) showToast(myRes.message, "success");
            else showToast(myRes.message, "error");
            //
        }
        catch (err) {
            showToast(err.message, "error");
        }
        setEdit(false);
    }

    return (
        <section>
            <div className="decoration-box left-top"></div>
            <div className="decoration-box left-bottom"></div>
            <div className="decoration-box right-bottom"></div>

            {!!myUser && <main className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img src={`https://ui-avatars.com/api/?name=${myUser.username[0]}&background=green&color=fff&size=120`} alt="Profile Picture" />
                    </div>
                    <h1 className="profile-name">{myUser.username}</h1>
                    <p className="profile-email">{(myUser.email.split("@")[0]).substring(0, 5) + "xxxx" + myUser.email.split("@")[1]}</p>
                    {!edit && <button className="btn btn-primary edit-profile-btn" onClick={() => setEdit(true)}>Edit Profile</button>}
                </div>

                <div className="profile-grid">
                    <div className="card">
                        <h2 className="section-title">Personal Information</h2>

                        {!edit && <div>
                            <div className="info-item">
                                <div className="info-label">Username</div>
                                <div className="info-value">{myUser.username}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Email</div>
                                <div className="info-value">{(myUser.email.split("@")[0]).substring(0, 5) + "xxxx" + myUser.email.split("@")[1]}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Phone</div>
                                <div className="info-value">+91 {myUser.phone}</div>
                            </div>
                        </div>}

                        {edit && <form onSubmit={handleForm}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" onChange={handleInput} className="form-control" value={myUser.username} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange={handleInput} className="form-control" value={myUser.email} readOnly required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" name="phone" onChange={handleInput} className="form-control" value={myUser.phone} minLength={10} maxLength={10} required />
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                                <button type="button" class="btn btn-outline" onClick={() => setEdit(false)}>Cancel</button>
                            </div>
                        </form>}
                    </div>

                    <div className="card">
                        <h2 className="section-title">Delivery Address</h2>

                        {!edit && <div>
                            <div className="info-item">
                                <div className="info-label">House/Apartment No.</div>
                                <div className="info-value">{myUser.address.houseNo}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Apartment/Building</div>
                                <div className="info-value">{myUser.address.apartment}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Suite/Floor</div>
                                <div className="info-value">{myUser.address.suite}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">City</div>
                                <div className="info-value">{myUser.address.city}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">ZIP/Pincode</div>
                                <div className="info-value">{myUser.address.pincode}</div>
                            </div>
                        </div>}

                        {edit && <form onSubmit={handleForm}>
                            <div className="form-group">
                                <label htmlFor="houseNo">House/Apartment No.</label>
                                <input type="text" name="houseNo" onChange={handleAddress} className="form-control" value={myUser.address.houseNo} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apartment">Apartment/Building (optional)</label>
                                <input type="text" name="apartment" onChange={handleAddress} className="form-control" value={myUser.address.apartment} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="suite">Suite/Floor (optional)</label>
                                <input type="text" name="suite" onChange={handleAddress} className="form-control" value={myUser.address.suite} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" onChange={handleAddress} className="form-control" value={myUser.address.city} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode">ZIP/Pincode</label>
                                <input type="number" name="pincode" onChange={handleAddress} className="form-control" value={myUser.address.pincode} minLength={6} maxLength={6} required />
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                                <button type="button" class="btn btn-outline" onClick={() => setEdit(false)}>Cancel</button>
                            </div>
                        </form>}
                    </div>
                </div>
            </main>}
        </section>
    );
}