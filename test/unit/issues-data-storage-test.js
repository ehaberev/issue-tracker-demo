/* global QUnit */
import IssuesDataStorage from '../../src/issues-data-storage';

QUnit.module('Unit | IssuesDataStorage', {
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
      return JSON.parse(JSON.stringify(this.items));
    },
    addEntity(entity) {
      this.items.push(entity);
      return true;
    },
  };

  tempDataService.items = [];
  const issuesDataStorage = new IssuesDataStorage(tempDataService);

  const issueToAdd = {
    id: '234-13425-21223',
    description: 'Сломался утюг',
    severity: 'Low',
    assignedTo: 'Иванов И.И',
    status: 'Open',
  };

  // Act
  const result = issuesDataStorage.createIssue(issueToAdd);
  const addedIssue = issuesDataStorage.issues.find(issue => issue.id === issueToAdd.id);

  // Assert
  assert.equal(result, true, 'Issue has been added');
  assert.equal(issuesDataStorage.issues.length, 1, 'Count of issues is correct');
  assert.notEqual(addedIssue, undefined, 'Issue was found in storage');
});
