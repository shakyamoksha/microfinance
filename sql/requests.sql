CREATE TABLE REQUESTS (
ID NUMBER(10) NOT NULL,
CUSTOMER_NAME VARCHAR2(255),
CUSTOMER_NUMBER NUMBER(6),
PRODUCT_ID NUMBER(10),
REQUESTS_STATUS VARCHAR2(255),
ACCOUNT_OFFICER_NAME VARCHAR2(255),
ACCOUNT_OFFICER_USER_ID VARCHAR2(255),
CREATED_DATE_TIME DATE DEFAULT SYSDATE,
CREATED_BY VARCHAR2(255),
MODIFIED_DATE_TIME DATE DEFAULT SYSDATE,
MODIFIED_BY VARCHAR2(255),
ACTION VARCHAR2(255)
);

CREATE SEQUENCE  REQUESTS_SEQ  MINVALUE 1 MAXVALUE 9999999999 INCREMENT BY 1 START WITH 6 NOCACHE  NOORDER  NOCYCLE;