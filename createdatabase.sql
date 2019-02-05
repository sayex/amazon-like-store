DROP Database IF EXISTS bamazon;
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