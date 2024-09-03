package socialEducationPost.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserPhotos;

public interface UserPhotosRepo extends JpaRepository<UserPhotos, Integer>{
	UserPhotos findByUserIdAndPhotoType(Register user,UserPhotos.PhotoType photoType);
	List<UserPhotos> findByPhotoType(UserPhotos.PhotoType photoType);
}

