Feature: Listing tours

  Scenario: There are tours available

    Given A list of tours are available
    When the list of tours are requested
    Then tours are displayed

  Scenario: No tours are available

    Given An api that returns no tours
    When The list of tours are requested
    Then A message "No tours available" is displayed
