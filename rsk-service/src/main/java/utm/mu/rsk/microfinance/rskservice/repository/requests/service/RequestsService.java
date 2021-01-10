package utm.mu.rsk.microfinance.rskservice.repository.requests.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utm.mu.rsk.microfinance.rskservice.repository.common.notification.MailService;
import utm.mu.rsk.microfinance.rskservice.repository.requests.model.RequestEntity;
import utm.mu.rsk.microfinance.rskservice.repository.requests.repository.RequestRepository;

import javax.mail.MessagingException;
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
}
