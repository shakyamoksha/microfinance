package utm.mu.rsk.microfinance.rskservice.repository.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.customer.repository.CustomerRepository;
import utm.mu.rsk.microfinance.rskservice.user.model.UserModel;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository repository;

    public boolean freezeCustomer(String userName) {
        UserModel userModel = repository.findByUserName(userName);
        if(userModel != null){
            if(userModel.isActive()) { userModel.setActive(false); } else { userModel.setActive(true); }
            repository.save(userModel);
            return true;
        } else {
            return false;
        }
    }

    public List<UserModel> getAllCustomers(String roles) {
        return repository.findAllByRoles(roles);
    }
}
