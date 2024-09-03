package socialEducationPost.server.controler;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import socialEducationPost.server.model.AllPostDetailes;
import socialEducationPost.server.model.AllUserDetails;
import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserPhotos;
import socialEducationPost.server.model.UserRelationship;
import socialEducationPost.server.repository.RegisterRepo;
import socialEducationPost.server.repository.UserPhotosRepo;
import socialEducationPost.server.repository.UserRelationshipRepo;

@RestController
public class AllUserDetailsController {

	
	@Autowired
    private RegisterRepo registerRepo;

    @Autowired
    private UserPhotosRepo userPhotosRepo;

    @Autowired
    private UserRelationshipRepo userRelationshipRepo;
    
    public AllUserDetails allData(int id) {
    	
    	System.out.println("at all data 1");
    	
    	Register user=registerRepo.findById(id).orElse(null);
    	
    	UserPhotos frountProfilePhoto=userPhotosRepo.findByUserIdAndPhotoType(user,UserPhotos.PhotoType.FRONT_PROFILE);                    
     	UserPhotos backProfilePhoto=userPhotosRepo.findByUserIdAndPhotoType(user,UserPhotos.PhotoType.FRONT_PROFILE);
     	
     	List<UserPhotos> posts =userPhotosRepo.findByPhotoType(UserPhotos.PhotoType.POST);
    
     	int followerCount=userRelationshipRepo.countByRelatedUserIdAndRelationshipType(user,UserRelationship.RelationshipType.FOLLOWER);
     	int followingCount=userRelationshipRepo.countByRelatedUserIdAndRelationshipType(user,UserRelationship.RelationshipType.FOLLOWING);
     	
     	AllUserDetails responce=new AllUserDetails();
     	responce.setId(user.getId());
     	responce.setUsername(user.getUsername());
     	responce.setUserCareerRole(user.getUserCareerRole());
     	
     	System.out.println("at all data 2");
     	if(frountProfilePhoto!=null)
     	{
     		responce.setFrontProfileId(frountProfilePhoto.getPhotoId());
     		responce.setFrontProfile(Base64.getEncoder().encodeToString(frountProfilePhoto.getPhotoData()));
     	}
     	if(backProfilePhoto!=null)
     	{
     		responce.setBackProfileId(backProfilePhoto.getPhotoId());
     		responce.setBackProfile(Base64.getEncoder().encodeToString(backProfilePhoto.getPhotoData()));
     	}
     	System.out.println("at all data 3");
     	List<AllPostDetailes> postDetails=new ArrayList<>();
     	System.out.println("check 0");
     	for(UserPhotos post:posts)
     	{
     		System.out.println("check 1");
     		AllPostDetailes postData=new  AllPostDetailes();
     		System.out.println("check 2");
     		postData.setPostId(post.getPhotoId());
     		System.out.println("check 3");
     		
     		if(post.getPhotoData()!=null)
     		{
     		  postData.setPhoto(Base64.getEncoder().encodeToString(post.getPhotoData()));
     		}
     		System.out.println("check 4");
     		postData.setPhotoDesc(post.getPostDescription());
     		System.out.println("check 5");
     		postData.setLikeCount(post.getLikeCount());
     		System.out.println("at all data 4");
    
     		Register postUser = registerRepo.findById(post.getUserId().getId()).orElse(null);
     		 if(postUser!=null) {
     			 postData.setPostedBy(postUser.getUsername());
     			 postData.setUserIdForPost(postUser.getId());
     		 }
     		 UserPhotos userProfilePhoto=userPhotosRepo.findByUserIdAndPhotoType(postUser, UserPhotos.PhotoType.FRONT_PROFILE);
     		System.out.println("at all data 5");
     		 if(userProfilePhoto!=null)
     		 {
     			 postData.setPostFrontProfile(Base64.getEncoder().encodeToString(userProfilePhoto.getPhotoData()));
     			 
     		 }
     		 postDetails.add(postData);
     	}
     	responce.setPosts(postDetails);
     	responce.setFollowingCount(followingCount);
     	responce.setFollowersCount(followerCount);
    	System.out.println("at all data 6");
    	return responce;
    }
}



























