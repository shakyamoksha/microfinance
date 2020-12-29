package utm.mu.rsk.microfinance.rskservice.repository.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utm.mu.rsk.microfinance.rskservice.repository.product.entity.ProductEntity;
import utm.mu.rsk.microfinance.rskservice.repository.product.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("api/v1/product/")
public class ProductPublicController {

    @Autowired
    ProductService service;

    @GetMapping("getall")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        List<ProductEntity> list = service.getAllProducts();
        return new ResponseEntity<List<ProductEntity>>(list, new HttpHeaders(), HttpStatus.OK);
    }
}
