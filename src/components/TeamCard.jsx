import React from 'react';

const TeamCard = ({ member }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
            <img src={member.imageUrl || 'https://placehold.co/200x200'} alt={member.name} className="rounded-full w-32 h-32 mx-auto" />
            <h3 className="text-amber-400 text-xl text-center mt-2">{member.name}</h3>
            <p className="text-green-600 text-center">{member.role}</p>
            <p className="text-gray-100 text-center mt-2">{member.bio}</p>
        </div>
    );
};

export default TeamCard;