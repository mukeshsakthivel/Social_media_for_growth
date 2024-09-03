package socialEducationPost.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserRelationship;
import socialEducationPost.server.model.UserRelationship.RelationshipType;

public interface UserRelationshipRepo extends JpaRepository<UserRelationship, Integer> {
    boolean existsByUserIdAndRelatedUserIdAndRelationshipType(Register user, Register relatedUser, RelationshipType relationshipType);
    UserRelationship findByUserIdAndRelatedUserIdAndRelationshipType(Register user, Register relatedUser, RelationshipType relationshipType);


    // Count followers for a user
    int countByRelatedUserIdAndRelationshipType(Register user, UserRelationship.RelationshipType relationshipType);

    // Count following for a user
    int countByUserIdAndRelationshipType(Register user, UserRelationship.RelationshipType relationshipType);

}
