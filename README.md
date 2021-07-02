# GitHub DB

Add this action to your repo, and it'll become a (shitty) database!

Add the workflow and create a `tables` directory at the root of your repo, and you're done!

Use the [cli](./cli/ghdb.js) as an example of how to interact with the DB.

# Example workflow

The `repository_dispatch.types` are necessary.

    on:
      repository_dispatch:
        types: [add, update, delete]

    jobs:
      ghdb:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v2
          - name: Update the DB
            uses: JCGrant/github-db@v0.1-alpha
