package utm.mu.rsk.microfinance.rskservice.repository.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class MailService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    JavaMailSender emailSender;

    public void sendMail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setSubject(subject);
        helper.setTo(to);
        helper.setText(body,true);
        helper.setFrom(from);
//        helper.addAttachment("filename", new ClassPathResource("\\static\\path"));
        emailSender.send(message);
    }

}
