package utm.mu.rsk.microfinance.rskservice.repository.requests.service;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utm.mu.rsk.microfinance.rskservice.repository.common.notification.MailService;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;

import javax.mail.MessagingException;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class RequestsService {

    @Autowired
    RequestRepository repository;

    @Autowired
    MailService mailService;

    public boolean getRequestById(int id) {
        boolean requestExists = false;
        if(repository.findById(id).isPresent()){
            requestExists = true;
        }
        return requestExists;
    }

    public List<RequestEntity> getAllRequests() {
        return repository.findAll();
    }

    public List<RequestEntity> getRequestsByStatus(String status){
        return repository.findAllByAction(status);
    }

    public boolean updateRequest(RequestEntity entity, int id) throws MessagingException {
        boolean requestExists = false;
        Optional<RequestEntity> requestEntity;
        requestEntity = repository.findById(id);
        if(requestEntity.isPresent()) {
            requestExists = true;
            repository.save(entity);
            if(entity.getRequestStatus().equals("APPROVED")){
                this.mailService.sendMail(entity.getCreatedBy(), "MicroFinance Loan Approval",
                        "Dear "+ entity.getCustomerName() +", <br>" +
                                "This is to notify you that your Loan Request has been APPROVED. <br>" +
                                "<br>" +
                                "</h1>This is a computer generated mail. Please do not reply</h1>"
                );

            } else if(entity.getRequestStatus().equals("REJECTED")){
                this.mailService.sendMail(entity.getCreatedBy(), "MicroFinance Loan Rejection",
                        "Dear "+ entity.getCustomerName() +", <br>" +
                                "This is to notify you that your Loan Request has been REJECTED. <br>" +
                                "<br>" +
                                "</h1>This is a computer generated mail. Please do not reply</h1>"
                );
            }
        }
        return requestExists;
    }

    public void createRequest(RequestEntity entity, MultipartFile poa, MultipartFile poi, MultipartFile signature) throws IOException {
        RequestEntity requestEntity = new RequestEntity();
        requestEntity.setPoa(convertToBase64(poa));
        requestEntity.setPoaName(poa.getOriginalFilename());
        requestEntity.setPoi(convertToBase64(poi));
        requestEntity.setPoiName(poi.getOriginalFilename());
        requestEntity.setSignature(convertToBase64(signature));
        requestEntity.setSignatureName(signature.getOriginalFilename());
        requestEntity.setRequestStatus("CAPTURE");
        requestEntity.setAction("PROGRESS");
        requestEntity.setCustomerName(entity.getCustomerName());
        requestEntity.setCreatedBy(entity.getCreatedBy());
        requestEntity.setCustomerNumber(entity.getCustomerNumber());
        requestEntity.setModifiedBy(entity.getModifiedBy());
        requestEntity.setProductID(entity.getProductID());
        repository.save(requestEntity);
    }
    
    public String convertToBase64(MultipartFile file) throws IOException {
        if(!file.isEmpty()){
            byte[] bytes = IOUtils.toByteArray(file.getInputStream());
            return Base64.getEncoder().encodeToString(bytes);
        } else {
            return null;
        }
    }


}
