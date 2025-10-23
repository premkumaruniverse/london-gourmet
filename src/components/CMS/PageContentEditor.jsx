import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const PageContentEditor = () => {
    const [content, setContent] = useState({
        about_us_main: '',
        catering_main: '',
        club_intro: '',
        recipes_intro: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const docRef = doc(db, 'artifacts/{appId}/public/data/page_content', 'global');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContent(docSnap.data());
                } else {
                    setError('No content found');
                }
            } catch (err) {
                setError('Error fetching content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent((prevContent) => ({
            ...prevContent,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'artifacts/{appId}/public/data/page_content', 'global');
            await updateDoc(docRef, content);
            alert('Content updated successfully');
        } catch (err) {
            setError('Error updating content');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Page Content</h1>
            <div className="mb-4">
                <label className="block mb-2">About Us</label>
                <textarea
                    name="about_us_main"
                    value={content.about_us_main}
                    onChange={handleChange}
                    className="w-full h-32 p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Catering</label>
                <textarea
                    name="catering_main"
                    value={content.catering_main}
                    onChange={handleChange}
                    className="w-full h-32 p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Gourmet Club</label>
                <textarea
                    name="club_intro"
                    value={content.club_intro}
                    onChange={handleChange}
                    className="w-full h-32 p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Recipes</label>
                <textarea
                    name="recipes_intro"
                    value={content.recipes_intro}
                    onChange={handleChange}
                    className="w-full h-32 p-2 border rounded"
                />
            </div>
            <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded"
            >
                Save Changes
            </button>
        </div>
    );
};

export default PageContentEditor;