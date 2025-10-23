import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore configuration
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

const Club = () => {
    const [clubIntro, setClubIntro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubContent = async () => {
            const docRef = doc(db, 'artifacts/{appId}/public/data/page_content', 'club_intro');
            onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    setClubIntro(doc.data().content);
                    setLoading(false);
                } else {
                    console.log('No such document!');
                    setLoading(false);
                }
            });
        };

        fetchClubContent();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-100">Gourmet Club</h1>
            <p className="text-gray-300 mt-4">{clubIntro}</p>
            <div className="mt-6">
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
                    RSVP/Register
                </button>
            </div>
        </div>
    );
};

export default Club;