# Hanbitco API Documentation

A `slate` based documentation for the Hanbitco HTTP based public facing API.

### Prerequisites

You're going to need:

 - **Linux or macOS** — Windows may work, but is unsupported.
 - **Ruby, version 2.3.1 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

```shell
# either run this to run locally
bundle install
bundle exec middleman server

# OR run this to run with vagrant
vagrant up
```

```shell
# To build static files for hosting,
bundle exec middleman build --clean
```
Default port: 4567

Check slate's [wiki](https://github.com/lord/slate/wiki) for additional guidelines.

Localization for this api-docs did not use the default localization provided by middleman. Currently implemented as an SPA-like behavior with customized javascript. 
If additional languages need to be supported, rollback to [this](https://github.com/lord/slate/wiki/Internationalization)