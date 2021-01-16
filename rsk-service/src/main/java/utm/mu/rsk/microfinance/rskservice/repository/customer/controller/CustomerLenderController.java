package utm.mu.rsk.microfinance.rskservice.repository.customer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.repository.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.customer.service.CustomerService;
import utm.mu.rsk.microfinance.rskservice.repository.user.model.UserModel;

import java.io.IOException;
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

    @PostMapping(value = "update", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {"multipart/form-data"})
    public ResponseEntity<ResponseModel> updateCustomer(
            @RequestParam("customer") String stringEntity,
            @RequestParam(value = "poa", required = false) MultipartFile poa,
            @RequestParam(value = "poi", required = false) MultipartFile poi) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        UserModel userModel  = mapper.readValue(stringEntity, UserModel.class);
        if(this.service.updateCustomer(userModel, poa, poi)){
            return this.response.preparedSuccessResponseWMessage("", "Updated Successfully!");
        } else {
            return this.response.prepareFailedResponse("An error occurred!");
        }
    }

}
