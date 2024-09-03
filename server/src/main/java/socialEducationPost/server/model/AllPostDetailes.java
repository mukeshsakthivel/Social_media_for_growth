package socialEducationPost.server.model;

public   class AllPostDetailes {
	
	private int postId;
    private String photo;
    private String photoDesc;
    private int likeCount;
    private String postedBy;
    private int userIdForPost;
    private String postFrontProfile;
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public int getLikeCount() {
		return likeCount;
	}
	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}
	public int getPostId() {
		return postId;
	}
	public void setPostId(int postId) {
		this.postId = postId;
	}
	public String getPhotoDesc() {
		return photoDesc;
	}
	public void setPhotoDesc(String photoDesc) {
		this.photoDesc = photoDesc;
	}
	public String getPostedBy() {
		return postedBy;
	}
	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}
	public int getUserIdForPost() {
		return userIdForPost;
	}
	public void setUserIdForPost(int userIdForPost) {
		this.userIdForPost = userIdForPost;
	}
	public String getPostFrontProfile() {
		return postFrontProfile;
	}
	public void setPostFrontProfile(String postFrontProfile) {
		this.postFrontProfile = postFrontProfile;
	}

	
	

}
