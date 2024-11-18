> Note that this project is not an official Contentstack maintained repo yet. This is a work in progress and will be updated over time. When it is finished enough it will move to the official Contentstack Github home.

# Contentstack SDK implemenation guide: Angular 18

This is a bare-bones example to connect Angular to Contentstack.
This example covers the following items:

- SDK initialization
- live preview setup

## How to get started

Before you can run this code, you will need a Contentstack "Stack" to connect to.
Follow the following steps to seed a Stack that this codebase understands.

### Install the CLI

```bash
npm install -g @contentstack/cli
```

### Log in via the CLI

```bash
csdx auth:login
```

### Get your organization UID

In your Contentstack Organization dashboard find `Org admin` and copy your Organization ID (Example: `blt481c598b0d8352d9`).

### Create a new stack

Make sure to replace `<YOUR_ORG_ID>` with your actual Organization ID and run the below.

```bash
csdx cm:stacks:seed --repo "timbenniks/contentstack-implementation-guides-seed" --org "<YOUR_ORG_ID>" -n "Implementation Guide"
```

### Create a new delivery token.

Go to Settings > Tokens and create a delivery token. Select the `preview` scope and turn on `Create preview token`

> In the case of Angular 18, check the settings in the environment and make sure the url is: `http://localhost:4200/` instead of `http://localhost:3000/`

### Fill out your environment settings.

Now that you have a delivery token, you can fill out the `./src/environments/environment.ts` file in your codebase.

```js
export const environment = {
  production: false,
  contentstack: {
    apiKey: "blte766efb491f96715",
    deliveryToken: "cs620decb0e6bb175e31210ce9",
    previewToken: "csa128deacffe0b26386090915",
    environment: "preview",
    region: "EU",
    preview: true,
  },
};
```

### Turn on Live Preview

Go to Settings > Live Preview. Click enable and select the `Preview` environment in the drop down. Hit save.

### Install the dependencies

```bash
npm install
```

### Run your app

```bash
npm run start
```

### See your page visually

Go to Entries and select the only entry in the list.
In the sidebar, click on the live preview icon.
Or, click on visual experience in the sidebar
