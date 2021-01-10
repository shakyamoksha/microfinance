package utm.mu.rsk.microfinance.rskservice.repository.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.repository.customer.service.CustomerService;

@RestController
@RequestMapping("admin/customer/")
public class CustomerLenderController {

    @Autowired
    CustomerService service;



}
