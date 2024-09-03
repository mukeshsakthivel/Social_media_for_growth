package socialEducationPost.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import socialEducationPost.server.controler.AllUserDetailsController;
import socialEducationPost.server.model.Login;
import socialEducationPost.server.model.Register;
import socialEducationPost.server.repository.RegisterRepo;

@Service
public class RegisterService {
	
	@Autowired
	RegisterRepo registerRepo;
	
	@Autowired
	private AllUserDetailsController alluserDetailController;
	
	public int FullUserID;
	
	public ResponseEntity<Object> validateLogin(Login login){
		
		Register foundData=registerRepo.findByUsername(login.getUsername());
		
		if(foundData==null) {
			return new ResponseEntity<Object>("Username not found",HttpStatus.UNAUTHORIZED);
		}
		else if(!foundData.getPassword().equals(login.getPassword())) {
			return new ResponseEntity<Object>("Incorrect password",HttpStatus.UNAUTHORIZED);
		}
		
		FullUserID=foundData.getId();
		System .out.print(FullUserID);
		return new ResponseEntity<Object>(alluserDetailController.allData(FullUserID),HttpStatus.OK);
		
	}
//	

	public ResponseEntity<Object> validationservice(Register data) {
		
		if(registerRepo.existsByUsername(data.getUsername())) {
			throw new IllegalArgumentException("Username already exists");
		}
		
		if(registerRepo.existsByEmail(data.getEmail())) {
			throw new IllegalArgumentException("Email already exists");
		}
		Register saveData=registerRepo.save(data);
		
		FullUserID=saveData.getId();
		System .out.print(FullUserID);
	    return	new ResponseEntity<>(alluserDetailController.allData(FullUserID),HttpStatus.OK);
		
	}
	
	
	

}
