package utm.mu.rsk.microfinance.rskservice.repository.requests.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RequestsService {

    @Autowired
    RequestRepository repository;

    public boolean getRequestById(int id) {
        boolean requestExists = false;
        if(repository.findById(id).isPresent()){
            requestExists = true;
        }
        return requestExists;
    }

    public List<RequestEntity> getAllRequests() {
        return repository.findAll();
    }

    public boolean updateRequest(RequestEntity entity, int id) {
        boolean requestExists = false;
        Optional<RequestEntity> requestEntity;
        requestEntity = repository.findById(id);
        if(requestEntity.isPresent()) {
            requestExists = true;
            repository.save(entity);
        }
        return requestExists;
    }

}
