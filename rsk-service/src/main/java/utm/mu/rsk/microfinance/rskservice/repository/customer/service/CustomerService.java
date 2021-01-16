package utm.mu.rsk.microfinance.rskservice.repository.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utm.mu.rsk.microfinance.rskservice.repository.customer.repository.CustomerRepository;
import utm.mu.rsk.microfinance.rskservice.repository.requests.service.RequestsService;
import utm.mu.rsk.microfinance.rskservice.repository.user.model.UserModel;

import java.io.IOException;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository repository;

    @Autowired
    RequestsService requestsService;

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

    public boolean updateCustomer(UserModel userModel, MultipartFile poa, MultipartFile poi) throws IOException {
        boolean customerExists = false;
        UserModel model = repository.findByUserName(userModel.getUserName());
        if(model != null){
            customerExists = true;
            userModel.setPoa(requestsService.convertToBase64(poa));
            userModel.setPoaName(poa.getOriginalFilename());
            userModel.setPoi(requestsService.convertToBase64(poi));
            userModel.setPoiName(poi.getOriginalFilename());
            repository.save(userModel);
        }
        return customerExists;
    }

}
