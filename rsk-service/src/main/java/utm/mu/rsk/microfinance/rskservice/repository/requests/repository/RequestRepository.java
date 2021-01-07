package utm.mu.rsk.microfinance.rskservice.repository.requests.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity, Integer> {

    Optional<RequestEntity> findAllByCustomerNumber(Integer customerNumber);

    List<RequestEntity> findAllByAccountOfficerName = null;
    List<RequestEntity> findAllByAccountOfficerName(String accountOfficerName);

    Optional<RequestEntity> findById(Integer id);

    List<RequestEntity> findAllByCreatedBy(String userId);
}
