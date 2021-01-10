package utm.mu.rsk.microfinance.rskservice.repository.requests.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utm.mu.rsk.microfinance.rskservice.repository.common.entity.ResponseModel;
import utm.mu.rsk.microfinance.rskservice.repository.common.services.CommonResponse;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;
import utm.mu.rsk.microfinance.rskservice.repository.requests.service.RequestsService;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("admin/requests/")
public class RequestsLenderController {

    @Autowired
    RequestsService service;

    @Autowired
    RequestRepository repository;

    @Autowired
    CommonResponse responseService;

    @GetMapping(value = "getRequestsById/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> getRequestsById(@PathVariable int id) {

        Optional<RequestEntity> requestEntity = repository.findById(id);

        if(service.getRequestById(id)){
            return responseService.preparedSuccessResponseWMessage(requestEntity, "Get Requests By ID");
        } else {
            return responseService.prepareFailedResponse("Request does not exist");
        }
    }

    @GetMapping(value = "getRequestsByAO/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> getRequestsByAccountOfficer(@PathVariable String userId){
        List<RequestEntity> requestEntities = repository.findAllByAccountOfficerName(userId);

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

    @PutMapping(value = "update", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> updateRequest(@RequestBody RequestEntity entity) throws MessagingException {
        if(service.updateRequest(entity, entity.getId())){
            return responseService.preparedSuccessResponseWMessage(entity,"Updated successfully!");
        } else {
            return responseService.prepareFailedResponse("Unable to update");
        }
    }

    @GetMapping(value = "getRequestsByStatus/{status}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseModel> getRequestsByStatus(@PathVariable String status){
        List<RequestEntity> requestEntities = service.getRequestsByStatus(status);

        if(!requestEntities.isEmpty()){
            return responseService.preparedSuccessResponseWMessage(requestEntities,"Requests retrieved successfully");
        } else {
            return responseService.prepareFailedResponse("No requests found!");
        }

    }

}
