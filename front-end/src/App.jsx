import { useEffect, useState } from 'react';
import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';
import './App.css';

const App = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const response = await fetch('http://localhost:5000/api/comments');
        const data = await response.json();
        setComments(data);
    };

    const getReplies = (parentId) => {
        return comments.filter(comment => comment.parentId === parentId);
    };

    return (
        <div className="app-container">
            <h1>Comment System</h1>
            <CommentForm onCommentAdded={fetchComments} />
            {comments.filter(comment => !comment.parentId).map(comment => (
                <Comment key={comment._id} comment={comment} replies={getReplies(comment._id)} onReplyAdded={fetchComments} />
            ))}
        </div>
    );
};

export default App;
