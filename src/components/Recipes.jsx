import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore configuration
import { doc, onSnapshot } from 'firebase/firestore';

const Recipes = () => {
    const [introContent, setIntroContent] = useState('');
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const contentRef = doc(db, 'artifacts/london-gourmet/public/data/page_content/recipes_intro');

        const unsubscribe = onSnapshot(contentRef, (docSnap) => {
            if (docSnap.exists()) {
                setIntroContent(docSnap.data().content);
            } else {
                console.log("No such document for recipes intro!");
                setIntroContent("Recipes and blog content coming soon.");
            }
        }, (error) => {
            console.error("Error fetching recipes intro content:", error);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Recipes & Blog</h2>
                <p className="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Culinary Inspiration
                </p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
                    {introContent || 'Loading...'}
                </p>
            </div>

            {/* Placeholder for future blog posts grid */}
            <div className="mt-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Example of a placeholder card */}
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
                        <h3 className="text-xl font-bold text-amber-400">Blog Post Title</h3>
                        <p className="mt-4 text-gray-300">
                            A grid of recipe and blog post cards will appear here soon.
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
                        <h3 className="text-xl font-bold text-amber-400">Another Post</h3>
                        <p className="mt-4 text-gray-300">
                            Each card will link to a full recipe or article.
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
                        <h3 className="text-xl font-bold text-amber-400">More to Come</h3>
                        <p className="mt-4 text-gray-300">
                            Stay tuned for culinary tips and tricks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipes;