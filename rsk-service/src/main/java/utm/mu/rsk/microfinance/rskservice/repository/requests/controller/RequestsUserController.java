package utm.mu.rsk.microfinance.rskservice.repository.requests.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.repository.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;
import utm.mu.rsk.microfinance.rskservice.repository.requests.service.RequestsService;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
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

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy-HH-mm-ss");

    @PostMapping(value = "initiate", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> initiateRequest(@RequestBody RequestEntity entity){
        logger.info("Creating new Request Record");

        RequestEntity requestEntity = new RequestEntity();
        requestEntity.setRequestStatus("CAPTURE");
        requestEntity.setAction("PROGRESS");
        requestEntity.setCustomerName(entity.getCustomerName());
        requestEntity.setCreatedBy(entity.getCreatedBy());
        requestEntity.setCustomerNumber(entity.getCustomerNumber());
        requestEntity.setModifiedBy(entity.getModifiedBy());
        requestEntity.setProductID(entity.getProductID());
        repository.save(requestEntity);

        return responseService.preparedSuccessResponseWMessage("","Request initiated!");
    }

    @PostMapping(value="create", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {"multipart/form-data"})
    public ResponseEntity<ResponseModel> createRequest(
            @RequestParam("request") String stringEntity,
            @RequestParam(value = "poa", required = true) MultipartFile poa,
            @RequestParam(value = "poi", required = true) MultipartFile poi,
            @RequestParam(value = "signature", required = true) MultipartFile signature
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        RequestEntity requestEntity = mapper.readValue(stringEntity, RequestEntity.class);
        Optional<RequestEntity> isProgress = repository.findByCreatedByAndActionAndProductID(requestEntity.getCreatedBy(), "PROGRESS", requestEntity.getProductID());

        if(isProgress.isPresent()){
            return this.responseService.prepareFailedResponse("An application is already in progress!");
        } else {
            this.service.createRequest(requestEntity, poa, poi, signature);
            return responseService.preparedSuccessResponseWMessage("","Request has been initiated!");
        }
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
