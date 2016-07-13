Feature: Listing tours

  Scenario: There are tours available

    Given: An api that returns ar least one tour
    When: The list of tours are requested
    Then: Some tours are returned
