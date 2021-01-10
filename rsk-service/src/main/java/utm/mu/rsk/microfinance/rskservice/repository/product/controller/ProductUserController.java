package utm.mu.rsk.microfinance.rskservice.repository.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.repository.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;
import utm.mu.rsk.microfinance.rskservice.repository.product.repository.ProductRepository;
import utm.mu.rsk.microfinance.rskservice.repository.product.service.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/product/")
public class ProductUserController {

    @Autowired
    ProductService service;

    @Autowired
    ProductRepository repository;

    @Autowired
    CommonResponse responseService;

    @GetMapping("getall")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        List<ProductEntity> list = service.getAllProducts();
        return new ResponseEntity<List<ProductEntity>>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping(value= "getProductById/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> getProductById(@PathVariable int id) {

        Optional<ProductEntity> productEntity = repository.findById(id);

        if(service.getProductById(id)){
            return responseService.preparedSuccessResponseWMessage(productEntity, "Product retrieved successfully!");
        } else {
            return responseService.prepareFailedResponse("Request does not exist");
        }
    }

}
