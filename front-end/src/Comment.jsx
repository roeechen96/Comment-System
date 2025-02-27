import { useState } from 'react';
import CommentForm from './CommentForm.jsx';

const Comment = ({ comment, replies, onReplyAdded }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    return (
        <div className="comment-box" style={{ marginLeft: comment.parentId ? "40px" : "0px" }}>
            <h4>{comment.title}</h4>
            <p><strong>{comment.author}</strong> - {new Date(comment.date).toLocaleDateString()}</p>
            <p>{comment.content}</p>
            <button className="reply-btn" onClick={() => setShowReplyForm(!showReplyForm)}>
                {showReplyForm ? "Cancel" : "Reply"}
            </button>

            {showReplyForm && (
                <CommentForm parentId={comment._id} onCommentAdded={onReplyAdded} />
            )}

            {replies.length > 0 && (
                <div className="replies">
                    {replies.map(reply => (
                        <Comment key={reply._id} comment={reply} replies={[]} onReplyAdded={onReplyAdded} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
