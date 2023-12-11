import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';
import Modal from 'react-modal';
import NavBar from "../navBar/NavBar";
import { createOrder } from '../../redux/action/actions';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Define the useQuery function before using it
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  // Call useQuery to get the query parameters
  const query = useQuery();
  const payment_id = query.get("payment_id");
  const status = query.get("status");
  const merchant_order_id = query.get("merchant_order_id");

  // Send data in the POST request
  useEffect(() => {
    dispatch(createOrder({id: query.get("id"), 
                          payment_id, 
                          status, 
                          merchant_order_id})
    );

    // Set modal content based on status
    let modalText = '';
    if (status === 'approved') {
      modalText = 'Many thanks for your buys. We hope you to come back soon!'; 
    } else if (status === 'rejected') {
      modalText = 'we noticed that your payment has been rejected, please try again later'; 
    } else  {
      modalText = 'If you have any concerns about our payment methods, please let us know'; 
    }
    setModalContent(modalText);
    setModalIsOpen(true);

  }, []);

  const handleModalClose = () => {
    setModalIsOpen(false);

    // Redirect based on status
    if (status === 'approved') {
        navigate('/'); // Replace with your approved route
      } else if (status === 'rejected') {
        navigate('/'); // Replace with your rejected route
      } else {
        navigate('/'); // Replace with your pending route
      }
    };

  return (
    <div>
      <NavBar />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Payment Status Modal"
      >
        <h2>{modalContent}</h2>
        <button onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
}

export default PaymentStatus;