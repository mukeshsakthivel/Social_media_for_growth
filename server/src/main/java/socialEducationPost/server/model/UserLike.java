package socialEducationPost.server.model;


import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_like")
public class UserLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_like")
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Register user;

    @ManyToOne
    @JoinColumn(name = "photo_id", nullable = false)
    private UserPhotos photo;

    @Column(name = "liked", nullable = false)
    private boolean liked; // true for like, false for dislike

    public int getLikeId() {
        return likeId;
    }

    public void setLikeId(int likeId) {
        this.likeId = likeId;
    }

    public Register getUser() {
        return user;
    }

    public void setUser(Register user) {
        this.user = user;
    }

    public UserPhotos getPhoto() {
        return photo;
    }

    public void setPhoto(UserPhotos photo) {
        this.photo = photo;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}
