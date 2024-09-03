package socialEducationPost.server.model;

import java.util.List;

public class AllUserDetails {
	
	   private int id;
	    private String username;
	    private String userCareerRole;
	    private String frontProfile;
	    private int frontProfileId;
	    private String backProfile;
	    private int backProfileId;
	    private List<AllPostDetailes> posts;
	    private int followersCount;
	    private int followingCount;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getUserCareerRole() {
			return userCareerRole;
		}
		public void setUserCareerRole(String userCareerRole) {
			this.userCareerRole = userCareerRole;
		}
		public String getFrontProfile() {
			return frontProfile;
		}
		public void setFrontProfile(String frontProfile) {
			this.frontProfile = frontProfile;
		}
		public int getFrontProfileId() {
			return frontProfileId;
		}
		public void setFrontProfileId(int frontProfileId) {
			this.frontProfileId = frontProfileId;
		}
		public String getBackProfile() {
			return backProfile;
		}
		public void setBackProfile(String backProfile) {
			this.backProfile = backProfile;
		}
		public int getBackProfileId() {
			return backProfileId;
		}
		public void setBackProfileId(int backProfileId) {
			this.backProfileId = backProfileId;
		}
		public List<AllPostDetailes> getPosts() {
			return posts;
		}
		public void setPosts(List<AllPostDetailes> posts) {
			this.posts = posts;
		}
		public int getFollowersCount() {
			return followersCount;
		}
		public void setFollowersCount(int followersCount) {
			this.followersCount = followersCount;
		}
		public int getFollowingCount() {
			return followingCount;
		}
		public void setFollowingCount(int followingCount) {
			this.followingCount = followingCount;
		}
	

}
