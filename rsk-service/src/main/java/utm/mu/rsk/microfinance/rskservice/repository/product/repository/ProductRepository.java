package utm.mu.rsk.microfinance.rskservice.repository.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {

    Optional<ProductEntity> findAllById(int id);

    Optional<ProductEntity> findAllByTitle(String title);


}
