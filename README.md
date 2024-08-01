# TODO

- update the scripts in the package.json files to match across all examples
- allow for running the different examples by providing a param
- investigate combining multiple tanstack routetrees through MFE

# Open Questions

- Still need to figure out why the response body for /refresh-token is blank when called in the Command UI
    - Possible that the response is being cut short due to the redirect?
- How do we want to handle refresh tokens?
    - Interceptor in commandAxios?
        - If so, then we need to implement a blocker so that multiple requests don't try to refresh the token at the same time
    - Logic in ui-console-shell?
        - Add this logic to an effect that preemptively refreshes the token before it expires