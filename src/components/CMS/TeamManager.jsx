import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Notification from './Notification';

const TeamManager = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', imageUrl: '', sortOrder: 0 });
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'team'), (snapshot) => {
            const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTeamMembers(members);
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const handleAddMember = async () => {
        try {
            await addDoc(collection(db, 'team'), newMember);
            setNotification({ message: 'Team member added successfully!', type: 'success' });
            setNewMember({ name: '', role: '', bio: '', imageUrl: '', sortOrder: 0 });
        } catch (error) {
            setNotification({ message: 'Error adding team member.', type: 'error' });
        }
    };

    const handleUpdateMember = async (id) => {
        try {
            await updateDoc(doc(db, 'team', id), newMember);
            setNotification({ message: 'Team member updated successfully!', type: 'success' });
            setNewMember({ name: '', role: '', bio: '', imageUrl: '', sortOrder: 0 });
        } catch (error) {
            setNotification({ message: 'Error updating team member.', type: 'error' });
        }
    };

    const handleDeleteMember = async (id) => {
        try {
            await deleteDoc(doc(db, 'team', id));
            setNotification({ message: 'Team member deleted successfully!', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Error deleting team member.', type: 'error' });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Team Manager</h2>
            <Notification message={notification.message} type={notification.type} />
            <div className="mb-4">
                <input type="text" name="name" value={newMember.name} onChange={handleInputChange} placeholder="Name" className="border p-2 mr-2" />
                <input type="text" name="role" value={newMember.role} onChange={handleInputChange} placeholder="Role" className="border p-2 mr-2" />
                <input type="text" name="bio" value={newMember.bio} onChange={handleInputChange} placeholder="Bio" className="border p-2 mr-2" />
                <input type="text" name="imageUrl" value={newMember.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="border p-2 mr-2" />
                <input type="number" name="sortOrder" value={newMember.sortOrder} onChange={handleInputChange} placeholder="Sort Order" className="border p-2 mr-2" />
                <button onClick={handleAddMember} className="bg-green-600 text-white p-2">Add Member</button>
            </div>
            <ul>
                {teamMembers.map(member => (
                    <li key={member.id} className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p>{member.role}</p>
                            <p>{member.bio}</p>
                        </div>
                        <div>
                            <button onClick={() => handleUpdateMember(member.id)} className="bg-blue-600 text-white p-1 mr-2">Edit</button>
                            <button onClick={() => handleDeleteMember(member.id)} className="bg-red-600 text-white p-1">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamManager;