Feature: E-Commerce Validations

  Scenario: Placing an order
    Given login to e-commerce application with username "john_doe" and password "password123"
    When add product with code "3" to the cart
    Then verify product with code "3" is displayed in the cart
    When enter valid details and place the order
    Then verify order is present in the order history
