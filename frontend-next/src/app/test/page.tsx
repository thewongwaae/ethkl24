"use client";

import { useState, useEffect } from 'react';
import { ethereumService } from '@/utils/ethereumService';
import type { Group, VoteData, UserGroupInfo } from '@/utils/types';

export default function GroupView() {
    const [userInfo, setUserInfo] = useState<UserGroupInfo | null>(null);
    const [groupVotes, setGroupVotes] = useState<VoteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const info = await ethereumService.getUserGroupInfo();
            if (info.isInGroup) {
                const votes = await ethereumService.getVotes(info.groupId);
                setGroupVotes(votes);
            }
            setUserInfo(info);
        } catch (err) {
            setError('Error loading user data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCastVote = async (voteId: number) => {
        try {
            if (!userInfo) return;
            await ethereumService.castVote(voteId, userInfo.groupId);
            // Reload votes after casting
            const votes = await ethereumService.getVotes(userInfo.groupId);
            setGroupVotes(votes);
        } catch (err) {
            setError('Error casting vote');
            console.error(err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userInfo) return <div>No user data found</div>;

    return (
        <div>
            {userInfo.isInGroup ? (
                <>
                    <h1>{userInfo.title}</h1>
                    <p>{userInfo.description}</p>
                    {groupVotes && (
                        <div>
                            <h2>Voting Options</h2>
                            {groupVotes.optionTitles.map((title, index) => (
                                <div key={index}>
                                    <span>{title}: {groupVotes.voteCounts[index]} votes</span>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>You are not in a group</div>
            )}
        </div>
    );
}