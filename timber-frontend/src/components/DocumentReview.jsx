import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";


function DocumentReview() {
  const { user } = useContext(AuthContext);
  const { docId } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    // Fetch the document details (including comments)
    const fetchDocument = async () => {
      try {
        const res = await fetch(`/api/compliance/documents/${docId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'x-user-id': user.id,
            'x-user-role': user.role
          }
        });
        if (res.ok) {
          const data = await res.json();
          setDocument(data);
        } else {
          // If not allowed or not found, handle accordingly (redirect or message)
          navigate('/documents');
        }
      } catch (err) {
        console.error('Failed to fetch document details', err);
      }
    };
    if (user && docId) fetchDocument();
  }, [user, docId, navigate]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch(`/api/compliance/documents/${docId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'x-user-id': user.id,
          'x-user-role': user.role
        },
        body: JSON.stringify({ text: newComment })
      });
      if (res.ok) {
        const comment = await res.json();
        setDocument(prev => ({
          ...prev, 
          comments: [...prev.comments, comment]
        }));
        setNewComment('');
        // Optionally update status to 'Under Review' if comment was added
        setDocument(prev => prev ? { ...prev, status: prev.status === 'Submitted' ? 'Under Review' : prev.status } : prev);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditText(comment.text);
  };

  const saveEdit = async (commentId) => {
    try {
      const res = await fetch(`/api/compliance/documents/${docId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'x-user-id': user.id,
          'x-user-role': user.role
        },
        body: JSON.stringify({ text: editText })
      });
      if (res.ok) {
        // Update comment in local state
        setDocument(prev => {
          if (!prev) return prev;
          const updatedComments = prev.comments.map(c => 
            c.commentId === commentId ? { ...c, text: editText } : c
          );
          return { ...prev, comments: updatedComments };
        });
        setEditingCommentId(null);
        setEditText('');
      }
    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await fetch(`/api/compliance/documents/${docId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'x-user-id': user.id,
          'x-user-role': user.role
        }
      });
      if (res.ok) {
        setDocument(prev => {
          if (!prev) return prev;
          const updatedComments = prev.comments.filter(c => c.commentId !== commentId);
          return { ...prev, comments: updatedComments };
        });
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const res = await fetch(`/api/compliance/documents/${docId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'x-user-id': user.id,
          'x-user-role': user.role
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setDocument(prev => prev ? { ...prev, status: newStatus } : prev);
        // If approved or rejected, navigate back to list after a short delay
        if (newStatus === 'Approved' || newStatus === 'Rejected') {
          alert(`Document ${newStatus}`);  // feedback to user
          navigate('/documents');
        }
      }
    } catch (err) {
      console.error(`Error updating status to ${newStatus}:`, err);
    }
  };

  if (!document) {
    return <div>Loading document...</div>;
  }

  return (
    <div>
      <h2>Review Document: {document.projectName}</h2>
      <p><strong>Document Type:</strong> {document.documentType}</p>
      <p><strong>Expiry Date:</strong> {document.expiryDate}</p>
      <p><strong>Status:</strong> {document.status}</p>
      <p><strong>FSC %:</strong> {document.fscPercent}</p>
      <p><strong>Green Star Rating:</strong> {document.greenStarRating}</p>

      {/* Action buttons for status changes */}
      {document.status !== 'Approved' && document.status !== 'Rejected' && (
        <div style={{ margin: '10px 0' }}>
          {document.status !== 'Approved' && (
            <button onClick={() => updateStatus('Approved')}>Approve</button>
          )}
          {document.status !== 'Rejected' && (
            <button onClick={() => updateStatus('Rejected')}>Reject</button>
          )}
        </div>
      )}

      {/* Comment section */}
      <h3>Review Comments</h3>
      {/* New comment input */}
      <div>
        <textarea 
          rows="3" 
          cols="50" 
          placeholder="Leave a comment or request changes..." 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
        />
        <br/>
        <button onClick={addComment}>Add Comment</button>
      </div>
      {/* Comments list */}
      {document.comments && document.comments.length > 0 ? (
        <ul>
          {document.comments.map(comment => (
            <li key={comment.commentId}>
              <p>
                <strong>{comment.author === user.id ? "You" : "Officer"}:</strong> {comment.commentId === editingCommentId 
                  ? (
                      // Edit mode for this comment
                      <>
                        <input 
                          type="text" 
                          value={editText} 
                          onChange={(e) => setEditText(e.target.value)} 
                        />
                        <button onClick={() => saveEdit(comment.commentId)}>Save</button>
                        <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                      </>
                    ) 
                  : comment.text
                }
              </p>
              <small>{new Date(comment.date).toLocaleString()}</small>
              {/* Edit/Delete actions for comment author (or admin) */}
              { (comment.author === user.id || user.role === 'Admin') && comment.commentId !== editingCommentId && (
                <div>
                  <button onClick={() => startEditing(comment)}>Edit</button>
                  <button onClick={() => deleteComment(comment.commentId)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default DocumentReview;