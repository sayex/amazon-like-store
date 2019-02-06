DROP Database IF EXISTS `bamazon`;

CREATE DATABASE `bamazon` ;

Use bamazon;

CREATE TABLE `departments` (
  `iddepartments` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iddepartments`)
);

CREATE TABLE `products` (
  `idproducts` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`idproducts`)
);


--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
INSERT INTO `departments` VALUES (1,'Mens');
INSERT INTO `departments` VALUES (2,'Womens');
INSERT INTO `departments` VALUES (3,'Toys');
INSERT INTO `departments` VALUES (4,'Automotive');
UNLOCK TABLES;

--
-- Table structure for table `products`
--

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;

INSERT INTO `products` VALUES (1,'Polo Shirt',1,24.99,205);
INSERT INTO `products` VALUES (2,'Polo Shirt',2,24.99,2);
INSERT INTO `products` VALUES (3,'Tickle Me Elmo',3,99.99,5);
INSERT INTO `products` VALUES (4,'Head Light',4,149.99,20);
INSERT INTO `products` VALUES (5,'Dress Pants',1,110.99,299);

UNLOCK TABLES;

CREATE VIEW `bamazon`.`product_view` AS SELECT 
        `bamazon`.`products`.`idproducts` AS `idproducts`,
        `bamazon`.`products`.`product_name` AS `product_name`,
        `bamazon`.`products`.`price` AS `price`,
        `bamazon`.`products`.`stock_quantity` AS `stock_quantity`,
        `bamazon`.`departments`.`department_name` AS `department_name`
    FROM
        (`bamazon`.`products`
        JOIN `bamazon`.`departments` ON ((`bamazon`.`products`.`department_id` = `bamazon`.`departments`.`iddepartments`)));

