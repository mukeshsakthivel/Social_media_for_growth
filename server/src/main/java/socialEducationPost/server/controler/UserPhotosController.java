package socialEducationPost.server.controler;

import java.nio.file.Files;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Path;
import socialEducationPost.server.model.Register;
import socialEducationPost.server.model.UserPhotos;
import socialEducationPost.server.repository.RegisterRepo;
import socialEducationPost.server.repository.UserPhotosRepo;
import socialEducationPost.server.service.RegisterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class UserPhotosController {

    @Autowired
    private UserPhotosRepo userPhotosRepo;

    @Autowired
    private RegisterRepo registerRepo;

    @PostMapping("/uploadFrontProfilePhoto")
    public ResponseEntity<String> uploadFrontProfilePhoto(@RequestParam("file") MultipartFile file, @RequestParam("userId") int userId) {
        return uploadPhoto(file, userId, UserPhotos.PhotoType.FRONT_PROFILE);
    }

    @PostMapping("/uploadBackProfilePhoto")
    public ResponseEntity<String> uploadBackProfilePhoto(@RequestParam("file") MultipartFile file, @RequestParam("userId") int userId) {
        return uploadPhoto(file, userId, UserPhotos.PhotoType.BACK_PROFILE);
    }

    @PostMapping("/uploadPostPhoto")
    public ResponseEntity<String> uploadPostPhoto(@RequestParam("file") MultipartFile file, @RequestParam("userId") int userId, @RequestParam(value = "description", required = false) String description) {
        return uploadPhoto(file, userId, UserPhotos.PhotoType.POST, description);
    }

    private ResponseEntity<String> uploadPhoto(MultipartFile file, int userId, UserPhotos.PhotoType photoType) {
        return uploadPhoto(file, userId, photoType, null);
    }

    private ResponseEntity<String> uploadPhoto(MultipartFile file, int userId, UserPhotos.PhotoType photoType, String description) {
        try {
            // Save the file data as BLOB
            UserPhotos userPhoto = new UserPhotos();
            Register registerID = new Register();
            registerID.setId(userId);
            userPhoto.setUserId(registerID);
            userPhoto.setPhotoType(photoType);
            userPhoto.setPhotoData(file.getBytes());
            if (description != null) {
                userPhoto.setPostDescription(description);
            }
            userPhotosRepo.save(userPhoto);

            return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload file.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


	
	@PostMapping("/EditUserData")
	public ResponseEntity<String> updateuserData(@RequestParam("userID") int id,@RequestParam (value="updateName" , required=false)  String updateName,@RequestParam(value="updateDec" , required=false) String updateDec)
	{
		System.out.println("datakasd");
		Register userdata=registerRepo.findById(id).orElse(null);
		if(userdata==null) {
			   return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
		}
		else {
			userdata.setUsername(updateName);
			userdata.setUserCareerRole(updateDec);
			registerRepo.save(userdata);
			return new ResponseEntity<>("Update Successful",HttpStatus.OK);
			
		}
	}

}
