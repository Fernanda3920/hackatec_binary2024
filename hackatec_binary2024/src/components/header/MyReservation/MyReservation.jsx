import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebaseconfig'; 
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import  Grid  from '@mui/material/Grid2';
import { Box, Typography, TextField, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MyReservation = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate(); // Declara el hook useNavigate

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('Debes estar autenticado para ver tus transacciones.');
        return;
      }

      const userId = user.uid;
      const transactionsCollection = collection(db, 'transactions');
      const q = query(transactionsCollection, where('userId', '==', userId));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const transactionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionsData);
        setLoading(false);

        // Actualizar el límite de personas en función de las transacciones
        await updatePostLimit(transactionsData);
      });

      return () => unsubscribe(); // Cleanup cuando se desmonte el componente
    };

    fetchTransactions();
  }, [auth]);

  // Función para actualizar el límite de personas de los posts
  const updatePostLimit = async (transactionsData) => {
    for (const transaction of transactionsData) {
      const postRef = doc(db, 'posts', transaction.postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = postSnap.data();
        const updatedLimit = postData.limit - 1;

        // Actualizar el límite solo si es mayor a 0
        if (updatedLimit >= 0) {
          await updateDoc(postRef, {
            limit: updatedLimit,
          });
          console.log(`Límite de personas actualizado para el post ${transaction.postId}. Nuevo límite: ${updatedLimit}`);
        } else {
          console.log(`El post ${transaction.postId} ya no tiene más espacio disponible.`);
        }
      }
    }
  };

  const goToWelcome = () => {
    navigate('/Login'); // Navegar a la ruta /welcome
  };

  if (loading) {
    return <div>Cargando transacciones...</div>;
  }

  return (
    <div>
      <Box class='frosted box' >
            <Grid container spacing={2} columns={1}>
                <Grid size={2}/>
                <Grid size={1}>
                    <Typography
                    variant="h4"
                    textAlign={"center"}
                    >
                    Mis Transacciones</Typography>
                </Grid>
                <Grid size={1}>
                    <Button color="White" variant="outlined" onClick={goToWelcome} style={{ padding: '10px 20px', marginBottom: '20px' }}>
                    Submit
                    </Button>
                </Grid>
            </Grid>
      </Box>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
              <h3>Transacción ID: {transaction.transactionId}</h3>
              <p><strong>Nombre del Usuario:</strong> {transaction.userName}</p>
              <p><strong>Fecha de la Transacción:</strong> {new Date(transaction.transactionDate).toLocaleString()}</p>
              <p><strong>Monto:</strong> ${transaction.amount}</p>
              <p><strong>ID de la Publicación:</strong> {transaction.postId}</p>
              <p><strong>Título del Post:</strong> {transaction.postTitle}</p>
              {transaction.imageURL && (
                <img src={transaction.imageURL} alt={`Imagen de la transacción ${transaction.transactionId}`} style={{ maxWidth: '100%', marginTop: '10px' }} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes transacciones.</p>
      )}
    </div>
  );
};

export default MyReservation;
