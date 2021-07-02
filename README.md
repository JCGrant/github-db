# GitHub DB

Add this action to your repo, and it'll become a (shitty) database!

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
