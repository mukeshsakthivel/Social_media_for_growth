package socialEducationPost.server.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserRelationship;
import socialEducationPost.server.model.UserRelationship.RelationshipType;
import socialEducationPost.server.repository.RegisterRepo;
import socialEducationPost.server.repository.UserRelationshipRepo;

@RestController
public class UserRelationshipController {

    @Autowired
    private UserRelationshipRepo userRelationshipRepo;

    @Autowired
    private RegisterRepo registerRepo;

    @PostMapping("/follow")
    public ResponseEntity<String> followUser(@RequestParam("userId") int userId, @RequestParam("relatedUserId") int relatedUserId) {
        Register user = registerRepo.findById(userId).orElse(null);
        Register relatedUser = registerRepo.findById(relatedUserId).orElse(null);

        if (user == null || relatedUser == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        boolean isAlreadyFollowing = userRelationshipRepo.existsByUserIdAndRelatedUserIdAndRelationshipType(user, relatedUser, RelationshipType.FOLLOWING);

        if (isAlreadyFollowing) {
            return new ResponseEntity<>("Already following this user.", HttpStatus.BAD_REQUEST);
        }

        // Create the "FOLLOWING" relationship
        UserRelationship followingRelationship = new UserRelationship();
        followingRelationship.setUserId(user);
        followingRelationship.setRelatedUserId(relatedUser);
        followingRelationship.setRelationshipType(RelationshipType.FOLLOWING);
        userRelationshipRepo.save(followingRelationship);

        // Optionally, you can create the reciprocal "FOLLOWER" relationship
        UserRelationship followerRelationship = new UserRelationship();
        followerRelationship.setUserId(relatedUser);
        followerRelationship.setRelatedUserId(user);
        followerRelationship.setRelationshipType(RelationshipType.FOLLOWER);
        userRelationshipRepo.save(followerRelationship);

        return new ResponseEntity<>("Followed successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/unfollow")
    public ResponseEntity<String> unfollowUser(@RequestParam("userId") int userId, @RequestParam("relatedUserId") int relatedUserId) {
        Register user = registerRepo.findById(userId).orElse(null);
        Register relatedUser = registerRepo.findById(relatedUserId).orElse(null);

        if (user == null || relatedUser == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        UserRelationship followingRelationship = userRelationshipRepo.findByUserIdAndRelatedUserIdAndRelationshipType(user, relatedUser, RelationshipType.FOLLOWING);
        UserRelationship followerRelationship = userRelationshipRepo.findByUserIdAndRelatedUserIdAndRelationshipType(relatedUser, user, RelationshipType.FOLLOWER);

        if (followingRelationship == null) {
            return new ResponseEntity<>("You are not following this user.", HttpStatus.BAD_REQUEST);
        }

        // Remove the "FOLLOWING" relationship
        userRelationshipRepo.delete(followingRelationship);

        // Remove the reciprocal "FOLLOWER" relationship
        if (followerRelationship != null) {
            userRelationshipRepo.delete(followerRelationship);
        }

        return new ResponseEntity<>("Unfollowed successfully!", HttpStatus.OK);
    }
}
