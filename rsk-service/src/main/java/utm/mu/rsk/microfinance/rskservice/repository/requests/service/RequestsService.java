package utm.mu.rsk.microfinance.rskservice.repository.requests.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;

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

}
