package utm.mu.rsk.microfinance.rskservice.repository.common.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping("api/v1/register")
public class MailController {

    @Autowired
    MailService mailService;

    @PostMapping("/send/{email}")
    public String sendMailToEmail(@PathVariable String email) throws MessagingException {
        mailService.sendMail(email, "test mail","<h1>hello robot<h1>");
        return "success";
    }
}
