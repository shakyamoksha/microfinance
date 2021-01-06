package utm.mu.rsk.microfinance.rskservice.repository.product.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import utm.mu.rsk.microfinance.rskservice.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;
import utm.mu.rsk.microfinance.rskservice.repository.product.repository.ProductRepository;
import utm.mu.rsk.microfinance.rskservice.repository.product.service.ProductService;

import java.util.List;


@RestController
@RequestMapping("admin/product/")
public class ProductLenderController {

    @Autowired
    ProductService service;

    @Autowired
    ProductRepository repository;

    @Autowired
    CommonResponse responseService;

    @PostMapping(value = "create", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> createProduct(@RequestBody ProductEntity entity) {

        if(service.createProduct(entity)){
            return responseService.prepareFailedResponse("Already exists");
        } else {
            return responseService.preparedSuccessResponseWMessage(entity,"Saved Successfully!");
        }

    }

    @PutMapping(value = "update", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> updateProduct(@RequestBody ProductEntity entity) {
        if(service.updateProduct(entity, entity.getId())){
            return responseService.preparedSuccessResponseWMessage(entity,"Updated successfully!");
        } else {
            return responseService.prepareFailedResponse("Unable to update");
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<ResponseModel> deleteProduct(@PathVariable("id") int id) {
        if(this.service.deleteProduct(id)){
            return responseService.preparedSuccessResponseWMessage("","Deleted successfully!");
        } else{
            return responseService.prepareFailedResponse("Unable to delete data");
        }
    }

    @GetMapping("getall")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        List<ProductEntity> list = service.getAllProducts();
        return new ResponseEntity<List<ProductEntity>>(list, new HttpHeaders(), HttpStatus.OK);
    }

}
