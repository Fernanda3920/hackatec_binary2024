import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebaseconfig'; 
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; 
import CommentsSection from '../../header/CommentsSection/CommentSection';
import { getAuth } from 'firebase/auth';
import { Box, Typography, TextField, Button } from "@mui/material";
import  Grid  from '@mui/material/Grid2';

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

import './postlistmodal.css'

const Postslistmodal = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const auth = getAuth(); 
  const userId = auth.currentUser ? auth.currentUser.uid : null; // Obtener el UID del usuario autenticado

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('timestamp', 'desc'));

    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setFilteredPosts(postsData);
      setLoading(false);
    });

    const usersCollection = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersCollection, (snapshot) => {
      const usersData = {};
      snapshot.docs.forEach(doc => {
        usersData[doc.id] = doc.data();
      });
      setUsers(usersData);
    });

    const commentsCollection = collection(db, 'comments');
    const unsubscribeComments = onSnapshot(commentsCollection, (snapshot) => {
      const commentsData = {};
      snapshot.docs.forEach(doc => {
        const comment = doc.data();
        if (!commentsData[comment.postID]) {
          commentsData[comment.postID] = [];
        }
        commentsData[comment.postID].push(comment);
      });
      setComments(commentsData);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
      unsubscribeComments();
    }; 
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const saveTransactionData = async (postId, transactionId) => {
    try {
      const user = auth.currentUser;
      const transactionData = {
        transactionId: transactionId,
        userName: user ? user.displayName : 'Unknown user',
        userId: user ? user.uid : 'N/A',
        postId: postId,
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, 'transactions'), transactionData);
      console.log('Details saved succesfuly.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const transactionId = `TRX-${Math.random().toString(36).substr(2, 9)}`;
      const commentsToDelete = comments[postId] || [];
      for (const comment of commentsToDelete) {
        await deleteDoc(doc(db, 'comments', comment.id));
      }
      await deleteDoc(doc(db, 'posts', postId));
      await saveTransactionData(postId, transactionId);
      alert("Post deleted succesfuly.");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error when trying to post.");
    }
  };

  if (loading) {
    return <div>Cargando publicaciones...</div>;
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
                    Publicaciones Recientes</Typography>
                </Grid>
                <Grid size={1}>
                    <FormControl sx={{ m: 1, width: '25ch' }}  variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                    <OutlinedInput
                        type="text"
                        onChange={handleSearchChange} 
                        required
                        label="text"
                    />
                    </FormControl>
                </Grid>
                <Grid size={1}>
                    <Button color="White" type='submit' onClick={handleSearchSubmit} variant="outlined" style={{ padding: '10px 20px', marginBottom: '20px' }}>
                    Buscar
                    </Button>
                </Grid>
            </Grid>
      </Box>
      {filteredPosts.length > 0 ? (
        <ul>
          {filteredPosts.map((post) => {
            const user = users[post.userID] || {};
            const postComments = comments[post.id] || [];
            return (
              <Box class="frosted box">
              <li key={post.id} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {user.userPhoto && (
                    <img
                      src={user.userPhoto}
                      alt={user.userName}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                    />
                  )}
                  <div>
                    <p><strong>{user.userName || 'Unknown details'}</strong></p>
                    <p><small>{new Date(post.timestamp).toLocaleString()}</small></p>
                  </div>
                </div>
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.description}</p>
                <p><strong>Ubicación:</strong> {post.location}</p> {/* Mostrar ubicación */}
                <p><strong>Categoría:</strong> {post.category}</p> {/* Mostrar categoría */}
                <p><strong>Límite de Personas:</strong> {post.maxPeople}</p> {/* Mostrar límite de personas */}
                {post.isClosed && <p style={{ color: 'red' }}><strong>Este viaje está cerrado.</strong></p>} {/* Mostrar estado de cerrado */}
                {post.imageURL && <img src={post.imageURL} alt={post.title} style={{ maxWidth: '100%' }} />}
                <CommentsSection postId={post.id} />
              
                {/* Mostrar botón de editar solo si la publicación es del usuario autenticado */}
                {post.userID === userId && (
                  <Link to={`/edit-post/${post.id}`} style={{ marginTop: '10px', padding: '8px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Editar
                  </Link>
                )}
              </li>
              </Box>
            );
          })}
        </ul>
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
};

export default Postslistmodal;
