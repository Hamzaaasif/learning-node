use nodesql;
UPDATE cus_info SET cus_DOB = '1996-12-26' WHERE cus_CNIC = "42201-6858142-7";


INSERT INTO cus_info VALUES("Hamza Asif" , "Muhammad Asif Kamal" , '1996-12-26' , "hamzaasif0987@gmail.com" , "42201-6858142-9" , "C-39 shamsi society" ,"C-39 shamsi society" , "Pakistani" , "Student" );
use nodesql;
SELECT * from cus_info;

INSERT INTO cus_info VALUES("Hamza Asif" , "Muhammad Asif Kamal" , 26121996 , "hamzaasif0987@gmail.com" , "42201-6858142-7" , "C-39 shamsi society" ,"C-39 shamsi society" , "Pakistani" , "Student" );
SELECT * from kin_info;

CREATE TABLE kin_info(
kin_Name VARCHAR(50) NOT NULL ,
kin_Relation VARCHAR(50) NOT NULL,
kin_Email VARCHAR(320) ,
kin_CNIC VARCHAR(320) NOT NULL UNIQUE,
kin_PermetAdd VARCHAR(300) NOT NULL,
Cus_CNIC VARCHAR(320),
PRIMARY KEY(kin_CNIC),
FOREIGN KEY (Cus_CNIC) REFERENCES cus_info(Cus_CNIC)
);


CREATE TABLE cus_info(
Cus_Name VARCHAR(50) NOT NULL ,
Cus_FatherName VARCHAR(50) NOT NULL,
Cus_DOB DATE NOT NULL,
Cus_Email VARCHAR(320) ,
Cus_CNIC VARCHAR(320) NOT NULL UNIQUE,
Cus_Tempadd VARCHAR(300) ,
Cus_PermetAdd VARCHAR(300) NOT NULL,
Cus_Nationality VARCHAR(100) not NULL,
Cus_Occupation VARCHAR(100) not NULL,
PRIMARY KEY(Cus_CNIC)
);