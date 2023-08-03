# Write .npmrc
echo "@receipt-wrangler:registry=https://npm.pkg.github.com/" > .npmrc
echo "//npm.pkg.github.com/:_authToken=$GH_PACKAGE_READ_TOKEN_DESKTOP" > .npmrc
