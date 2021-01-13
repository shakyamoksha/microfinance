package utm.mu.rsk.microfinance.rskservice.repository.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utm.mu.rsk.microfinance.rskservice.user.model.UserModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<UserModel, Integer> {

    UserModel findByUserName(String userName);

    Optional<UserModel> findById(int id);

    List<UserModel> findAllByRoles(String roles);

}
