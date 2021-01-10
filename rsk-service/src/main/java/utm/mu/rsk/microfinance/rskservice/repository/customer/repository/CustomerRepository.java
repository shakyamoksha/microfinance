package utm.mu.rsk.microfinance.rskservice.repository.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utm.mu.rsk.microfinance.rskservice.repository.customer.entity.CustomerEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer> {

    List<CustomerEntity> findAll();

    Optional<CustomerEntity> findByUserName(String userName);

}
