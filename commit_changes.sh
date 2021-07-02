#!/sh

GHDB_ACTION=$1
GHDB_ITEM_ID=$2

git config user.name "Github Actions Bot"
git config user.email 41898282+github-actions[bot]@users.noreply.github.com
git add .
git commit -m "$GHDB_ACTION item: $GHDB_ITEM_ID"
git push