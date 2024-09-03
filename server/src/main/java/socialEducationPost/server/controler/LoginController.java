package socialEducationPost.server.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import socialEducationPost.server.model.Login;
import socialEducationPost.server.model.Register;
import socialEducationPost.server.repository.RegisterRepo;
import socialEducationPost.server.service.RegisterService;

@RestController
@CrossOrigin(origins ="http://localhost:5173")
public class LoginController {
	
	
	@Autowired
	private RegisterService registerService;
	
	@PostMapping("/")
	public ResponseEntity<Object> loginValidate(@RequestBody Login login){
		
		//return new ResponseEntity<String>(registerService.validateLogin(login),)
		
		return registerService.validateLogin(login);
	}
	
	@PostMapping("/registers")
	public ResponseEntity<Object> registerValidate(@Valid @RequestBody Register register,BindingResult bindingresult){
		
		if(bindingresult.hasErrors()) {
			return new ResponseEntity<>(bindingresult.getFieldError().getDefaultMessage(),HttpStatus.BAD_REQUEST);
			// return new ResponseEntity<>(bindingresult.getAllErrors(), HttpStatus.BAD_REQUEST);
		}
		
		try {
			
			 return registerService.validationservice(register);
			 //return new ResponseEntity<>("Let's get started",HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		
	}
	
	
}
