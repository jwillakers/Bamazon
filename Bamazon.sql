DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE Products (
  Item_Id INTEGER (8) AUTO_INCREMENT NOT NULL,
  Product_Name VARCHAR(200) NOT NULL,
  Department_Name VARCHAR(45) NOT NULL,
  Price DECIMAL(6,2) NOT NULL,
  Stock_Qty INTEGER(10) NOT NULL,
  PRIMARY KEY (Item_Id)
);

INSERT INTO Products (Item_ID, Product_Name, Department_Name, Price, Stock_Qty)
VALUES 	(06895, "Ninja Professional Blender", "Appliances", 53.49, 1000),
		(7453, "Echo Show - Black", "Electronics", 179.99, 120),
		(12345, "Fire 7 Kids Edition Tablet", "Toys", 79.99, 75),
		(67890, "Car Windshield Sun Shade", "Automotive", 4.99, 1500),
		(23452, "Bose Wireless Headphones", "Movies, Music & Games", 349.00, 1120),
		(45367, "Da Bomb Shampoo", "Beauty & Health", 19.99, 1475),
		(88883, "Grandma's Quilt", "Handmade", 299.99, 80),
		(89893, "Chocolate Strawberries", "Food & Grocery", 19.99, 500),
		(00098, "4-Person Tent", "Sports & Outdoors", 899.99, 5),
		(23245, "Car Windshield Sun Shade", "Automotive", 4.99, 1500),
		(28276, "Fido's Chew Toy", "Pets", 9.99, 6000),
		(87834, "Women's Slip Dress", "Clothing", 90.00, 875)