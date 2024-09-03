package socialEducationPost.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserLike;
import socialEducationPost.server.model.UserPhotos;

public interface LikesRepo extends JpaRepository<UserLike, Integer> {

    boolean existsByUserAndPhoto(Register user, UserPhotos photo);

 
    UserLike findByUserAndPhoto(Register user, UserPhotos photo);
}
