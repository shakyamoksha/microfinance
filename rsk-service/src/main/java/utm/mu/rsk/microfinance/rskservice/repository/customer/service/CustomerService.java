package utm.mu.rsk.microfinance.rskservice.repository.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.customer.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository repository;

    public boolean banCustomer(String userName) {
        return true;
    }

    public boolean freezeCustomer(String userName) {
        return true;
    }

}
