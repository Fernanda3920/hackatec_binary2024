import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebaseconfig';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import Sentiment from 'sentiment';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState({ id: '', text: '' });
  const auth = getAuth();
  const sentimentInstance = new Sentiment();

  useEffect(() => {
    const fetchComments = async () => {
      const commentsCollection = collection(db, 'posts', postId, 'comments');
      const q = query(commentsCollection, orderBy('timestamp', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenar los comentarios por el score de sentimiento
        const sortedComments = commentsData.sort((a, b) => {
          const sentimentA = sentimentInstance.analyze(a.text).score;
          const sentimentB = sentimentInstance.analyze(b.text).score;
          return sentimentB - sentimentA; // Ordenar de mayor a menor score
        });

        setComments(sortedComments);
      });

      return () => unsubscribe();
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !newComment.trim()) {
      alert('You should be authenticated beforehand.');
      return;
    }

    // Analizar el sentimiento del comentario
    const sentimentResult = sentimentInstance.analyze(newComment);
    const sentimentScore = sentimentResult.score > 0 ? 'Positive' : sentimentResult.score < 0 ? 'Negative' : 'Neutral';

    try {
      const commentsCollection = collection(db, 'posts', postId, 'comments');
      await addDoc(commentsCollection, {
        text: newComment,
        sentiment: sentimentScore, // Guardar el resultado del análisis de sentimiento
        score: sentimentResult.score, // Guardar el score del análisis de sentimiento
        timestamp: new Date().toISOString(),
        userId: user.uid,
        userName: user.displayName || 'Unknown users',
        userPhoto: user.photoURL || 'URL Default'
      });
      setNewComment('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error.');
    }
  };

  const handleEditComment = async (e, id) => {
    e.preventDefault();
    if (!editComment.text.trim()) {
      alert('The comment should not be empty.');
      return;
    }

    // Reanalizar el sentimiento si se edita el comentario
    const sentimentResult = sentimentInstance.analyze(editComment.text);
    const sentimentScore = sentimentResult.score > 0 ? 'Positive' : sentimentResult.score < 0 ? 'Negative' : 'Neutral';

    try {
      const commentDoc = doc(db, 'posts', postId, 'comments', id);
      await updateDoc(commentDoc, { text: editComment.text, sentiment: sentimentScore, score: sentimentResult.score });
      setEditComment({ id: '', text: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Error.');
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const commentDoc = doc(db, 'posts', postId, 'comments', id);
        await deleteDoc(commentDoc);
        alert('Comment deleted succesfuly.');
      } catch (error) {
        console.error('Error:', error);
        alert('Error.');
      }
    }
  };

  return (
    <div>
      <h4>Reseñas:</h4>
      <form onSubmit={handleAddComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
          required
          style={{ width: '100%' }}
        />
        <button type="submit">Agregar Comentario</button>
      </form>

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <img
                src={comment.userPhoto}
                alt={comment.userName}
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
              <div>
                <p><strong>{comment.userName}</strong> <small>{new Date(comment.timestamp).toLocaleString()}</small></p>
                <p>{comment.text}</p>
                <p><strong>Sentimiento:</strong> {comment.sentiment}</p> {/* Mostrar el sentimiento del comentario */}
                {auth.currentUser?.uid === comment.userId && (
                  <>
                    <button onClick={() => setEditComment({ id: comment.id, text: comment.text })}>Editar</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>Eliminar</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios disponibles.</p>
      )}
    </div>
  );
};

export default CommentsSection;