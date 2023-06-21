import React, { useEffect } from 'react'
import Layout from './Layout'
import FormAddOrder from '../components/FormAddOrder'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";


const Orders = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <FormAddOrder />
    </Layout>
  )
}

export default Orders
