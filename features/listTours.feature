Feature: Listing tours

  Scenario: There are tours available

    Given A list of tours are available
    When the list of tours are requested
    Then tours are displayed 

