import { useState } from 'react';

const CommentForm = ({ parentId = null, onCommentAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = { title, author, content, parentId };

        const response = await fetch('http://localhost:5000/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        });

        if (response.ok) {
            setTitle('');
            setAuthor('');
            setContent('');
            onCommentAdded();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!parentId && <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />}
            <input type="text" placeholder="Your Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <textarea placeholder="Your Comment" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
