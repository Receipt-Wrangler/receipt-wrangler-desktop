[![Build](https://github.com/Noah231515/receipt-wrangler-desktop/actions/workflows/docker-image.yml/badge.svg)](https://github.com/Noah231515/receipt-wrangler-desktop/actions/workflows/docker-image.yml)
[![codecov](https://codecov.io/gh/Receipt-Wrangler/receipt-wrangler-desktop/graph/badge.svg?token=TCTGKLHIW1)](https://codecov.io/gh/Receipt-Wrangler/receipt-wrangler-desktop)

# Receipt Wrangler

## Tech Overview

This project uses:

- Angular framework
- Ngxs for state management
- Bootstrap for utils, layouts, grids
- Angular Material for UI Library
- Karma/Jasmine used for unit tests
- No E2E Tests currently

## Development server

Run `npm run start` for a dev server with a proxy to the development API. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

(Note: I have been wrestling with an odd issue where locally the app will only start with node version: lts/gallium. Make sure this version is installed for development!)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io). Unit tests are expected with contributions to ensure the already subpar coverage doesn't get worse!

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
