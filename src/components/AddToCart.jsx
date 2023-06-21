import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../utils/constants';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

// import { TextField } from "@mui/material";



const AddToCart = () => {
  const { user } = useSelector((state) => state.auth);
  const [inv_code, setInvoice] = useState("INV");
  const [qty, setQty] = useState(0);
  const [sub_total, setSubTotal] = useState(0);
  const [total_disc, setTotalDiskon] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [iscard, setIsCard] = useState("M");
  const [note, setNote] = useState("Keterangan");
  const [productId, setProductId] = useState(1);
  const [kodemember, setKodeMember] = useState("KYOSHI");
  const [terapis, setTerapis] = useState("Terapis");
  const [branchId, setBranchId] = useState(1);
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
 
  const [msg, setMsg] = useState("");
  const [members, setMembers] = useState([]); 
  const [productSearch, setProductSearch] = useState("");

  const navigate = useNavigate();
  

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async() => {
    setIsLoading(true);
    const result = await axios.get(API_URL + 'products');
    setProducts(await result.data);
    setIsLoading(false);
  }

  const fetchMembers = async() => {
    const result = await axios.get(API_URL + 'members');
    setMembers(await result.data);
  }

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + 'orders', {
        inv_code: inv_code,
        qty: qty,
        sub_total: sub_total,
        total_disc: total_disc,
        taxes: taxes,
        total_price: totalHarga,
        kodemember: kodemember,
        iscard: iscard,
        note: note,
        terapis: terapis,
        productId: productId,
        branchId: branchId,
      });
      navigate("/carts");
      console.log("Data berhasil masuk ke database");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    
  };

  const addProductToCart = async(product) => {
    // Cek jika product sudah ada di keranjang
    let findProductInCart = cart.find(i => {
      return i.id === product.id;
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalHarga: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
        
      });

      setCart(newCart);
      // console.log(newCart);

    }else{
      let addingProduct = {
        ...product,
        'id': product.id,
        'quantity': 1,
        'totalHarga': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
    }
    // console.log(product);
  }

  const removeProduct = async(product) =>{
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

  const filterItems = () => {
    let searchTxt = document.querySelector("[name='filterItems']").value;
    searchTxt = searchTxt.toLowerCase();
    setProductSearch((productSearch) => searchTxt);
  }

  useEffect(() => {
    fetchProducts();    
  }, []);

  useEffect(() => {
    fetchMembers();
  }, []);
  
  useEffect(() => {
    let newTotalHarga = 0;
    cart.forEach(icart => {
      newTotalHarga = newTotalHarga + parseInt(icart.totalHarga);
    })
    setTotalHarga(newTotalHarga);
  },[cart])

    const [values,setValues]=useState({first:"",second:"",sum:""})
    const [first,setFirst]=useState('')
    const [second,setSecond]=useState('')
    const [sum,setSum]=useState('')
    
    const onChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        const newValues = {
        ...values,
        [name]: value
    } 
    
    setValues(newValues)
    calcSum(newValues)
    calcfirst(newValues)
    calcSecond(newValues)

    }

    const calcSum = (newValues) => {
      const { first,second} = newValues;
      const newSum = parseInt(first,10)+parseInt(second,10)
      setSum(newSum)
    } 

    const calcfirst = (newValues) => {
      const { sum,second} = newValues;
      const newFirst = parseInt(sum,10)-parseInt(second,10)
      setFirst(newFirst)
    } 

    const calcSecond = (newValues) => {
      const { sum,first} = newValues;
      const newSecond = parseInt(sum,10)-parseInt(first,10)
      setSecond(newSecond)
    } 

  return (
      <div>
        <Row>
            <Col className="mt-2">
              <Row>
                <Col>
                <h2 className='subtitle'>Kyoshi Salon Cabang <strong>{user && user.branchId} </strong></h2>
                <h2 className="mt-3">
                  <strong>Daftar Jasa dan Layanan</strong>
                </h2>
                <input style={{ width: '30rem' }} type="text" name="filterItems" placeholder="Cari Jasa Layanan" className="form-control" onChange={() => filterItems()} />
                <div className="list-group">
                  
                    {products.length > 0 ? products.map((product, i) => {
                        let tempName = product.name ? product.name.toLowerCase() : "";
                       
                        return <button type="button" key={i} className={tempName.indexOf(productSearch) !== -1 ? "list-group-item list-group-item-action capitalize" : "hide"}
                            onClick={() => addProductToCart(product)}>{product.name + " - Rp." + numberWithCommas(product.price)}</button>

                    })
                        : null}
                </div>
                </Col>
                </Row>
            </Col>
            
            <Col>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalHarga={totalHarga} ref={componentRef}/>
              </div>
             <Row>
              <form onSubmit={saveOrder}>
              <div className='bg-light'>
                <table className='table table-light table-hover'>
                  <thead>
                    <tr>
                      <td>No.</td>
                      <td>Nama Layanan/Jasa</td>
                      <td>Harga</td>
                      <td>Qty</td>
                      <td>Sub Total</td>
                      <td>Keterangan</td>
                      {/* <td>Product Id</td>
                      <td>BranchId</td> */}
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => 
                      <tr key={key}>
                       {/* {console.log(cartProduct)} */}
                        <td>{key + 1}</td>
                        <td>
                          {cartProduct.name}
                        </td>
                        <td>{numberWithCommas(cartProduct.price)}</td>
                        <td>
                          <input 
                            type='text'
                            name='qty'
                            value={cartProduct.quantity}
                            onChange={e => setQty(e.target.value)}
                            placeholder='Jumlah'
                            disabled/>
                        </td>
                      <td >
                        <input 
                          type='text'
                          name='sub_total'
                          value={numberWithCommas(cartProduct.totalHarga)}
                          onChange={e => setSubTotal(e.target.value)}
                          placeholder='Sub Total'
                          disabled/>
                        </td>
                      <td>
                        <input 
                          type="text" 
                          name='note'
                          value={note}
                          onChange={e => setNote(e.target.value)} 
                          placeholder='Catatan'/>
                      </td>
                      <td style={{display: "none"}}>
                        <input 
                          type='text'
                          name='id'
                          value={cartProduct.id}
                          onChange={e => setProductId(e.target.value)}
                          disabled/>
                      </td>
                      <td style={{display: "none"}}>
                        <input 
                          type='text'
                          name='branchid'
                          value={cartProduct.user.branchId}
                          onChange={e => setBranchId(e.target.value)}
                          disabled/>
                      </td>
                      <td>
                        <button 
                          className='btn btn-danger btn-sm'
                          onClick={() => removeProduct(cartProduct)}>
                          Remove
                        </button>
                      </td>
                      
                    </tr>)

                    : 'Tidak ada Item pada Transaksi'}
                  </tbody>
                </table>
                <div className="card is-shadowless">
                  <div className="card-content">
                    <div className="content">
                     
                        <div style={{display:"flex",flexDirection:"column"}}>
                          {/* <label htmlFor="first">Diskon Member</label>
                          <input onChange={onChange} defaultValue={first} name='first' id="first" type="number"/>

                          <label htmlFor="second">Diskon Uang Muka / DP</label>
                          <input onChange={onChange} defaultValue={second} name="second"  id="second" type="number"/> */}
                          <div className="field">
                            <label htmlFor="invoice">Nomor Invoice</label>
                            <div className='control'>
                              <input 
                                type="text"  
                                name="invoice" 
                                placeholder="Nomor Invoice" 
                                onChange={e => setInvoice(e.target.value)}
                                value={inv_code}/>
                            </div>
                          </div>
                          {/* <div className="field">
                            <label htmlFor="qty">Quantity</label>
                            <div className='control'>
                              <input 
                                type="text"  
                                name="qty" 
                                placeholder="jumlah" 
                                onChange={e => setQty(e.target.value)}
                                value={qty}/>
                            </div>
                          </div>
                          <div className="field">
                            <label htmlFor="sub_total">Sub Total</label>
                            <div className='control'>
                              <input 
                                type="text"  
                                name="sub_total" 
                                placeholder="Sub Total" 
                                onChange={e => setSubTotal(e.target.value)}
                                value={sub_total}/>
                            </div>
                          </div> */}
                          <div className="field">
                            <label htmlFor="diskon"><strong>Diskon</strong></label>
                              <div className='control'> 
                                <input
                                  type="text" 
                                  name="diskon"
                                  onChange={e => setTotalDiskon(e.target.value)} 
                                  value={total_disc}/>
                              </div>
                          </div>
                          <div style={{display: "none"}} className="field">
                            <label htmlFor="taxes"><strong>PPN</strong></label>
                              <div className='control'> 
                                <input
                                  type="text" 
                                  name="taxes"
                                  onChange={e => setTaxes(e.target.value)} 
                                  value={taxes} disabled/>
                              </div>
                          </div>
                          
                          <div className="field">
                            <label htmlFor="member">Kartu</label>
                            <div className='control'> 
                              <input 
                                type="text"  
                                name="iscard" 
                                placeholder="Kartu"
                                onChange={e => setIsCard(e.target.value)}
                                value={iscard}/>
                            </div>
                          </div>
                          {/* <div className="field">
                            <label htmlFor="note">Catatan</label>
                            <div className='control'> 
                              <input 
                                type="text"  
                                name="note" 
                                placeholder="Catatan"
                                onChange={e => setNote(e.target.value)}
                                value={note}/>
                            </div>
                          </div> */}
                          {/* <div className="field">
                            <label htmlFor="productid">Product Id</label>
                            <div className='control'> 
                              <input 
                                type="text"  
                                name="product id" 
                                value={productId}
                                onChange={e => setProductId(e.target.value)}
                                placeholder="Product Id" />
                            </div>
                          </div> */}
                          <div className="field">
                            <label htmlFor="kodemember">Kode Member</label>
                            <div className='control'> 
                              <input 
                                type="text"  
                                name="kodemember" 
                                value={kodemember}
                                onChange={e => setKodeMember(e.target.value)}
                                placeholder="Kode Member" />
                            </div>
                          </div>
                          <div className="field">
                            <label htmlFor="terapis">Terapis</label>
                              <div className='control'>
                                <input 
                                  type="text"  
                                  name="terapis" 
                                  placeholder="Terapis" 
                                  onChange={e => setTerapis(e.target.value)}
                                  value={terapis}/>
                              </div>
                          </div>
                          </div>
                          <div className="field">
                            <label htmlFor="total harga"><strong>Total Harga</strong></label>
                              <div className='control'> 
                                <input
                                  type="text" 
                                  name="totalharga"
                                  onChange={e => setTotalHarga(e.target.value)} 
                                  value={numberWithCommas(totalHarga)}
                                  disabled/>
                              </div>
                          </div>
                          {/* <h2 className='px-2'><strong>Total Harga: Rp.{numberWithCommas(totalHarga)}</strong></h2> */}
                          <div className='mt-3'>
                              { totalHarga !== 0 ? <div>
                                <button type='submit' className='btn btn-primary'  onClick={handlePrint}>
                                  Bayar
                                </button>

                              </div> : ''
                              }
                            </div>
                      </div>
                    </div>
                  </div>
                {/* <h2 className='px-2'><strong>Nama Pelanggan: {member.name}</strong></h2> */}
                </div>
              </form>
              </Row>
              
            </Col>   
        </Row>
      </div> 
  )
}

export default AddToCart
