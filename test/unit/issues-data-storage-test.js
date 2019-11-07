/* global QUnit */
import IssuesDataStorage from '../../src/issues-data-storage';

QUnit.module('IssuesDataStorage tests', {
  beforeEach: () => {
    // prepare something before each test
  },
  afterEach: () => {
    // sinon.restore();
  },
});

QUnit.test('Add issue', assert => {
  // Arrange
  const tempDataService = {
    items: [],
    loadEntities() {
      return this.items;
    },
    addEntity(entity) {
      this.items.push(entity);
      return true;
    },
  };

  tempDataService.items = [];
  const issuesDataStorage = new IssuesDataStorage(tempDataService);

  // Act
  const result = issuesDataStorage.createIssue({
    id: '234-13425-21223',
    description: 'Сломался утюг',
    severity: 'Low',
    assignedTo: 'Иванов И.И',
    status: 'Open',
  });

  // Assert
  assert.equal(result, true, 'Issue has been added');
  assert.equal(issuesDataStorage.issues.length, 1, 'Count of issues is correct');
});
