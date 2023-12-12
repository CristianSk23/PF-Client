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
      modalText = 'Successful purchase. \n\nWe hope you come back soon!'; 
    } else if (status === 'rejected') {
      modalText = 'Your payment has been rejected. \n\nPlease try again later!'; 
    } else  {
      modalText = 'If you have any concerns about our payment methods, please let us know.'; 
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
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '350px', 
            height: '200px', 
            margin: 'auto', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign:"center",
            marginTop:"200px"
          },
        }}
      >
        <h2 style={{ color: '#333', fontSize: '18px', fontWeight: 'bold', margin: '20px 0', whiteSpace: 'pre-line', textAlign:"center" }}>{modalContent}</h2>
        <button className="btn btn-primary" style={{ alignSelf: "center" }} onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
}

export default PaymentStatus;