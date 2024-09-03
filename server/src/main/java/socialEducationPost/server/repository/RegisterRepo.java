package socialEducationPost.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import socialEducationPost.server.model.Register;

public interface RegisterRepo extends JpaRepository<Register,Integer>{
	
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	Register findByUsername(String username);
	


}
