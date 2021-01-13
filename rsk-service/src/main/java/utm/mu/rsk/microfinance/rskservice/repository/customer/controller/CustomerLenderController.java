package utm.mu.rsk.microfinance.rskservice.repository.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.repository.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.customer.service.CustomerService;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;
import utm.mu.rsk.microfinance.rskservice.user.model.UserModel;

import java.util.List;

@RestController
@RequestMapping("admin/customer/")
public class CustomerLenderController {

    @Autowired
    CustomerService service;

    @Autowired
    CommonResponse response;

    @GetMapping("getall/{role}")
    public ResponseEntity<List<UserModel>> getAllCustomers(@PathVariable String role) {
        List<UserModel> list = service.getAllCustomers(role);
        return new ResponseEntity<List<UserModel>>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(value = "freeze", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> setFreezeCustomer(@RequestBody UserModel userModel) {
        if(service.freezeCustomer(userModel.getUserName())){
            return response.preparedSuccessResponseWMessage("", "Freeze status changed successfully");
        } else {
            return response.prepareFailedResponse("An error occurred");
        }
    }

}
