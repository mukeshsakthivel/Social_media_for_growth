package socialEducationPost.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "user_relationships")
public class UserRelationship {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "relationships_id")
	    private int relationshipsId;

	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    private Register userId;

	    @ManyToOne
	    @JoinColumn(name = "related_user_id", nullable = false)
	    private Register relatedUserId;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "relationship_type", nullable = false)
	    private RelationshipType relationshipType;

	    public enum RelationshipType {
	        FOLLOWING,
	        FOLLOWER
	    }


		public int getRelationshipsId() {
			return relationshipsId;
		}
		public void setRelationshipsId(int relationshipsId) {
			this.relationshipsId = relationshipsId;
		}


		public Register getUserId() {
			return userId;
		}
		public void setUserId(Register userId) {
			this.userId = userId;
		}


		public Register getRelatedUserId() {
			return relatedUserId;
		}
		public void setRelatedUserId(Register relatedUserId) {
			this.relatedUserId = relatedUserId;
		}


		public RelationshipType getRelationshipType() {
			return relationshipType;
		}
		public void setRelationshipType(RelationshipType relationshipType) {
			this.relationshipType = relationshipType;
		}
	  

}
