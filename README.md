# ragemp-stub

[![Publish npm package](https://github.com/wiresnchains/ragemp-stub/actions/workflows/publish.yml/badge.svg)](https://github.com/wiresnchains/ragemp-stub/actions/workflows/publish.yml)

An abstraction layer over [RAGE:MP API](https://wiki.rage.mp/wiki/Main_Page) that allows you to mock objects for unit testing.

## Quickstart

To quickly set-up `ragemp-stub` in your project, run the following command to install the package in your project:

```sh
npm i ragemp-stub
```

Then, create an event registry on your server:

```ts
import type { ServerContainer } from 'ragemp-stub/server';
import { Vector3 } from 'ragemp-stub/shared';

function registerEvents(container: ServerContainer) {
    container.events.add('playerJoin', player => {
        console.log(player.id, 'has joined the server!');
        player.position = new Vector3(0, 73, 0);
    });
}
```

Run it on your real server using:

```ts
import { RageServerContainer } from 'ragemp-stub/server';
import { registerEvents } from './events';

const rage = new RageServerContainer();

registerEvents(rage);
```

And in your test set-up, you can use a mock container.

It is designed to run without RAGE:MP runtime, and allows you to mock the entire server entity state for your tests.

```ts
import { MockServerContainer } from 'ragemp-stub/server';
import { registerEvents } from './events';

const mock = new MockServerContainer();

registerEvents(mock);
```
