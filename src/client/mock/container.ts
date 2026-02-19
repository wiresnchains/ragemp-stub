import { createJoaatCache } from 'ragemp-stub/shared';
import type { ClientContainer } from '@/interfaces/container';
import { MockEventPool } from './event';
import { MockGame } from './game';
import { MockPedPool } from './ped';

export class MockClientContainer implements ClientContainer {
    public game: MockGame = new MockGame();
    public events: MockEventPool = new MockEventPool();
    public peds: MockPedPool = new MockPedPool(this);

    private joaatCache: ReturnType<typeof createJoaatCache> = createJoaatCache();

    public joaat(plainText: string): number {
        return this.joaatCache.get(plainText);
    }
}
