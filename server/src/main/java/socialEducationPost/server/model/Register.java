package socialEducationPost.server.model;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Register")
public class Register {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private int id;

	@NotBlank(message = "Username is mandatory")
	@Size(max = 10, message = "Username must not be exceed 10 character")
	private String username;

	@NotBlank(message = "Password is mandatory")
	  @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$", 
             message = "Password must contain at least one lowercase letter, one uppercase letter, and one special character")
	private String password;

	
	@NotBlank(message = "Email is mandatory")
    @Email(message = "Please enter a valid email address")
	private String email;

	@Column(name = "user_career_role")
	private String userCareerRole;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserCareerRole() {
		return userCareerRole;
	}

	public void setUserCareerRole(String userCareerRole) {
		this.userCareerRole = userCareerRole;
	}

	

}
