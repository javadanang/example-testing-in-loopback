Feature: User can add a new book into list
  As an user
  I want to add a book to book list
  So that I can record and keep track the books in store

  Scenario: Create a list of books
    Given an empty book list
    When I add a book list
      |title              |price     |
      |HTML5 Canvas       |6         |
      |Node.js in action  |8         |
      |Java Cookbook      |7         |
    Then there are exactly "3" items in book list
      And total price of book list should be "21"

  Scenario: Create a book
    Given a book list
      |title              |price     |
      |HTML5 Canvas       |6         |
      |Node.js in action  |8         |
      |Java Cookbook      |7         |
    When I add a book with the title "Ruby in action" and price "12"
    Then there are exactly "4" items in book list
      And total price of book list should be "33"
