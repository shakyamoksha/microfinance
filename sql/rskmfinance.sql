SELECT * FROM USERS;

SELECT ACTIVE, ROLES FROM USERS;

DELETE FROM USERS WHERE USERNAME = 'rxyloto@gmail.com';
DELETE FROM USERS WHERE ID = 10;

UPDATE USERS SET ACTIVE = 0 WHERE USERNAME = 'xrannan@outlook.com';

DELETE FROM USERS WHERE USERNAME = 'admin';
DELETE FROM USERS WHERE USERNAME = 'xrannan@outlook.com';
DELETE FROM USERS WHERE phone = 0;

UPDATE USERS SET USERNAME = 'admin' WHERE USERNAME = 'xrannan@outlook.com';
UPDATE USERS SET ROLES = 'ROLE_ADMIN' WHERE USERNAME = 'admin';

DELETE FROM PRODUCTS;
SELECT * FROM PRODUCTS;