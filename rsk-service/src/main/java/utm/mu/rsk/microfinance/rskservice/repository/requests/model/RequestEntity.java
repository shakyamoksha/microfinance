package utm.mu.rsk.microfinance.rskservice.repository.requests.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "REQUESTS")
public class RequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REQUESTS_SEQ")
    @SequenceGenerator(sequenceName = "REQUESTS_SEQ", allocationSize = 1, name = "REQUESTS_SEQ")
    @Column(name = "ID")
    private int id;

    @Column(name = "CUSTOMER_NAME")
    private String customerName;

    @Column(name = "CUSTOMER_NUMBER")
    private Integer customerNumber;

    @Column(name = "PRODUCT_ID")
    private Integer productID;

    @Column(name = "REQUESTS_STATUS")
    private String requestStatus;

    @Column(name = "ACCOUNT_OFFICER_NAME")
    private String accountOfficerName;

    @Column(name = "ACCOUNT_OFFICER_USER_ID")
    private String accountOfficerUserId;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @Column(name = "CREATED_DATE_TIME", insertable = false, updatable = false)
    private Date createdDateTime;

    @Column(name = "CREATED_BY", updatable = false)
    private String createdBy;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "MODIFIED_DATE_TIME", insertable = false)
    private Date modifiedDateTime;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "ACTION")
    private String action;

    @Lob
    @Column(name = "APPLY_REASON")
    private String applyReason;

    @Column(name = "PAYMENT_OPTION")
    private Integer paymentOption;

    @Lob
    @Column(name = "POA")
    private String poa;

    @Column(name = "POA_NAME")
    private String poaName;

    @Lob
    @Column(name = "POI")
    private String poi;

    @Column(name = "POI_NAME")
    private String poiName;

    @Lob
    @Column(name = "SIGNATURE")
    private String signature;

    @Column(name = "SIGNATURE_NAME")
    private String signatureName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Integer getCustomerNumber() {
        return customerNumber;
    }

    public void setCustomerNumber(Integer customerNumber) {
        this.customerNumber = customerNumber;
    }

    public Integer getProductID() {
        return productID;
    }

    public void setProductID(Integer productID) {
        this.productID = productID;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

    public String getAccountOfficerName() {
        return accountOfficerName;
    }

    public void setAccountOfficerName(String accountOfficerName) {
        this.accountOfficerName = accountOfficerName;
    }

    public String getAccountOfficerUserId() {
        return accountOfficerUserId;
    }

    public void setAccountOfficerUserId(String accountOfficerUserId) {
        this.accountOfficerUserId = accountOfficerUserId;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(Date modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getApplyReason() {
        return applyReason;
    }

    public void setApplyReason(String applyReason) {
        this.applyReason = applyReason;
    }

    public Integer getPaymentOption() {
        return paymentOption;
    }

    public void setPaymentOption(Integer paymentOption) {
        this.paymentOption = paymentOption;
    }

    public String getPoa() {
        return poa;
    }

    public void setPoa(String poa) {
        this.poa = poa;
    }

    public String getPoaName() {
        return poaName;
    }

    public void setPoaName(String poaName) {
        this.poaName = poaName;
    }

    public String getPoi() {
        return poi;
    }

    public void setPoi(String poi) {
        this.poi = poi;
    }

    public String getPoiName() {
        return poiName;
    }

    public void setPoiName(String poiName) {
        this.poiName = poiName;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getSignatureName() {
        return signatureName;
    }

    public void setSignatureName(String signatureName) {
        this.signatureName = signatureName;
    }

}

