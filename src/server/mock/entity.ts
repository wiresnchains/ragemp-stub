import { SharedMockEntity, SharedMockEntityPool } from 'ragemp-atlas/shared';
import type { Entity, EntityPool } from '@/interfaces/entity';
import type { MockContainer } from '@/container';

export class MockEntity extends SharedMockEntity<MockContainer> implements Entity {}

export class MockEntityPool<TEntity extends MockEntity = MockEntity>
    extends SharedMockEntityPool<MockContainer, TEntity>
    implements EntityPool<TEntity> {}
