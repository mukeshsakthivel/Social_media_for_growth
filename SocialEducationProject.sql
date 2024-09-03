create database SocialMediaEducationPorject
use SocialMediaEducationPorject

select database()

DESCRIBE Register;
create table Register (user_id int auto_increment primary key not null ,username varchar(20) not null,password varchar(20) not null,email   varchar(50) not null ,user_career_role varchar(20) not null)


describe  Register;
Alter table Register add column followers_count int default 0,add column following_count int default 0; 


CREATE TABLE user_relationships (
    relationships_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    related_user_id INT,
    relationship_type ENUM('FOLLOWING', 'FOLLOWER') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Register(user_id) ON DELETE CASCADE,
    FOREIGN KEY (related_user_id) REFERENCES Register(user_id) ON DELETE CASCADE
);



CREATE TABLE user_photos (
    photo_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    photo_data LONGBLOB,  -- BLOB column for storing image data
    photo_type ENUM('FRONT_PROFILE', 'BACK_PROFILE', 'POST') NOT NULL,
    post_description TEXT,
    FOREIGN KEY (user_id) REFERENCES Register(user_id) ON DELETE CASCADE
);

alter table user_photos add column like_count int default 0;

