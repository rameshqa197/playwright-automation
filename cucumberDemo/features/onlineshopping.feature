Feature: onlineshopping activity with valid credentials

    Scenario Outline: User login with valid credentials and adds a product to the cart
        Given User is on the online shopping homepage
        When User enters valid username "<userName>" and password "<password>" and clicks on login
        When User searches for "<productName>" and add to cart
        Then The product should be added to the cart successfully
        When User proceeds to checkout

    Examples:
        | userName            | password     | productName                  |
        | chand7272@gmail.com | Ramesh#12345 | Mug The best is yet to come  |


    Scenario Outline: User login with valid credentials and adds a product to the cart
        Given User is on the online shopping homepage
        When User enters valid username "<userName>" and password "<password>" and clicks on login
        When User searches for "<productName>" and add to cart
        Then The product should be added to the cart successfully
    

    Examples:
        | userName            | password     | productName                  |
        | chand7272@gmail.com | Ramesh#12345 | Mug The best is yet to come  |