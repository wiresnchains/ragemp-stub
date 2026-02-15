import { SharedMockEntity, SharedMockEntityPool } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from '@/interfaces/entity';
import type { MockServerContainer } from '@/mock/container';

export class MockEntity extends SharedMockEntity<MockServerContainer> implements Entity {}

export class MockEntityPool<TEntity extends MockEntity = MockEntity>
    extends SharedMockEntityPool<MockServerContainer, TEntity>
    implements EntityPool<TEntity> {}
