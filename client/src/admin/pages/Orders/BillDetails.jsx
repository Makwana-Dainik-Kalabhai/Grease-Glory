import { CCardBody } from '@coreui/react-pro';

export const BillDetails = ({ ele }) => {
    return (
        <CCardBody>
            <h6>Bill Details</h6>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td className='w-100'>Price</td>
                        <td className='w-100 text-right'><span style={{ textDecoration: "line-through" }}>₹{ele.bill.price}</span>&nbsp;₹{ele.bill.offPrice}</td>
                    </tr>
                    <tr>
                        <td className='w-100'>+ Handling Fee</td>
                        <td className='w-100 text-right'>₹{ele.bill.handlingFee}</td>
                    </tr>
                    <tr>
                        <td className='w-100'>+ Delivery Charges</td>
                        <td className='w-100 text-right'>₹{ele.bill.delivery}</td>
                    </tr>
                    <tr>
                        <td className='w-100'>+ GST</td>
                        <td className='w-100 text-right'>₹{ele.bill.gst}</td>
                    </tr>
                    <tr className='bg-danger'>
                        <td className='w-100 px-2 text-white'>Total Price</td>
                        <td className='w-100 px-2 text-right text-white'><span style={{ textDecoration: "line-through" }}>₹{ele.bill.totPrice}</span>&nbsp;₹{ele.bill.totOffPrice}</td>
                    </tr>
                </tbody>
            </table>
        </CCardBody>
    );
}