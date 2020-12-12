# Auto close issue by date javascript action

This action closes issues created after the given date.
## Inputs
### Required

  - **github-token**: The `GITHUB_TOKEN` secret.
  - **closed-issues-comment**: Comment to add at the issue before closing it.    
  - **expiration-date**: Final date (yyyy-mm-dd) to creat issues. If created after that, this action closes it. 
    
### Optional

  - **closed-issues-label**: The label to assign to the issue before closing it. Creates it, if it doesn't exists.

## Example usage

```yml
    uses: ifsc-lased/auto-close-issue-by-date@v1.0
    with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        closed-issues-comment: "Sorry, issue created too late."
        expiration-date: "2020-12-10"
        closed-issues-label: "Expired" #optional  
```
