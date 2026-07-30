Feature: Verify login

Background:
  Given I navigate to "https://practice.expandtesting.com/notes/app/login"


Scenario: Verify user is able to login with valid credentials

    When I enter my email "playwright_testceline59@gmail.com"
    And I enter my password "123456"
    And I click on the button login
    Then I should see "MyNotes"


Scenario Outline: Verify user is not able to login with invalid credentials

    When I enter my email "<email>"
    And I enter my password "<password>"
    And I click on the button login
    Then I should see error message "<msgErr>"

Examples:
    | email                  | password | msgErr                                        |
    | testlogiciel@gmail.com | 1234567  | Incorrect email address or password           |
    | test1@gmail.com        | 123456   | Incorrect email address or password           |
    | testlogiciel@gmail.com |          | Password is required                          |
    |                        | 123456   | Email address is required                     |
    |                        |          | Email address is required, Password is required |