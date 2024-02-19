# Deploi

## Description

`deploi` is tiny cli tool that combines the functionality of `athloi`'s `version` and `publish` commands to allow npm workspace-based monorepos to publish their public packages to npm in a single step.

The `--version` option is parsed with [semver](https://github.com/npm/node-semver) to determine the appropriate tag: if it contains `alpha`, `beta`, or similar, it will be published as a pre-release version.

## Requirements

- Node.js 18 or later
- npm 8 or later

## Examples

### Publish as latest release

Running

```sh
npx deploi --version 2.0.0
```

Will...

1. Update the version of all packages in the monorepo to `2.0.0`
2. Publish all non-private packages to npm as the latest version

### Publish as pre-release

Running

```sh
npx deploi --version 2.0.0-alpha.1
```

Will...

1. Update the version of all packages in the monorepo to `2.0.0-alpha.1`
2. Publish all non-private packages to npm tagged as pre-release versions

## Usage with Circle CI

Add the following to your `.circleci/config.yml`:

```yaml
jobs:
  publish_version:
    <<: *container_config_node
    steps:
      - *attach_workspace
      - run:
          name: Set npm auth token
          command: echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" > ${HOME}/.npmrc
      - run:
          name: Build packages
          command: npm run build
      - run:
          name: NPM publish
          command: npx deploi --version ${CIRCLE_TAG}
```

## Development

To run the tests:

```sh
npm t
```

To see the CLI in action:

```sh
npx . --version <version>
```

To see the CLI help:

```sh
npx . --help
```

To run the tests in watch mode:

```sh
npm run dev
```
