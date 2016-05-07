#!/bin/bash

echo -n "Enter the MySQL root password: "
read -s rootpw
echo -n "Enter database name: "
read dbname
echo -n "Enter database username: "
read dbuser
echo -n "Enter database user password: "
read dbpw

db="create database $dbname;
    GRANT ALL PRIVILEGES ON $dbname.* TO $dbuser@localhost IDENTIFIED BY '$dbpw';
    FLUSH PRIVILEGES;"
mysql -u root -p$rootpw -e "$db"

if [ $? != "0" ]; then
 echo "[Error]: Database creation failed"
 exit 1
else
 echo "------------------------------------------"
 echo " Database has been created successfully "
 echo "------------------------------------------"
 echo " DB Info: "
 echo ""
 echo " DB Name: $dbname"
 echo " DB User: $dbuser"
 echo " DB Pass: $dbpw"
 echo ""
 echo "------------------------------------------"
fi

#script reference http://www.linuxdigest.org/blog/2012/06/10/bash-script-to-create-mysql-database-and-user/
