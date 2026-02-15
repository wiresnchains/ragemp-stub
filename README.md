# ragemp-atlas

An abstraction layer over [RAGE:MP API](https://wiki.rage.mp/wiki/Main_Page) that allows you to mock objects for unit testing.

## Quickstart

To quickly set-up atlas in your project, run the following command to install the package in your project:

```sh
npm i ragemp-atlas
```

Then, create an event registry on your server:

```ts
import type { AtlasContainer } from 'ragemp-atlas/server';
import { Vector3 } from 'ragemp-atlas/shared';

function registerEvents(container: AtlasContainer) {
    container.events.add('playerJoin', player => {
        console.log(player.id, 'has joined the server!');
        player.position = new Vector3(0, 73, 0);
    });
}
```

Run it on your real server using:

```ts
import { AtlasRageContainer } from 'ragemp-atlas/server';
import { registerEvents } from './events';

const rage = new AtlasRageContainer();

registerEvents(rage);
```

And in your test set-up, you can use a mock container.

It is designed to run without RAGE:MP runtime, and allows you to mock the entire server entity state for your tests.

```ts
import { AtlasMockContainer } from 'ragemp-atlas/server';
import { registerEvents } from './events';

const mock = new AtlasMockContainer();

registerEvents(mock);
```
