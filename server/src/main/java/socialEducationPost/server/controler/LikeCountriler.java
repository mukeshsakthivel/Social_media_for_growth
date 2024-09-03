package socialEducationPost.server.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserLike;
import socialEducationPost.server.model.UserPhotos;
import socialEducationPost.server.repository.LikesRepo;
import socialEducationPost.server.repository.RegisterRepo;
import socialEducationPost.server.repository.UserPhotosRepo;

@RestController
public class LikeCountriler {

	@Autowired
	private LikesRepo likerepo;
	@Autowired
	private UserPhotosRepo userPhotosRepo;
	@Autowired
	private RegisterRepo registerRepo;
	
	
	@PostMapping("/likePost")
	public int likePhoto(@RequestParam ("photoId") int photoId,@RequestParam("userId") int userId)
	{
		
		  UserPhotos userPhoto = userPhotosRepo.findById(photoId).orElse(null);
	      Register user = registerRepo.findById(userId).orElse(null);
	      
	      
		boolean hasliked=likerepo.existsByUserAndPhoto(user,userPhoto );
		
		if(hasliked) {
			return userPhoto.getLikeCount();
		}
		UserLike userLike=new UserLike();
		userLike.setLikeId(userId);
		userLike.setUser(user);
	    userLike.setPhoto(userPhoto);
	    userLike.setLiked(true);
	    likerepo.save(userLike);
	    
	    userPhoto.setLikeCount(userPhoto.getLikeCount()+1);
	    userPhotosRepo.save(userPhoto);
	    
	    return userPhoto.getLikeCount();
		
	}
	
	 @PostMapping("/dislikePhoto")
	    public int dislikePhoto(@RequestParam("photoId") int photoId, @RequestParam("userId") int userId) {
	        UserPhotos userPhoto = userPhotosRepo.findById(photoId).orElse(null);
	        Register user = registerRepo.findById(userId).orElse(null);

	       
	        UserLike userLike = likerepo.findByUserAndPhoto(user, userPhoto);
	
	       
	       likerepo.delete(userLike);

	        
	        userPhoto.setLikeCount(userPhoto.getLikeCount() - 1);
	        userPhotosRepo.save(userPhoto);

	        return userPhoto.getLikeCount();
	        
	    }
}
