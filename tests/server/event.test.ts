import { beforeEach, expect, test } from 'vitest';
import { MockServerContainer } from '@/mock/container';

let container: MockServerContainer;

beforeEach(() => {
    container = new MockServerContainer();
});

test('Register and call event', () => {
    const testPlayer = container.players.createEntity();

    container.events.add('set_player_health', (player, health: number) => {
        player.health = health;
    });

    expect(testPlayer.health).toBe(100);
    container.events.call('set_player_health', testPlayer, 70);
    expect(testPlayer.health).toBe(70);
});
