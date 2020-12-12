package utm.mu.rsk.microfinance.rskservice.repository.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;
import utm.mu.rsk.microfinance.rskservice.repository.product.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository repository;

    public boolean createProduct(ProductEntity entity) {
        repository.save(entity);
        return false;
//        boolean exists = false;
//        ProductEntity newEntity = new ProductEntity();
//        Optional<ProductEntity> productRequest;
//        productRequest = repository.findAllByTitle(entity.getTitle());
//        if(productRequest.isPresent()){
//            exists = true;
//        } else {
//        }
    }

    public boolean updateProduct(ProductEntity entity, int id) {
        boolean productExists = false;
        Optional<ProductEntity> productRequest;
        productRequest = repository.findById(id);
        if(productRequest.isPresent()) {
            productExists = true;
            repository.save(entity);
        }
        return  productExists;
    }

    public boolean deleteProduct(int id) {
        Optional<ProductEntity> product = repository.findAllById(id);

        if(product.isPresent()){
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public List<ProductEntity> getAllProducts() {
        return repository.findAll();
    }





}
