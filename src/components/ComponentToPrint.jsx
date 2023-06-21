import React from "react";
import { numberWithCommas } from "../utils/utils";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart, totalHarga} = props;
    return (
      <div ref={ref} className="p-5 isiStruk kanan">
          <table className='table'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Harga</td>
                      <td>Qty</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalHarga}</td>
                    </tr>)

                    : ''}
                  </tbody>
                </table>
                <h2 className='px-2'>Total Harga: Rp.{numberWithCommas(totalHarga)}</h2>
      </div>
    );
});