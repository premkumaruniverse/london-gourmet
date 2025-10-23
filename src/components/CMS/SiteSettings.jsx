import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const SiteSettings = () => {
    const [siteConfig, setSiteConfig] = useState({
        homeBannerType: '',
        homeBannerUrl: '',
        googleReviewEmbed: '',
        contactEmail: '',
        contactPhone: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSiteConfig = async () => {
            try {
                const docRef = doc(db, 'artifacts/YOUR_APP_ID/public/data/site_config', 'global');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSiteConfig(docSnap.data());
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError('Error fetching site settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSiteConfig();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSiteConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'artifacts/YOUR_APP_ID/public/data/site_config', 'global');
            await updateDoc(docRef, siteConfig);
            alert('Site settings updated successfully!');
        } catch (err) {
            setError('Error updating site settings');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Site Settings</h2>
            <div className="mb-4">
                <label className="block mb-2">Home Banner Type</label>
                <input
                    type="text"
                    name="homeBannerType"
                    value={siteConfig.homeBannerType}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Home Banner URL</label>
                <input
                    type="text"
                    name="homeBannerUrl"
                    value={siteConfig.homeBannerUrl}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Google Review Embed</label>
                <textarea
                    name="googleReviewEmbed"
                    value={siteConfig.googleReviewEmbed}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Contact Email</label>
                <input
                    type="email"
                    name="contactEmail"
                    value={siteConfig.contactEmail}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Contact Phone</label>
                <input
                    type="text"
                    name="contactPhone"
                    value={siteConfig.contactPhone}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <button onClick={handleSave} className="bg-green-600 text-white rounded p-2">
                Save Settings
            </button>
        </div>
    );
};

export default SiteSettings;