import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants';
import { useSelector } from "react-redux";
import { DateRangePicker } from 'react-date-range';
import { numberWithCommas } from '../utils/utils';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const FormReport = () => {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [startDate,setStartDate]= useState(new Date());
    const [endDate,setEndDate]= useState(new Date());
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchOrder = async() => {
      const result = await axios.get(API_URL + 'orders');
      setOrders(await result.data);
      setAllOrders(await result.data);
      // console.log(result);
    }

    const handleSelect = (date) =>{
      let filtered = allOrders.filter((order)=>{
      let orderDate = new Date(order["createdAt"]);
        return(orderDate>= date.selection.startDate &&
          orderDate<= date.selection.endDate);
      })
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
        setOrders(filtered);
    };
  
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }

    useEffect(() => {
      fetchOrder();    
    }, []);

    // useEffect(() => {
    //   let newTotalPrice = 0;
    //   cart.forEach(icart => {
    //     newTotalPrice = newTotalPrice + parseInt(icart.totalHarga);
    //   })
    //   setTotalPrice(newTotalPrice);   
    // },[]);


  return (
    <div>
      <h1 className="title">Kyoshi Salon</h1>
      <h2 className="subtitle">Laporan <strong>{user && user.branchId}</strong></h2>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomor Invoice</th>
            <th>Diskon</th>
            <th>Total Harga</th>
            <th>Kasir</th>
            <th>Terapis</th>
            <th>Tanggal Transaksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            let date = new Date(order["createdAt"]);
            return(
            <tr key={order.uuid}>
              <td>{index + 1}</td>
              <td>{order["inv_code"]}</td>
              <td>{numberWithCommas(order.total_disc)}</td>
              <td>{numberWithCommas(order.total_price)}</td>
              <td>{order.user.name}</td>
              <td>{order.terapis}</td>
              <td>{date.toLocaleDateString()}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FormReport
