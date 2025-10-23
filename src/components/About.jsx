import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
// Import the v9 functions: doc, collection, onSnapshot, query, orderBy
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import TeamCard from './TeamCard';

const About = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // --- 1. Fetch 'About Us' content ---
    const pageContentRef = doc(db, 'artifacts/london-gourmet/public/data/page_content/about_us_main');
    const unsubscribePage = onSnapshot(pageContentRef, (docSnap) => {
      if (docSnap.exists()) {
        setAboutContent(docSnap.data().content);
      } else {
        setAboutContent("About content coming soon.");
      }
    }, (error) => {
      console.error("Error fetching about content:", error);
    });

    // --- 2. Fetch 'Team' members (THIS IS THE FIX) ---
    // Use the collection() function from the v9 SDK
    const teamCollectionRef = collection(db, 'artifacts/london-gourmet/public/data/team');
    // Create a query to sort the team members by the 'sortOrder' field
    const teamQuery = query(teamCollectionRef, orderBy('sortOrder'));

    const unsubscribeTeam = onSnapshot(teamQuery, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push({ id: doc.id, ...doc.data() });
      });
      setTeamMembers(members);
    }, (error) => {
      console.error("Error fetching team members:", error);
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribePage();
      unsubscribeTeam();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Our Story</h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
          About London Gourmet
        </p>
      </div>

      <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-xl">
        <p className="text-gray-300 whitespace-pre-wrap">
          {aboutContent || 'Loading...'}
        </p>
      </div>

      <div className="mt-20">
        <h3 className="text-3xl font-extrabold text-white text-center">Meet the Team</h3>
        {teamMembers.length > 0 ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 col-span-full mt-8">Loading team profiles...</p>
        )}
      </div>
    </div>
  );
};

export default About;