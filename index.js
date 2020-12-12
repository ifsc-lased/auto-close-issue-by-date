const core = require("@actions/core");
const github = require("@actions/github");

(async () => {
  const client = core.getInput("github-token", { required: true });

  const { issue } = github.context;
  const closedIssueLabel = core.getInput("closed-issues-label");
  const closedIssueComment = core.getInput("closed-issues-comment");
  const expirationDate = Date.parse(core.getInput("expiration-date"));
  const octokit = github.getOctokit(client);

  const issueData = await octokit.issues.get({
    owner: issue.owner,
    repo: issue.repo,
    issue_number: issue.number
  });

  const issueCreatedAt = Date.parse(issueData.data.created_at.substring(0,10));

  //Close the issue if it was created after the expiration date
  if(issueCreatedAt > expirationDate){

  //Add a label to de issue, if there is one
    if (closedIssueLabel) {
      await octokit.issues.addLabels({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        labels: [closedIssueLabel]
      });
    }

    //Add a comment to de issue, if there is one
    if(closedIssueComment){
      await octokit.issues.createComment({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        body: closedIssueComment
      });
    }

    //Close the issue
    await octokit.issues.update({
      owner: issue.owner,
      repo: issue.repo,
      issue_number: issue.number,
      state: "closed"
    });
  }
})();