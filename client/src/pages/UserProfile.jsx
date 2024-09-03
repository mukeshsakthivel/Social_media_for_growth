import React, { useContext } from "react";
import { userContext } from "../context/userContext";

const UserProfile = () => {
    const { user } = useContext(userContext);

    if (!user) {
        return <div>Loading...</div>; // Display this while user data is being fetched
    }

    return (
        <div>
            <h1>{user.username}'s Profile</h1>
            <p><strong>Career Role:</strong> {user.userCareerRole}</p>
            <p><strong>Follower Count:</strong> {user.followersCount}</p>
            <p><strong>Following Count:</strong> {user.followingCount}</p>

            <div>
                <h2>Profile Photos</h2>
                {user.frontProfile && (
                    <div>
                        <h3>Front Profile</h3>
                        <img src={`data:image/jpeg;base64,${user.frontProfile}`} alt="Front Profile" />
                    </div>
                )}
                {user.backProfile && (
                    <div>
                        <h3>Back Profile</h3>
                        <img src={`data:image/jpeg;base64,${user.backProfile}`} alt="Back Profile" />
                    </div>
                )}
            </div>

            <div>
                <h2>Posts</h2>
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map(post => (
                        <div key={post.postId}>
                            <h3>Posted by: {post.postedBy}</h3>
                            <p><strong>Description:</strong> {post.photoDesc}</p>
                            {post.photo && (
                                <img src={`data:image/jpeg;base64,${post.photo}`} alt="Post" />
                            )}
                            <p><strong>Likes:</strong> {post.likeCount}</p>
                            {post.postFrontProfile && (
                                <img src={`data:image/jpeg;base64,${post.postFrontProfile}`} alt="Post Front Profile" />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
