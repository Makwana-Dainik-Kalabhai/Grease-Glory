export const calculate = (
  setTotal,
  address,
  setAddress,
  unavailable,
  userData,
  cartItems
) => {
  setTotal({
    price: 0,
    offPrice: 0,
    totPrice: 0,
    totOffPrice: 0,
    handlingFee: 15,
    delivery: 0,
    gst: 0,
  });

  //! Calculate Total OfferPrice and Price
  let tmpOff = 0,
    tmpPrice = 0;

  cartItems.map((ele) => {
    if (ele.productId.quantity > 0) {
      setTotal((prev) => ({
        ...prev,
        ["offPrice"]: prev.offPrice + ele.productId.offer_price * ele.quantity,
        ["price"]: prev.price + ele.productId.price * ele.quantity,
        ["totCost"]: prev.totCost + ele.productId.cost,
      }));

      tmpOff += ele.productId.offer_price * ele.quantity;
      tmpPrice += ele.productId.price * ele.quantity;
    }
    if (ele.productId.quantity <= 0) unavailable += 1;

    return "";
  });

  setTotal((prev) => ({
    ...prev,
    ["delivery"]: tmpOff < 400 ? 30 : tmpOff > 400 && tmpOff < 700 ? 15 : 0,
  }));
  setTotal((prev) => ({ ...prev, ["gst"]: (tmpOff * 1) / 100 }));

  tmpOff = Math.ceil(
    tmpOff +
      15 +
      ((tmpOff < 400 ? 30 : tmpOff > 400 && tmpOff < 700 ? 15 : 0) +
        (tmpOff * 1) / 100)
  );
  setTotal((prev) => ({ ...prev, ["totOffPrice"]: tmpOff }));

  tmpPrice = Math.floor(
    tmpPrice +
      15 +
      ((tmpPrice < 400 ? 30 : tmpPrice > 400 && tmpPrice < 700 ? 15 : 0) +
        (tmpPrice * 1) / 100)
  );

  setTotal((prev) => ({ ...prev, ["totPrice"]: tmpPrice }));

  //! Set Address for User Details Section
  address !== undefined &&
    !!address.apartment &&
    setAddress(
      userData.address.houseNo +
        ", " +
        userData.address.apartment +
        " " +
        (!!userData.address.suite ? "near " + userData.address.suite : "") +
        ", " +
        userData.address.city +
        " - " +
        userData.address.pincode
    );

  //
};
