// import LocalStorageDataService from '../../src/local-storage-data-service';
import IssuesDataStorage from '../../src/issues-data-storage';
import sinon from '../../node_modules/sinon/pkg/sinon-esm';

QUnit.module('Unit | IssuesDataStorage', {
  beforeEach: () => {
    // prepare something before each test
  },
  afterEach: () => {
    sinon.restore();
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

QUnit.test('Add issue (normal case)', assert => {
  // Arrange;
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

  // const tempDataService = new LocalStorageDataService('issues');
  // sinon.stub(tempDataService, 'addEntity').returns(true);
  // sinon.stub(tempDataService, 'loadEntities').returns([]);

  // const tempDataService = sinon.createStubInstance(LocalStorageDataService, {
  //   addEntity: sinon.stub().returns(true),
  //   loadEntities: sinon.stub().returns([]),
  // });

  // const spy = sinon.spy(tempDataService, 'addEntity');
  // const mock = sinon.mock(tempDataService);
  // mock.expects('addEntity').once();

  const issuesDataStorage = new IssuesDataStorage(tempDataService);
  const issueToAdd = getIssueForTest();

  // Act
  const result = issuesDataStorage.createIssue(issueToAdd);

  // Assert
  const addedIssues = issuesDataStorage.issues.filter(issue => issue.id === issueToAdd.id);

  assert.equal(result, true, 'Issue has been added');
  assert.equal(addedIssues.length, 1, 'Count of added issues is correct');
  assert.deepEqual(addedIssues[0], issueToAdd, 'Added issue is found in storage');
  // assert.equal(spy.called, true, 'addEntity was called');
  // mock.verify();
});

QUnit.test('Add issue with duplicate id', assert => {
  // Arrange;
  const tempDataService = {
    addEntity: () => true,
    loadEntities: () => [{ id: '234-13425-21223' }],
  };

  const issuesDataStorage = new IssuesDataStorage(tempDataService);
  const issueToAdd = getIssueForTest();

  // Act && Assert
  assert.throws(
    () => {
      issuesDataStorage.createIssue(issueToAdd);
    },
    Error,
    'Throw exception when issue with specified id is already exists'
  );
});

QUnit.test('Add issue when persisting was unsuccessful', assert => {
  // Arrange;
  const tempDataService = {
    addEntity: () => false,
    loadEntities: () => [],
  };

  const issuesDataStorage = new IssuesDataStorage(tempDataService);
  const issueToAdd = getIssueForTest();

  // Act
  const result = issuesDataStorage.createIssue(issueToAdd);

  // Assert
  assert.equal(result, false, 'Issue has not been added');
});

QUnit.test('Add null or undefined value', assert => {
  // Arrange;
  const tempDataService = {
    addEntity: () => true,
    loadEntities: () => [],
  };

  const issuesDataStorage = new IssuesDataStorage(tempDataService);

  const nullIssueToAdd = null;
  const undefinedIssueToAdd = null;

  // Act && Assert
  assert.throws(
    () => {
      issuesDataStorage.createIssue(nullIssueToAdd);
    },
    Error,
    'Throw exception when issue is null'
  );
  assert.throws(
    () => {
      issuesDataStorage.createIssue(undefinedIssueToAdd);
    },
    Error,
    'Throw exception when issue is undefined'
  );
});

QUnit.test('Add value without id', assert => {
  // Arrange;
  const tempDataService = {
    addEntity: () => true,
    loadEntities: () => [],
  };

  const issuesDataStorage = new IssuesDataStorage(tempDataService);
  const issueToAdd = {};

  // Act && Assert
  assert.throws(
    () => {
      issuesDataStorage.createIssue(issueToAdd);
    },
    Error,
    'Throw exception when issue is object without `id` field'
  );
});

QUnit.test('Add non-object value', assert => {
  // Arrange;
  const tempDataService = {
    addEntity: () => true,
    loadEntities: () => [],
  };

  const issuesDataStorage = new IssuesDataStorage(tempDataService);
  const issueToAdd = 0;

  // Act && Assert
  assert.throws(
    () => {
      issuesDataStorage.createIssue(issueToAdd);
    },
    Error,
    'Throw exception when issue is non-object value'
  );
});
