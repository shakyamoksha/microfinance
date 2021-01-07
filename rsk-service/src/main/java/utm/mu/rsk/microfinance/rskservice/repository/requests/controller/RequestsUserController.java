package utm.mu.rsk.microfinance.rskservice.repository.requests.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utm.mu.rsk.microfinance.rskservice.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;
import utm.mu.rsk.microfinance.rskservice.repository.requests.service.RequestsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/request/")
public class RequestsUserController {
    Logger logger = LoggerFactory.getLogger(RequestsUserController.class);

    @Autowired
    RequestsService service;

    @Autowired
    RequestRepository repository;

    @Autowired
    CommonResponse responseService;

    @PostMapping(value = "initiate", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> initiateRequest(@RequestBody RequestEntity entity){
        logger.info("Creating new Request Record");

        RequestEntity requestEntity = new RequestEntity();
        requestEntity.setRequestStatus("CAPTURE");
        requestEntity.setAction("APPLIED");
        requestEntity.setCustomerName(entity.getCustomerName());
        requestEntity.setCreatedBy(entity.getCreatedBy());
        requestEntity.setCustomerNumber(entity.getCustomerNumber());
        requestEntity.setModifiedBy(entity.getModifiedBy());
        requestEntity.setProductID(entity.getProductID());
        repository.save(requestEntity);

        return responseService.preparedSuccessResponseWMessage("","Request initiated!");
    }

    @GetMapping(value = "getRequestsById/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> getRequestsById(@PathVariable int id) {

        Optional<RequestEntity> requestEntity = repository.findById(id);

        if(service.getRequestById(id)){
            return responseService.preparedSuccessResponseWMessage(requestEntity, "Get Requests By ID");
        } else {
            return responseService.prepareFailedResponse("Request does not exist");
        }
    }

    @GetMapping(value = "getRequestsByUser/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> getRequestsByUser(@PathVariable String userId) {
        List<RequestEntity> requestEntities = repository.findAllByCreatedBy(userId);

        if(!requestEntities.isEmpty()){
            return responseService.preparedSuccessResponseWMessage(requestEntities,"Requests retrieved successfully");
        } else {
            return responseService.prepareFailedResponse("No requests found for user");
        }
    }

    @GetMapping("getall")
    public ResponseEntity<List<RequestEntity>> getAllRequests() {
        List<RequestEntity> list = service.getAllRequests();
        return new ResponseEntity<List<RequestEntity>>(list, new HttpHeaders(), HttpStatus.OK);
    }

}
