import React, { useEffect } from 'react'
import Layout from './Layout'
import FormAddUser from '../components/FormAddUser'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import DisplayFormUser from '../components/DisplayFormUser';

const AddUser = () => {
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
    if (user && user.role !== "Owner") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        {/* <FormAddUser /> */}
        <DisplayFormUser />
    </Layout>
  )
}

export default AddUser
