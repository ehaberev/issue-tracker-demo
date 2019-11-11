import LocalStorageDataService from '../../src/local-storage-data-service';
import IssuesDataStorage from '../../src/issues-data-storage';

QUnit.module('Integration | IssuesDataStorage', {
  beforeEach: () => {
    // prepare something before each test
  },
  afterEach: () => {
    // do something after each test
  },
});

// -------- createIssue tests --------

const getIssueForTest = () => ({
  id: '234-13425-21223',
  description: 'Сломался утюг',
  severity: 'Low',
  assignedTo: 'Иванов И.И',
  status: 'Open',
});

const entityNameForIssues = 'issues-test';

QUnit.test('Add issue with LocalStorage data service', assert => {
  // Arrange;
  localStorage.setItem(entityNameForIssues, null);
  const dataService = new LocalStorageDataService(entityNameForIssues);

  const issuesDataStorage = new IssuesDataStorage(dataService);
  const issueToAdd = getIssueForTest();

  // Act
  const resultOfCreateIssue = issuesDataStorage.createIssue(issueToAdd);
  const loadedEntities = dataService.loadEntities();

  // Assert
  const addedIssuesToStorage = issuesDataStorage.issues.filter(issue => issue.id === issueToAdd.id);
  const persistedIssues = loadedEntities.filter(issue => issue.id === issueToAdd.id);

  assert.equal(resultOfCreateIssue, true, 'Issue has been added');
  assert.equal(addedIssuesToStorage.length, 1, 'Count of added issues is correct');
  assert.deepEqual(addedIssuesToStorage[0], issueToAdd, 'Added issue is found in storage');
  assert.equal(persistedIssues.length, 1, 'Count of persisted issues is correct');
  assert.deepEqual(persistedIssues[0], issueToAdd, 'Persisted issue is found after loading data');
});
